import i18n, { type InitOptions, type TOptions } from "i18next";
import { initReactI18next, useTranslation as useReactI18nextTranslation } from "react-i18next";

import { DEFAULT_LOCALE, i18nextResources, supportedLocales } from "./locales";

export function getInitialLocale(): string {
  try {
    const saved = localStorage.getItem("paperclip_locale");
    if (saved && supportedLocales.includes(saved)) {
      return saved;
    }
    const nav = typeof navigator !== "undefined" ? navigator : null;
    const sysLang = nav?.language || (nav as { userLanguage?: string })?.userLanguage || "";
    if (sysLang.toLowerCase().startsWith("pt")) {
      return "pt-BR";
    }
    const matched = supportedLocales.find(
      (l) => l.toLowerCase() === sysLang.toLowerCase() || l.toLowerCase() === sysLang.split("-")[0].toLowerCase()
    );
    if (matched) return matched;
  } catch {}
  return DEFAULT_LOCALE;
}

const activeLocale = getInitialLocale();

const i18nextOptions: InitOptions = {
  resources: i18nextResources,
  lng: activeLocale,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: supportedLocales,
  defaultNS: "translation",
  interpolation: { escapeValue: false },
  returnObjects: false,
  initAsync: false,
};

void i18n.use(initReactI18next).init(i18nextOptions).catch((error: unknown) => {
  console.error("Failed to initialize i18next", error);
});

export function setLocale(locale: string) {
  try {
    localStorage.setItem("paperclip_locale", locale);
  } catch {}
  void i18n.changeLanguage(locale);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("languagechange"));
  }
}

export function getCurrentLocale(): string {
  return i18n.language || activeLocale;
}

export function t(key: string, options: TOptions = {}) {
  return i18n.t(key, options);
}

export const useTranslation = useReactI18nextTranslation;
export { i18n };
