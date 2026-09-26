import ptDict from "./generated-dicts/pt-BR.json";
import esDict from "./generated-dicts/es.json";
import frDict from "./generated-dicts/fr.json";
import deDict from "./generated-dicts/de.json";
import itDict from "./generated-dicts/it.json";
import jaDict from "./generated-dicts/ja.json";
import zhDict from "./generated-dicts/zh-CN.json";

type DictMap = Record<string, string>;

interface LocaleCache {
  dict: DictMap;
  lowerMap: Map<string, string>;
}

function buildCache(dict: DictMap): LocaleCache {
  const lowerMap = new Map<string, string>();
  for (const [key, value] of Object.entries(dict)) {
    lowerMap.set(key.toLowerCase(), value);
  }
  return { dict, lowerMap };
}

const CACHES: Record<string, LocaleCache> = {
  "pt-br": buildCache(ptDict as DictMap),
  "pt": buildCache(ptDict as DictMap),
  "es": buildCache(esDict as DictMap),
  "fr": buildCache(frDict as DictMap),
  "de": buildCache(deDict as DictMap),
  "it": buildCache(itDict as DictMap),
  "ja": buildCache(jaDict as DictMap),
  "zh-cn": buildCache(zhDict as DictMap),
  "zh": buildCache(zhDict as DictMap),
};

const PATTERNS_PT: [RegExp, string][] = [
  // Tempo relativo
  [/^(\d+)\s*(?:s|sec|secs|second|seconds)\s*ago$/i, "há $1 s"],
  [/^(\d+)\s*(?:m|min|mins|minute|minutes)\s*ago$/i, "há $1 min"],
  [/^(\d+)\s*(?:h|hr|hrs|hour|hours)\s*ago$/i, "há $1 h"],
  [/^(\d+)\s*(?:d|day|days)\s*ago$/i, "há $1 d"],
  [/^(\d+)\s*(?:w|wk|wks|week|weeks)\s*ago$/i, "há $1 sem"],
  [/^(\d+)\s*(?:mo|mos|month|months)\s*ago$/i, "há $1 m"],
  [/^(\d+)\s*(?:y|yr|yrs|year|years)\s*ago$/i, "há $1 a"],
  [/^just now$/i, "agora mesmo"],
  [/^in\s*(\d+)\s*(?:s|sec|secs|second|seconds)$/i, "em $1 s"],
  [/^in\s*(\d+)\s*(?:m|min|mins|minute|minutes)$/i, "em $1 min"],
  [/^in\s*(\d+)\s*(?:h|hr|hrs|hour|hours)$/i, "em $1 h"],
  [/^in\s*(\d+)\s*(?:d|day|days)$/i, "em $1 d"],

  // Métricas do Dashboard e Estados
  [/^(\d+)\s+running$/i, "$1 em execução"],
  [/^(\d+)\s+paused$/i, "$1 pausados"],
  [/^(\d+)\s+errors?$/i, "$1 com erro"],
  [/^(\d+)\s+open$/i, "$1 abertos"],
  [/^(\d+)\s+blocked$/i, "$1 bloqueados"],
  [/^(\d+)\s+closed$/i, "$1 fechados"],
  [/^(\d+)\s+completed$/i, "$1 concluídos"],
  [/^(\d+)\s+succeeded$/i, "$1 concluídos"],
  [/^(\d+)\s+failed$/i, "$1 com falha"],
  [/^(\d+)\s+issues?$/i, "$1 tarefas"],
  [/^(\d+)\s+tasks?$/i, "$1 tarefas"],
  [/^(\d+)\s+agents?$/i, "$1 agentes"],
  [/^(\d+)\s+projects?$/i, "$1 projetos"],
  [/^(\d+)\s+members?$/i, "$1 membros"],
  [/^(\d+)\s+runs?$/i, "$1 execuções"],
  [/^(\d+)\s+active\s+budget\s+incident(s?)$/i, "$1 incidente(s) de orçamento ativo(s)"],
  [/^(\d+)\s+agents\s+paused$/i, "$1 agentes pausados"],
  [/^(\d+)\s+projects\s+paused$/i, "$1 projetos pausados"],
  [/^(\d+)\s+pending\s+budget\s+approvals$/i, "$1 aprovações de orçamento pendentes"],
  [/^(\d+)\s+budget\s+overrides\s+awaiting\s+board\s+review$/i, "$1 aprovações de orçamento aguardando revisão da diretoria"],
  [/^(\d+)%\s+of\s+(.+)\s+budget$/i, "$1% do orçamento de $2"],
  [/^last\s+(\d+)\s+days$/i, "Últimos $1 dias"],
  [/^last\s+(\d+)\s+hours$/i, "Últimas $1 horas"],
  [/^showing\s+(\d+)\s+of\s+(\d+)$/i, "Exibindo $1 de $2"],
  [/^page\s+(\d+)\s+of\s+(\d+)$/i, "Página $1 de $2"],
  [/^step\s+(\d+)\s+of\s+(\d+)$/i, "Passo $1 de $2"],
  [/^search\s+([a-zA-Z0-9_\s]+)\.\.\.$/i, "Buscar $1..."],
  [/^filter\s+by\s+([a-zA-Z0-9_\s]+)$/i, "Filtrar por $1"],
];

