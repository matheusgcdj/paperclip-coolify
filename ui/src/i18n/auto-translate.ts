import { UI_TRANSLATIONS } from "./translations-dict";

const LOWERCASE_TRANSLATIONS = new Map<string, string>();
for (const [key, value] of Object.entries(UI_TRANSLATIONS)) {
  LOWERCASE_TRANSLATIONS.set(key.toLowerCase(), value);
}

const PATTERNS: [RegExp, string][] = [
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
  const tag = el.tagName.toLowerCase();
  if (
    tag === "script" ||
    tag === "style" ||
    tag === "code" ||
    tag === "pre" ||
    tag === "svg" ||
    tag === "path"
  ) {
    return true;
  }
  if (el.getAttribute("translate") === "no" || el.closest('[translate="no"]')) {
    return true;
  }
  return false;
}

function translateSinglePiece(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // 1. Direct dictionary
  if (UI_TRANSLATIONS[trimmed]) {
    return UI_TRANSLATIONS[trimmed];
  }

  // 2. Case-insensitive
  const lower = trimmed.toLowerCase();
  const lowerMatch = LOWERCASE_TRANSLATIONS.get(lower);
  if (lowerMatch) {
    if (trimmed.length > 1 && trimmed === trimmed.toUpperCase()) {
      return lowerMatch.toUpperCase();
    }
    return lowerMatch;
  }

  // 3. Patterns
  for (const [regex, repl] of PATTERNS) {
    if (regex.test(trimmed)) {
      return trimmed.replace(regex, repl);
    }
  }

  return null;
}

function translateText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Direct piece
  const direct = translateSinglePiece(trimmed);
  if (direct) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${direct}${trailing}`;
  }

  // Composed pieces with separators: " · ", ", ", " - "
  if (trimmed.includes(" · ")) {
    const parts = trimmed.split(" · ");
    const translatedParts = parts.map((p) => translateSinglePiece(p) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(" · ")}${trailing}`;
    }
  }

  if (trimmed.includes(", ")) {
    const parts = trimmed.split(", ");
    const translatedParts = parts.map((p) => translateSinglePiece(p) ?? p);
    if (translatedParts.some((p, i) => p !== parts[i])) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      return `${leading}${translatedParts.join(", ")}${trailing}`;
    }
  }

  return null;
}

function processNode(node: Node, toPt: boolean) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (shouldSkipElement(parent)) return;

    const currentVal = node.nodeValue ?? "";
    if (toPt) {
      if (currentVal !== lastTranslatedText.get(node)) {
        originalTextNodes.set(node, currentVal);
      }
      const original = originalTextNodes.get(node) ?? currentVal;
      const translated = translateText(original);
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
        if (toPt) {
          if (currentPlaceholder !== lastTranslatedPlaceholder.get(el)) {
            originalPlaceholders.set(el, currentPlaceholder);
          }
          const orig = originalPlaceholders.get(el) ?? currentPlaceholder;
          const translated = translateText(orig);
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
      if (toPt) {
        if (currentTitle !== lastTranslatedTitle.get(el)) {
          originalTitles.set(el, currentTitle);
        }
        const orig = originalTitles.get(el) ?? currentTitle;
        const translated = translateText(orig);
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
      processNode(children[i], toPt);
    }
  }
}

export function applyTranslations() {
  if (typeof window === "undefined" || !document.body) return;
  const savedLocale = localStorage.getItem("paperclip_locale");
  const locale = (savedLocale || "pt-BR").toLowerCase();
  const toPt = locale.startsWith("pt");

  if (isTranslating) return;
  isTranslating = true;
  try {
    processNode(document.body, toPt);
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
