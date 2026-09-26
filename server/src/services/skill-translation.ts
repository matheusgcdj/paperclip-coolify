import https from "node:https";
import type { Db } from "@paperclipai/db";
import { companySkillService } from "./company-skills.js";
import { logger } from "../middleware/logger.js";

declare const process: {
  env: Record<string, string | undefined>;
};

/**
 * Mask inline code (`...`) and fenced code blocks (```...```)
 */
function maskCode(markdown: string): {
  masked: string;
  codeBlocks: string[];
  inlineCodes: string[];
} {
  const codeBlocks: string[] = [];
  const inlineCodes: string[] = [];

  let masked = markdown.replace(/```[\s\S]*?```/g, (match) => {
    const idx = codeBlocks.length;
    codeBlocks.push(match);
    return `___FENCED_CODE_${idx}___`;
  });

  masked = masked.replace(/`[^`\n]+`/g, (match) => {
    const idx = inlineCodes.length;
    inlineCodes.push(match);
    return `___INLINE_CODE_${idx}___`;
  });

  return { masked, codeBlocks, inlineCodes };
}

function unmaskCode(
  text: string,
  codeBlocks: string[],
  inlineCodes: string[],
): string {
  let result = text;
  inlineCodes.forEach((code, idx) => {
    result = result.replaceAll(`___INLINE_CODE_${idx}___`, code);
  });
  codeBlocks.forEach((block, idx) => {
    result = result.replaceAll(`___FENCED_CODE_${idx}___`, block);
  });
  return result;
}

/**
 * Clean up domain-specific terms in Brazilian Portuguese
 */
function sanitizeTechnicalPt(text: string): string {
  return text
    .replace(/\bconselho de administração\b/gi, "Diretoria")
    .replace(/\bplaca da empresa\b/gi, "diretoria da empresa")
    .replace(/\bplaca do Paperclip\b/gi, "conselho do Paperclip")
    .replace(/\bgarfo\b/gi, "bifurcação")
    .replace(/\bgarfar\b/gi, "bifurcar")
    .replace(/\bPaperclip bundled\b/gi, "Embutido do Paperclip")
    .replace(/\bPaperclip\b/g, "Paperclip");
}

/**
 * Call OpenAI / OmniRoute / compatible chat completions endpoint if available
 */
async function translateWithLlm(
  content: string,
  targetLang: string,
): Promise<string | null> {
  const apiKey =
    process.env.OPENAI_API_KEY ||
    process.env.HERMES_CUSTOM_OMNIROUTE_TROLLZERA_COM_API_KEY ||
    process.env.HERMES_CUSTOM_OMNI_TROLLZERA_COM_API_KEY ||
    process.env.AI_API_KEY;
  if (!apiKey) return null;

  const baseUrl =
    process.env.OPENAI_BASE_URL ||
    process.env.AI_BASE_URL ||
    (process.env.HERMES_CUSTOM_OMNIROUTE_TROLLZERA_COM_API_KEY
      ? "https://omniroute.trollzera.com/v1"
      : "https://api.openai.com/v1");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;

  const systemPrompt = `You are a professional software translator for the Paperclip AI agent platform.
Translate the technical markdown text into ${targetLang} (e.g. pt-BR).
CRITICAL RULES:
1. Do NOT translate or modify placeholders like ___FENCED_CODE_\\d+___ or ___INLINE_CODE_\\d+___.
2. Keep CLI commands, flags, parameters, URLs, and frontmatter keys verbatim.
3. For pt-BR, translate "board" -> "diretoria/conselho", "fork" -> "bifurcação/bifurcar", "issue" -> "tarefa/issue".
4. Output ONLY the translated markdown, without greeting or conversation.`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content },
        ],
        temperature: 0.1,
      }),
    });

    if (!res.ok) return null;
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return json?.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

/**
 * Free translation fallback via google endpoint with timeout
 */
export function translateTextFallback(
  text: string,
  targetLang = "pt",
): Promise<string> {
  if (!text || !text.trim()) return Promise.resolve(text);
  const langCode = targetLang.split("-")[0].toLowerCase();
  return new Promise((resolve) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`;
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        timeout: 10000,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            const translated = parsed[0].map((item: any[]) => item[0]).join("");
            resolve(translated);
          } catch {
            resolve(text);
          }
        });
      },
    );
    req.on("error", () => resolve(text));
  });
}

/**
 * Translate a single phrase or title
 */