const originalTextNodes = new WeakMap<Node, string>();
const lastTranslatedText = new WeakMap<Node, string>();

const originalPlaceholders = new WeakMap<Element, string>();
const lastTranslatedPlaceholder = new WeakMap<Element, string>();

const originalTitles = new WeakMap<Element, string>();
const lastTranslatedTitle = new WeakMap<Element, string>();

const originalAriaLabels = new WeakMap<Element, string>();
const lastTranslatedAria = new WeakMap<Element, string>();

let observer: MutationObserver | null = null;
let isTranslating = false;

function shouldSkipElement(el: Element | null): boolean {
  if (!el) return false;
  if (
    el.closest(
      "code, pre, kbd, samp, script, style, svg, [translate='no'], .monaco-editor, .cm-editor, [data-code-block], [data-terminal]"
    )
  ) {
    return true;
  }
  const tag = el.tagName.toLowerCase();
  return (
    tag === "script" ||
    tag === "style" ||
    tag === "code" ||
    tag === "pre" ||
    tag === "svg" ||
    tag === "path" ||
    tag === "kbd" ||
    tag === "samp"
  );
}

function getActiveDictionary(locale: string): LocaleCache | null {
  const norm = locale.toLowerCase();
  if (CACHES[norm]) return CACHES[norm];
  const short = norm.split("-")[0];
  if (CACHES[short]) return CACHES[short];
  return null;
}

