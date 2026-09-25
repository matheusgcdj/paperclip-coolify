import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setLocale, getCurrentLocale } from "../i18n";
import { AVAILABLE_LOCALES, type LocaleInfo } from "../i18n/locales";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LanguageSelectorProps {
  variant?: "select" | "buttons" | "cards";
  className?: string;
  onLanguageChange?: (locale: string) => void;
}

export function LanguageSelector({
  variant = "select",
  className,
  onLanguageChange,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const currentLocale = (i18n.language || getCurrentLocale() || "pt-BR").toLowerCase();

  const handleSelect = (code: string) => {
    setLocale(code);
    onLanguageChange?.(code);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("languagechange"));
    }
  };

  const isSelected = (code: string) => {
    return currentLocale === code.toLowerCase() ||
      (code === "pt-BR" && currentLocale.startsWith("pt")) ||
      (code === "zh-CN" && currentLocale.startsWith("zh"));
  };

  if (variant === "cards") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full", className)}>
        {AVAILABLE_LOCALES.map((locale) => {
          const active = isSelected(locale.code);
          return (
            <button
              key={locale.code}
              type="button"
              onClick={() => handleSelect(locale.code)}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer",
                active
                  ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary shadow-xs"
                  : "border-border/70 bg-card/60 hover:bg-accent/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-2xl mb-1.5 select-none">{locale.flag}</span>
              <span className="text-sm font-semibold text-foreground leading-tight">
                {locale.nativeName}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {locale.name}
              </span>
              {active && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check className="size-3.5 stroke-[2.5]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "buttons") {
    return (
      <div className={cn("flex flex-wrap gap-2 items-center", className)}>
        {AVAILABLE_LOCALES.map((locale) => {
          const active = isSelected(locale.code);
          return (
            <button
              key={locale.code}
              type="button"
              onClick={() => handleSelect(locale.code)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary/10 text-foreground font-semibold shadow-xs"
                  : "border-border bg-background hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{locale.flag}</span>
              <span>{locale.nativeName}</span>
              {active && <Check className="size-3 text-primary" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Variant: select dropdown
  const matchedLocale = AVAILABLE_LOCALES.find((l) => isSelected(l.code)) || AVAILABLE_LOCALES[0];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Select
        value={matchedLocale.code}
        onValueChange={(val) => handleSelect(val)}
      >
        <SelectTrigger className="w-[220px] h-9 bg-background">
          <Globe className="size-4 text-muted-foreground shrink-0" />
          <SelectValue placeholder="Selecione o idioma">
            <span className="flex items-center gap-2">
              <span>{matchedLocale.flag}</span>
              <span>{matchedLocale.nativeName}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="start">
          {AVAILABLE_LOCALES.map((locale) => (
            <SelectItem key={locale.code} value={locale.code}>
              <span className="flex items-center gap-2">
                <span>{locale.flag}</span>
                <span className="font-medium">{locale.nativeName}</span>
                <span className="text-xs text-muted-foreground">({locale.name})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
