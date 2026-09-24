import { UI_TRANSLATIONS } from "./translations-dict";

const originalTextNodes = new WeakMap<Node, string>();
const originalPlaceholders = new WeakMap<Element, string>();
const originalTitles = new WeakMap<Element, string>();

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

function translateText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const match = UI_TRANSLATIONS[trimmed];
  if (match) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${match}${trailing}`;
  }
  return null;
}

function processNode(node: Node, toPt: boolean) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (shouldSkipElement(parent)) return;

    if (toPt) {
      const current = node.nodeValue ?? "";
      if (!originalTextNodes.has(node)) {
        originalTextNodes.set(node, current);
      }
      const original = originalTextNodes.get(node) ?? current;
      const translated = translateText(original);
      if (translated && node.nodeValue !== translated) {
        node.nodeValue = translated;
      }
    } else {
      if (originalTextNodes.has(node)) {
        const orig = originalTextNodes.get(node)!;
        if (node.nodeValue !== orig) {
          node.nodeValue = orig;
        }
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    if (shouldSkipElement(el)) return;

    // Placeholders
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.placeholder) {
        if (toPt) {
          if (!originalPlaceholders.has(el)) {
            originalPlaceholders.set(el, el.placeholder);
          }
          const orig = originalPlaceholders.get(el)!;
          const translated = translateText(orig);
          if (translated && el.placeholder !== translated) {
            el.placeholder = translated;
          }
        } else if (originalPlaceholders.has(el)) {
          const orig = originalPlaceholders.get(el)!;
          if (el.placeholder !== orig) {
            el.placeholder = orig;
          }
        }
      }
    }

    // Titles
    const title = el.getAttribute("title");
    if (title) {
      if (toPt) {
        if (!originalTitles.has(el)) {
          originalTitles.set(el, title);
        }
        const orig = originalTitles.get(el)!;
        const translated = translateText(orig);
        if (translated && el.getAttribute("title") !== translated) {
          el.setAttribute("title", translated);
        }
      } else if (originalTitles.has(el)) {
        const orig = originalTitles.get(el)!;
        if (el.getAttribute("title") !== orig) {
          el.setAttribute("title", orig);
        }
      }
    }

    // Children
    for (let i = 0; i < el.childNodes.length; i++) {
      processNode(el.childNodes[i], toPt);
    }
  }
}

export function applyTranslations() {
  if (typeof window === "undefined" || !document.body) return;
  const locale = (localStorage.getItem("paperclip_locale") || navigator.language || "en").toLowerCase();
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
