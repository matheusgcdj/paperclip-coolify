import { Building2, UserRound } from "lucide-react";
import { AppLogo } from "@/pages/apps/AppLogo";
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
  const isCompatible = connection.provider === "openai" && connection.baseUrl;
  // Extract a nice provider label from the connection name when compatible
  // e.g. "OmniRoute API" → "OmniRoute", "My OpenAI-Compatible API" → "OpenAI-Compatible"
  const compatibleLabel = isCompatible
    ? connection.name
        .replace(/\s*API$/i, "")
        .replace(/^My\s+/i, "")
        .trim() || "OpenAI-Compatible"
    : null;
  const provider = isCompatible
    ? { name: compatibleLabel!, logo: "/brands/apps/openai.svg" }
    : AI_PROVIDERS[connection.provider];
  const Icon = connection.ownership === "shared" ? Building2 : UserRound;
  return (
    <div className="flex min-w-0 items-start gap-3">
      <AppLogo name={provider.name} brandKey={isCompatible ? "openai_compatible" : connection.provider} logoUrl={provider.logo} size={24} />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="break-words text-sm font-medium">
          {connection.name}
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
