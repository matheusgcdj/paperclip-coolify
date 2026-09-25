import { LanguageSelector } from "./LanguageSelector";

export function LanguageToggle({ className }: { className?: string }) {
  return <LanguageSelector variant="buttons" className={className} />;
}

export { LanguageSelector };
