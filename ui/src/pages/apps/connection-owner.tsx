import type { ToolConnection } from "@paperclipai/shared";
import { humanizeConnectionDisplayName, detectAiProviderNameFromUrl } from "@paperclipai/shared";
import { Identity } from "@/components/Identity";
import type { CompanyUserProfile } from "@/lib/company-members";

export type ConnectionOwnerProfile = CompanyUserProfile;

export function connectionOwnerProfile(
  connection: Pick<ToolConnection, "createdByUserId">,
  profiles: ReadonlyMap<string, CompanyUserProfile>,
): ConnectionOwnerProfile | null {
  if (!connection.createdByUserId) return null;
  return profiles.get(connection.createdByUserId) ?? {
    label: connection.createdByUserId === "local-board" ? "Board" : "Board member",
    image: null,
  };
}

function ownerGivenName(label: string): string {
  const trimmed = label.trim();
  if (!trimmed) return "Board";
  const first = trimmed.split(/\s+/)[0] ?? trimmed;
  return first.includes("@") ? first.split("@")[0] || "Board" : first;
}

function possessive(label: string): string {
  return label.toLowerCase().endsWith("s") ? `${label}’` : `${label}’s`;
}

/**
 * Keep intentionally customized account names, while making the default app
 * name useful in a multi-user company ("Dotta’s Notion", "Sam’s Gmail").
 * Connections with a custom baseUrl targeting an OpenAI-compatible provider
 * show "OpenAI-Compatible" instead of the plain "OpenAI" default.
 */
export function connectionDisplayNameForOwner(
  connection: Pick<ToolConnection, "name" | "config">,
  applicationName: string,
  owner: ConnectionOwnerProfile | null,
): string {
  const rawName = connection.name.trim();
  const baseUrl =
    typeof connection.config?.baseUrl === "string"
      ? connection.config.baseUrl.trim()
      : typeof (connection.config?.ai as Record<string, unknown> | undefined)?.baseUrl === "string"
        ? ((connection.config?.ai as Record<string, unknown>).baseUrl as string).trim()
        : "";
  const hasCustomBaseUrl = baseUrl.length > 0;
  const isOpenAiCompatible =
    hasCustomBaseUrl &&
    ((connection.config?.ai as { provider?: string } | undefined)?.provider === "openai" ||
      connection.config?.sourceTemplateKey === "openai");
  const detectedBrand = hasCustomBaseUrl ? detectAiProviderNameFromUrl(baseUrl) : "";

  // Detect OpenAI-compatible connections (custom baseUrl) and override confusing
  // generic OpenAI names with a clearer label or the auto-detected brand (e.g. OmniRoute).
  const isGenericOpenAiName =
    /^my openai api( account)?$/i.test(rawName) ||
    /^openai api( account)?$/i.test(rawName) ||
    /^my openai-compatible api$/i.test(rawName) ||
    /^openai-compatible api$/i.test(rawName) ||
    /^openai(-compatible)?$/i.test(rawName);

  if (isOpenAiCompatible && (isGenericOpenAiName || (detectedBrand && !rawName.toLowerCase().includes(detectedBrand.toLowerCase())))) {
    const brand = detectedBrand || "OpenAI-Compatible";
    return owner
      ? `${possessive(ownerGivenName(owner.label))} ${brand} API`
      : `My ${brand} API`;
  }
  // Provider account identifiers are machine values, not prose. Preserve
  // their casing and punctuation so an email address or tenant hostname stays
  // recognizable in the inline account list.
  const connectionName =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawName) ||
    /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(rawName)
      ? rawName
      : humanizeConnectionDisplayName(connection);
  if (!owner) return connectionName;
  if (connectionName.trim().toLocaleLowerCase() !== applicationName.trim().toLocaleLowerCase()) {
    return connectionName;
  }
  const effectiveAppName = isOpenAiCompatible && detectedBrand ? detectedBrand : applicationName;
  return `${possessive(ownerGivenName(owner.label))} ${effectiveAppName}`;
}

export function ConnectionOwnerIdentity({ owner }: { owner: ConnectionOwnerProfile | null }) {
  if (!owner) return <span className="text-xs text-muted-foreground">Unknown</span>;
  return (
    <Identity
      name={owner.label}
      avatarUrl={owner.image}
      size="sm"
      className="text-muted-foreground"
    />
  );
}
