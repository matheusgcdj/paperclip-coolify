import { Building2, UserRound } from "lucide-react";
import { AppLogo } from "@/pages/apps/AppLogo";
import { detectAiProviderNameFromUrl } from "@paperclipai/shared";
import {
  AI_PROVIDERS,
  aiMethodLabel,
  type AiConnectionSummary,
} from "./model";
import { useTranslation } from "@/i18n";

export function AiConnectionIdentity({
  connection,
}: {
  connection: AiConnectionSummary;
}) {
  const { t } = useTranslation();
  const isCompatible = connection.provider === "openai" && Boolean(connection.baseUrl);
  const detectedBrand = isCompatible ? detectAiProviderNameFromUrl(connection.baseUrl) : "";
  // Extract a nice provider label from the connection name when compatible
  // e.g. "OmniRoute API" → "OmniRoute", "My OpenAI-Compatible API" → "OpenAI-Compatible"
  const rawLabel = isCompatible
    ? connection.name
        .replace(/\s*API$/i, "")
        .replace(/^My\s+/i, "")
        .trim()
    : null;
  const compatibleLabel =
    detectedBrand ||
    (rawLabel && !/^openai$/i.test(rawLabel) ? rawLabel : "OpenAI-Compatible");
  const provider = isCompatible
    ? { name: compatibleLabel, logo: "/brands/apps/openai.svg" }
    : AI_PROVIDERS[connection.provider];

  const isGenericOpenAi =
    /^my openai api( account)?$/i.test(connection.name) ||
    /^openai api( account)?$/i.test(connection.name) ||
    /^my openai-compatible api$/i.test(connection.name) ||
    /^openai-compatible api$/i.test(connection.name);
  const displayName = isCompatible && isGenericOpenAi && detectedBrand
    ? (connection.name.toLowerCase().startsWith("my ") ? `My ${detectedBrand} API` : `${detectedBrand} API`)
    : connection.name;
  const Icon = connection.ownership === "shared" ? Building2 : UserRound;
  return (
    <div className="flex min-w-0 items-start gap-3">
      <AppLogo name={provider.name} brandKey={isCompatible ? "openai_compatible" : connection.provider} logoUrl={provider.logo} size={24} />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="break-words text-sm font-medium">
          {displayName}
        </span>
        <span className="text-xs text-muted-foreground">
          {provider.name} ·{" "}
          {aiMethodLabel(connection.provider, connection.method)}
          {connection.accountLabel ? ` · ${connection.accountLabel}` : ""}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon aria-hidden className="size-3" />
          {connection.ownership === "shared"
            ? t("Company shared")
            : `${t("Personal")} · ${connection.ownerName ?? t("Account owner")}`}
        </span>
      </div>
    </div>
  );
}
