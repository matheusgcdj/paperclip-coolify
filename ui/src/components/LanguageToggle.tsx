import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setLocale } from "../i18n";

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = (i18n.language || "en").toLowerCase();
  const isPt = current.startsWith("pt");

  const toggle = () => {
    setLocale(isPt ? "en" : "pt-BR");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={isPt ? "Mudar para Inglês (Switch to English)" : "Mudar para Português (Switch to Portuguese)"}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/40 ${className ?? ""}`}
      aria-label="Toggle language"
    >
      <Globe className="size-3.5 opacity-70" />
      <span>{isPt ? "Português" : "English"}</span>
    </button>
  );
}
