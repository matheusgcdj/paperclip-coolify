import { UI_TRANSLATIONS, DICT_ES, DICT_FR } from "./translations-dict";

const LOWERCASE_MAP_PT = new Map<string, string>();
for (const [key, value] of Object.entries(UI_TRANSLATIONS)) {
  LOWERCASE_MAP_PT.set(key.toLowerCase(), value);
}

const LOWERCASE_MAP_ES = new Map<string, string>();
for (const [key, value] of Object.entries(DICT_ES)) {
  LOWERCASE_MAP_ES.set(key.toLowerCase(), value);
}

const LOWERCASE_MAP_FR = new Map<string, string>();
for (const [key, value] of Object.entries(DICT_FR)) {
  LOWERCASE_MAP_FR.set(key.toLowerCase(), value);
}

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

function getActiveDictionary(locale: string): { dict: Record<string, string>; lowerMap: Map<string, string> } | null {
  const norm = locale.toLowerCase();
  if (norm.startsWith("pt")) {
    return { dict: UI_TRANSLATIONS, lowerMap: LOWERCASE_MAP_PT };
  }
  if (norm.startsWith("es")) {
    return { dict: DICT_ES, lowerMap: LOWERCASE_MAP_ES };
  }
  if (norm.startsWith("fr")) {
    return { dict: DICT_FR, lowerMap: LOWERCASE_MAP_FR };
  }
  return null;
}

function translateSinglePiece(raw: string, locale: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const active = getActiveDictionary(locale);
  if (!active) return null;

  // 1. Direct dictionary
  if (active.dict[trimmed]) {
    return active.dict[trimmed];
  }

  // 2. Case-insensitive
  const lower = trimmed.toLowerCase();
  const lowerMatch = active.lowerMap.get(lower);
  if (lowerMatch) {
    if (trimmed.length > 1 && trimmed === trimmed.toUpperCase()) {
      return lowerMatch.toUpperCase();
    }
    return lowerMatch;
  }

  // 3. Patterns (pt-BR)
  if (locale.toLowerCase().startsWith("pt")) {
    for (const [regex, repl] of PATTERNS_PT) {
      if (regex.test(trimmed)) {
        return trimmed.replace(regex, repl);
      }
    }
  }

  return null;
}

function translateText(text: string, locale: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Direct piece
  const direct = translateSinglePiece(trimmed, locale);
  if (direct) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${direct}${trailing}`;
  }

  // Composed pieces with separators: " · ", ", ", " - "
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
    const translatedParts = parts.map((p) => translateSinglePiece(p, locale) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(", ")}${trailing}`;
    }
  }

  return null;
}

function processNode(node: Node, targetLocale: string) {
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

    // Children
    const children = el.childNodes;
    for (let i = 0; i < children.length; i++) {
      processNode(children[i], targetLocale);
    }
  }
}

export function applyTranslations() {
  if (typeof window === "undefined" || !document.body) return;
  const savedLocale = localStorage.getItem("paperclip_locale");
  const locale = (savedLocale || "pt-BR").toLowerCase();

  if (isTranslating) return;
  isTranslating = true;
  try {
    processNode(document.body, locale);
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

  // Observe dynamically loaded DOM nodes
  if (!observer) {
    let frameId: number | null = null;
    observer = new MutationObserver(() => {
      if (isTranslating) return;
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
