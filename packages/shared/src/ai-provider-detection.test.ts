import { describe, expect, it } from "vitest";
import { detectAiProviderNameFromUrl } from "./ai-connections.js";

describe("detectAiProviderNameFromUrl", () => {
  it("detects OmniRoute from various URL forms", () => {
    expect(detectAiProviderNameFromUrl("https://api.omniroute.io/v1")).toBe("OmniRoute");
    expect(detectAiProviderNameFromUrl("https://omniroute.trollzera.com/v1")).toBe("OmniRoute");
    expect(detectAiProviderNameFromUrl("https://custom.omniroute.ai/v1")).toBe("OmniRoute");
    expect(detectAiProviderNameFromUrl("http://omniroute:8000/v1")).toBe("OmniRoute");
  });

  it("detects other known providers", () => {
    expect(detectAiProviderNameFromUrl("https://openrouter.ai/api/v1")).toBe("OpenRouter");
    expect(detectAiProviderNameFromUrl("https://api.deepseek.com/v1")).toBe("DeepSeek");
    expect(detectAiProviderNameFromUrl("https://api.groq.com/openai/v1")).toBe("Groq");
    expect(detectAiProviderNameFromUrl("http://localhost:11434/v1")).toBe("Local Provider");
  });

  it("handles empty or invalid inputs safely", () => {
    expect(detectAiProviderNameFromUrl("")).toBe("");
    expect(detectAiProviderNameFromUrl(undefined)).toBe("");
    expect(detectAiProviderNameFromUrl(null)).toBe("");
    expect(detectAiProviderNameFromUrl("not a url")).toBe("");
  });
});
