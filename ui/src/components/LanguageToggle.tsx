import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setLocale } from "../i18n";

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = (i18n.language || "en").toLowerCase();
  const isPt = current.startsWith("pt");

  const select = (lang: string) => {
    setLocale(lang);
    window.dispatchEvent(new Event("languagechange"));
  };

  return (
    <div className={`inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-0.5 sm:p-1 text-xs select-none max-w-full ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => select("pt-BR")}
        className={`flex items-center gap-1 rounded-md px-2 py-1 sm:px-2.5 font-medium transition-all text-xs whitespace-nowrap ${
          isPt
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>🇧🇷</span>
        <span className="hidden sm:inline">Português</span>
        <span className="sm:hidden">PT</span>
        {isPt && <Check className="size-3 text-primary shrink-0" />}
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        className={`flex items-center gap-1 rounded-md px-2 py-1 sm:px-2.5 font-medium transition-all text-xs whitespace-nowrap ${
          !isPt
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>🇺🇸</span>
        <span className="hidden sm:inline">English</span>
        <span className="sm:hidden">EN</span>
        {!isPt && <Check className="size-3 text-primary shrink-0" />}
      </button>
    </div>
  );
}