function translateSinglePiece(raw: string, locale: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const active = getActiveDictionary(locale);
  if (!active) return null;

  // Normalize internal whitespace (newlines and indentation in JSX)
  const normalized = trimmed.replace(/\s+/g, " ");

  // 1. Direct dictionary match (exact or normalized)
  if (active.dict[trimmed]) {
    return active.dict[trimmed];
  }
  if (active.dict[normalized]) {
    return active.dict[normalized];
  }

  // 2. Trailing colon (e.g. "Status:", "Filter by:")
  if (trimmed.endsWith(":") || normalized.endsWith(":")) {
    const base = normalized.slice(0, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${trans}:`;
  }

  // 2b. Trailing question mark (e.g. "What would you like to do?", "Are you sure?")
  if (trimmed.endsWith("?") || normalized.endsWith("?")) {
    const base = normalized.slice(0, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${trans}?`;
  }

  // 2c. Trailing exclamation mark (e.g. "Welcome!", "Success!")
  if (trimmed.endsWith("!") || normalized.endsWith("!")) {
    const base = normalized.slice(0, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${trans}!`;
  }

  // 3. Trailing ellipsis (e.g. "Search...", "Loading…")
  if (trimmed.endsWith("...") || trimmed.endsWith("…") || normalized.endsWith("...") || normalized.endsWith("…")) {
    const base = normalized.replace(/\.{3}$|…$/, "").trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${trans}...`;
  }

  // 4. Parentheses (e.g. "(optional)", "(default)")
  if (normalized.startsWith("(") && normalized.endsWith(")")) {
    const base = normalized.slice(1, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `(${trans})`;
  }

  // 4b. Quotes (e.g. '"Review progress."', '“Known issue”')
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'")) ||
    (normalized.startsWith("“") && normalized.endsWith("”"))
  ) {
    const qStart = normalized[0];
    const qEnd = normalized[normalized.length - 1];
    const base = normalized.slice(1, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${qStart}${trans}${qEnd}`;
  }

  // 4c. Brackets (e.g. "[default]")
  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    const base = normalized.slice(1, -1).trim();
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `[${trans}]`;
  }

  // 5. Keyboard shortcut suffix (e.g. "New Task (⌘K)", "Search (Ctrl+K)")
  const shortcutMatch = normalized.match(/^(.*?)\s*(\([⌘⌃⌥⇧A-Za-z0-9+-]+\))$/);
  if (shortcutMatch) {
    const base = shortcutMatch[1].trim();
    const shortcut = shortcutMatch[2];
    const trans = active.dict[base] ?? active.lowerMap.get(base.toLowerCase());
    if (trans) return `${trans} ${shortcut}`;
  }

  // 6. Case-insensitive lookup (both exact and normalized)
  const lower = trimmed.toLowerCase();
  const lowerMatch = active.lowerMap.get(lower) ?? active.lowerMap.get(normalized.toLowerCase());
  if (lowerMatch) {
    if (trimmed.length > 1 && trimmed === trimmed.toUpperCase()) {
      return lowerMatch.toUpperCase();
    }
    return lowerMatch;
  }

  // 7. Regex patterns (pt-BR)
  if (locale.toLowerCase().startsWith("pt")) {
    for (const [regex, repl] of PATTERNS_PT) {
      if (regex.test(normalized)) {
        return normalized.replace(regex, repl);
      }
    }
  }

  return null;
}

export function translateText(text: string, locale: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Direct piece
  const direct = translateSinglePiece(trimmed, locale);
  if (direct) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${direct}${trailing}`;
  }

  // Composed pieces with separators: " · ", ", ", " - ", " – ", " | "
  if (trimmed.includes(" · ")) {
    const parts = trimmed.split(" · ");
    const translatedParts = parts.map((p) => translateSinglePiece(p, locale) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(" · ")}${trailing}`;
    }
  }

  if (trimmed.includes(", ")) {
    const parts = trimmed.split(", ");
    if (parts.length > 1 && parts.every((p) => p.trim().length <= 30 && p.trim().split(" ").length <= 4)) {
      const translatedParts = parts.map((p) => translateSinglePiece(p, locale) ?? p);
      if (translatedParts.some((p, i) => p !== parts[i])) {
        const leading = text.match(/^\s*/)?.[0] ?? "";
        const trailing = text.match(/\s*$/)?.[0] ?? "";
        return `${leading}${translatedParts.join(", ")}${trailing}`;
      }
    }
  }

  if (trimmed.includes(" - ")) {
    const parts = trimmed.split(" - ");
    const translatedParts = parts.map((p) => translateSinglePiece(p, locale) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(" - ")}${trailing}`;
    }
  }

  if (trimmed.includes(" — ")) {
    const parts = trimmed.split(" — ");
    const translatedParts = parts.map((p) => translateSinglePiece(p, locale) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(" — ")}${trailing}`;
    }
  }

  // Multi-line blocks (e.g. multi-line descriptions or markdown paragraphs)
  if (trimmed.includes("\n")) {
    const lines = trimmed.split("\n");
    let anyLineTranslated = false;
    const translatedLines = lines.map((l) => {
      const trans = translateText(l, locale);
      if (trans) {
        anyLineTranslated = true;
        return trans;
      }
      return l;
    });
    if (anyLineTranslated) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedLines.join("\n")}${trailing}`;
    }
  }

  // Multi-sentence paragraph support: split by sentence boundaries
  if (trimmed.includes(". ") || trimmed.includes("! ") || trimmed.includes("? ")) {
    const sentences = trimmed.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      let anySentenceTranslated = false;
      const translatedSentences = sentences.map((s) => {
        const trans = translateSinglePiece(s, locale) ?? translateSinglePiece(s.replace(/[.!?]$/, ""), locale);
        if (trans) {
          anySentenceTranslated = true;
          const punctuation = s.match(/[.!?]$/)?.[0] ?? "";
          return punctuation && !trans.endsWith(punctuation) ? `${trans}${punctuation}` : trans;
        }
        return s;
      });
      if (anySentenceTranslated) {
        const leading = text.match(/^\s*/)?.[0] ?? "";
        const trailing = text.match(/\s*$/)?.[0] ?? "";
        return `${leading}${translatedSentences.join(" ")}${trailing}`;
      }
    }
  }

  return null;
}

