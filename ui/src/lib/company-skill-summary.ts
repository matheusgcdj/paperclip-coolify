import { translateText } from "../i18n/auto-translate";
import { getCurrentLocale } from "../i18n";

type SkillSummaryInput = {
  tagline?: string | null;
  description?: string | null;
  key?: string | null;
  name?: string | null;
};

function isStaleYamlBlockScalarIndicator(raw: string) {
  return /^[>|][+-]?$/.test(raw.trim());
}

export function sanitizeSkillSummaryText(raw: string | null | undefined): string | null {
  const cleaned = (raw ?? "").trim();
  if (isStaleYamlBlockScalarIndicator(cleaned)) return null;
  return cleaned.length > 0 ? cleaned : null;
}

export function resolveSkillSummaryText(
  skill: SkillSummaryInput,
  options: { fallbackKey?: boolean; raw?: boolean } = {},
): string | null {
  const summary = sanitizeSkillSummaryText(skill.tagline) ?? sanitizeSkillSummaryText(skill.description);
  if (summary) {
    if (options.raw) return summary;
    try {
      const locale = getCurrentLocale();
      if (locale && !locale.toLowerCase().startsWith("en")) {
        const trans = translateText(summary, locale);
        if (trans) return trans;
      }
    } catch {
      // Ignore if called outside browser runtime
    }
    return summary;
  }

  if (options.fallbackKey) {
    const fallbackKey = skill.key?.trim();
    if (fallbackKey) return fallbackKey;
  }

  return null;
}