export async function translateSingle(
  text: string,
  targetLocale = "pt-BR",
): Promise<string> {
  if (!text || !text.trim()) return text;
  const langCode = targetLocale.split("-")[0].toLowerCase();

  const llmRes = await translateWithLlm(text, targetLocale);
  if (llmRes) {
    return targetLocale.toLowerCase().startsWith("pt")
      ? sanitizeTechnicalPt(llmRes)
      : llmRes;
  }

  const fallback = await translateTextFallback(text, langCode);
  return targetLocale.toLowerCase().startsWith("pt")
    ? sanitizeTechnicalPt(fallback)
    : fallback;
}

export async function translateMarkdownDocument(
  markdown: string,
  targetLocale = "pt-BR",
): Promise<{ result: string; phrases: Record<string, string> }> {
  if (!markdown || !markdown.trim()) return { result: markdown, phrases: {} };

  const langCode = targetLocale.split("-")[0].toLowerCase();
  const { masked, codeBlocks, inlineCodes } = maskCode(markdown);

  // Try LLM whole-document translation first if configured
  const llmResult = await translateWithLlm(masked, targetLocale);
  if (llmResult) {
    const unmasked = unmaskCode(llmResult, codeBlocks, inlineCodes);
    const finalResult = targetLocale.toLowerCase().startsWith("pt")
      ? sanitizeTechnicalPt(unmasked)
      : unmasked;

    // Build sentence pairs
    const phrases: Record<string, string> = {};
    const origLines = markdown.split("\n");
    const transLines = finalResult.split("\n");
    for (let i = 0; i < Math.min(origLines.length, transLines.length); i++) {
      const orig = origLines[i].trim();
      const tr = transLines[i].trim();
      if (orig && tr && orig !== tr && !orig.startsWith("```")) {
        phrases[orig] = tr;
      }
    }
    return { result: finalResult, phrases };
  }

  // Fast chunk-based fallback translation (preserves lines, batches requests)
  const lines = masked.split("\n");
  const chunks: string[] = [];
  let currentChunk = "";

  for (const line of lines) {
    if ((currentChunk + "\n" + line).length > 1200 && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = line;
    } else {
      currentChunk = currentChunk ? currentChunk + "\n" + line : line;
    }
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  const translatedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const trans = await translateTextFallback(chunk, langCode);
      return trans;
    }),
  );

  const translatedMasked = translatedChunks.join("\n");
  let finalResult = unmaskCode(translatedMasked, codeBlocks, inlineCodes);

  if (targetLocale.toLowerCase().startsWith("pt")) {
    finalResult = sanitizeTechnicalPt(finalResult);
  }

  const phrases: Record<string, string> = {};
  const origLines = markdown.split("\n");
  const transLines = finalResult.split("\n");
  for (let i = 0; i < Math.min(origLines.length, transLines.length); i++) {
    const orig = origLines[i].trim();
    const tr = transLines[i].trim();
    if (orig && tr && orig !== tr && !orig.startsWith("```")) {
      phrases[orig] = tr;
    }
  }

  return { result: finalResult, phrases };
}

export async function translateAndSaveSkill(
  db: Db,
  companyId: string,
  skillId: string,
  targetLocale = "pt-BR",
  options: { force?: boolean } = {},
) {
  const svc = companySkillService(db);
  const skill = await svc.getById(companyId, skillId);
  if (!skill) throw new Error("Skill not found");

  const currentTranslations =
    (skill.metadata?.translations as Record<string, any>) || {};

  if (!options.force && currentTranslations[targetLocale]?.markdown) {
    return {
      skill,
      translation: currentTranslations[targetLocale],
      cached: true,
    };
  }

  let markdown = skill.markdown;
  if (!markdown || markdown.trim().length === 0) {
    const file = await svc
      .readFile(companyId, skillId, "SKILL.md")
      .catch(() => null);
    if (file?.content) markdown = file.content;
  }

  const [
    translatedName,
    translatedDesc,
    translatedTagline,
    { result: translatedMarkdown, phrases },
  ] = await Promise.all([
    skill.name
      ? translateSingle(skill.name, targetLocale)
      : Promise.resolve(skill.name),
    skill.description
      ? translateSingle(skill.description, targetLocale)
      : Promise.resolve(skill.description),
    skill.tagline
      ? translateSingle(skill.tagline, targetLocale)
      : Promise.resolve(skill.tagline),
    translateMarkdownDocument(markdown || "", targetLocale),
  ]);

  currentTranslations[targetLocale] = {
    name: translatedName,
    description: translatedDesc,
    tagline: translatedTagline,
    markdown: translatedMarkdown,
    phrases,
    translatedAt: new Date().toISOString(),
  };

  const updatedSkill = await svc.updateSkillMetadata(skill, {
    translations: currentTranslations,
  });

  logger.info(
    { companyId, skillId, targetLocale },
    "Skill localized and translations cached successfully",
  );

  return {
    skill: updatedSkill,
    translation: currentTranslations[targetLocale],
  };
}