export function processNode(node: Node, targetLocale: string) {
  const isEnglish = targetLocale.toLowerCase().startsWith("en");

  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (shouldSkipElement(parent)) return;

    const currentVal = node.nodeValue ?? "";
    if (!isEnglish) {
      if (currentVal !== lastTranslatedText.get(node)) {
        originalTextNodes.set(node, currentVal);
      }
      const original = originalTextNodes.get(node) ?? currentVal;
      const translated = translateText(original, targetLocale);
      if (translated && node.nodeValue !== translated) {
        lastTranslatedText.set(node, translated);
        node.nodeValue = translated;
      }
    } else {
      const orig = originalTextNodes.get(node);
      if (orig && node.nodeValue !== orig) {
        node.nodeValue = orig;
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    if (shouldSkipElement(el)) return;

    // Placeholders
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const currentPlaceholder = el.placeholder;
      if (currentPlaceholder) {
        if (!isEnglish) {
          if (currentPlaceholder !== lastTranslatedPlaceholder.get(el)) {
            originalPlaceholders.set(el, currentPlaceholder);
          }
          const orig = originalPlaceholders.get(el) ?? currentPlaceholder;
          const translated = translateText(orig, targetLocale);
          if (translated && el.placeholder !== translated) {
            lastTranslatedPlaceholder.set(el, translated);
            el.placeholder = translated;
          }
        } else {
          const orig = originalPlaceholders.get(el);
          if (orig && el.placeholder !== orig) {
            el.placeholder = orig;
          }
        }
      }
    }

    // Titles
    const currentTitle = el.getAttribute("title");
    if (currentTitle) {
      if (!isEnglish) {
        if (currentTitle !== lastTranslatedTitle.get(el)) {
          originalTitles.set(el, currentTitle);
        }
        const orig = originalTitles.get(el) ?? currentTitle;
        const translated = translateText(orig, targetLocale);
        if (translated && el.getAttribute("title") !== translated) {
          lastTranslatedTitle.set(el, translated);
          el.setAttribute("title", translated);
        }
      } else {
        const orig = originalTitles.get(el);
        if (orig && el.getAttribute("title") !== orig) {
          el.setAttribute("title", orig);
        }
      }
    }

    // Aria Labels (Tooltips, Action Buttons, Icon Buttons)
    const currentAria = el.getAttribute("aria-label");
    if (currentAria) {
      if (!isEnglish) {
        if (currentAria !== lastTranslatedAria.get(el)) {
          originalAriaLabels.set(el, currentAria);
        }
        const orig = originalAriaLabels.get(el) ?? currentAria;
        const translated = translateText(orig, targetLocale);
        if (translated && el.getAttribute("aria-label") !== translated) {
          lastTranslatedAria.set(el, translated);
          el.setAttribute("aria-label", translated);
        }
      } else {
        const orig = originalAriaLabels.get(el);
        if (orig && el.getAttribute("aria-label") !== orig) {
          el.setAttribute("aria-label", orig);
        }
      }
    }

    // Children
    const children = el.childNodes;
    for (let i = 0; i < children.length; i++) {
      processNode(children[i], targetLocale);
    }
  }
}

export function applyTranslations(targetRoot?: Node) {
  if (typeof window === "undefined" || !document.body) return;
  const savedLocale = localStorage.getItem("paperclip_locale");
  const locale = (savedLocale || "pt-BR").toLowerCase();

  if (isTranslating) return;
  isTranslating = true;
  try {
    processNode(targetRoot ?? document.body, locale);
  } finally {
    isTranslating = false;
  }
}

export function initAutoTranslator() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // Run on start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyTranslations());
  } else {
    applyTranslations();
  }

  // Observe dynamically loaded DOM nodes (Popovers, Tooltips, Modals, Feed updates)
  if (!observer) {
    let frameId: number | null = null;
    observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      const savedLocale = localStorage.getItem("paperclip_locale") || "pt-BR";
      
      // Instantly translate newly added elements synchronously (e.g. Radix Tooltips/Popovers)
      for (let m = 0; m < mutations.length; m++) {
        const mutation = mutations[m];
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          processNode(mutation.addedNodes[i], savedLocale);
        }
      }

      // Debounce full-tree check
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        applyTranslations();
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // Listen to language switch events
  window.addEventListener("languagechange", () => {
    applyTranslations();
  });
}

