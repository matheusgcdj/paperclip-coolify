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
    <div className={`inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-1 text-xs ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => select("pt-BR")}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
          isPt
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>🇧🇷 Português</span>
        {isPt && <Check className="size-3 text-primary" />}
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all ${
          !isPt
            ? "bg-background text-foreground shadow-xs font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>🇺🇸 English</span>
        {!isPt && <Check className="size-3 text-primary" />}
      </button>
    </div>
  );
}