function translateMarkdownContent(text: string, locale: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  // 1. Direct translation
  const direct = translateText(trimmed, locale);
  if (direct && direct.trim() !== trimmed) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${direct.trim()}${trailing}`;
  }

  // 2. Bold label prefix e.g. **Auth mode:** rest of sentence or **Step 1:** rest
  const boldPrefixMatch = trimmed.match(/^(\*\*[^*]+\*\*[:?]?)\s*(.+)$/);
  if (boldPrefixMatch) {
    const label = boldPrefixMatch[1];
    const rest = boldPrefixMatch[2];
    const transLabel = translateText(label, locale) ?? label;
    const transRest = translateMarkdownContent(rest, locale);
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${transLabel} ${transRest}${trailing}`;
  }

  // 3. Inline code prefix with separator e.g. `CMD` — description
  const codeDashMatch = trimmed.match(/^(`[^`]+`)\s*([—–-])\s*(.+)$/);
  if (codeDashMatch) {
    const codePart = codeDashMatch[1];
    const sep = codeDashMatch[2];
    const rest = codeDashMatch[3];
    const transRest = translateMarkdownContent(rest, locale);
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${codePart} ${sep} ${transRest}${trailing}`;
  }

  // 4. Bold with parenthetical e.g. **Environment variables** (set by `...`):
  const boldParenMatch = trimmed.match(/^(\*\*[^*]+\*\*)\s*(\([^)]+\))([:?]?)$/);
  if (boldParenMatch) {
    const boldPart = boldParenMatch[1];
    const parenPart = boldParenMatch[2];
    const punct = boldParenMatch[3];
    const transBold = translateText(boldPart, locale) ?? boldPart;
    const transParen = translateText(parenPart, locale) ?? parenPart;
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${transBold} ${transParen}${punct}${trailing}`;
  }

  // 5. Try stripped text (remove outer **...** or *...*)
  if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length > 4) {
    const inner = trimmed.slice(2, -2);
    const transInner = translateText(inner, locale);
    if (transInner && transInner !== inner) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}**${transInner}**${trailing}`;
    }
  }

  return direct ?? text;
}

export function translateMarkdown(markdown: string, locale: string): string {
  if (!markdown || locale.toLowerCase().startsWith("en")) return markdown;

  const lines = markdown.split("\n");
  let inCode = false;
  const translatedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCode = !inCode;
      translatedLines.push(line);
      continue;
    }
    if (inCode) {
      translatedLines.push(line);
      continue;
    }

    if (trimmed === "---") {
      translatedLines.push(line);
      continue;
    }

    // Headings: "# Title", "## Title"
    const headerMatch = line.match(/^(\s*#{1,6}\s+)(.+)$/);
    if (headerMatch) {
      const prefix = headerMatch[1];
      const text = headerMatch[2];
      const trans = translateMarkdownContent(text, locale);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Unordered lists: "- Item", "* Item"
    const listMatch = line.match(/^(\s*[-*+]\s+)(.+)$/);
    if (listMatch) {
      const prefix = listMatch[1];
      const text = listMatch[2];
      const trans = translateMarkdownContent(text, locale);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Ordered lists: "1. Item"
    const orderedMatch = line.match(/^(\s*\d+\.\s+)(.+)$/);
    if (orderedMatch) {
      const prefix = orderedMatch[1];
      const text = orderedMatch[2];
      const trans = translateMarkdownContent(text, locale);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Blockquotes: "> Quote"
    const quoteMatch = line.match(/^(\s*>\s*)(.+)$/);
    if (quoteMatch) {
      const prefix = quoteMatch[1];
      const text = quoteMatch[2];
      const trans = translateMarkdownContent(text, locale);
      translatedLines.push(`${prefix}${trans}`);
      continue;
    }

    // Table rows
    if (line.includes("|") && trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = line.split("|");
      const translatedCells = cells.map((cell) => {
        const cellTrimmed = cell.trim();
        if (!cellTrimmed || /^[:\s-]+$/.test(cellTrimmed)) return cell;
        const leading = cell.match(/^\s*/)?.[0] ?? " ";
        const trailing = cell.match(/\s*$/)?.[0] ?? " ";
        const trans = translateMarkdownContent(cellTrimmed, locale);
        return `${leading}${trans}${trailing}`;
      });
      translatedLines.push(translatedCells.join("|"));
      continue;
    }

    // Regular line / paragraph
    if (trimmed.length > 0) {
      const trans = translateMarkdownContent(line, locale);
      translatedLines.push(trans);
    } else {
      translatedLines.push(line);
    }
  }

  return translatedLines.join("\n");
}
