import { describe, expect, it } from "vitest";
import { connectionDisplayNameForOwner } from "./connection-owner";

describe("connectionDisplayNameForOwner", () => {
  it("detects OmniRoute from baseUrl and overrides generic OpenAI name", () => {
    const conn = {
      name: "My OpenAI API",
      config: {
        baseUrl: "https://api.omniroute.io/v1",
        ai: { provider: "openai" },
      },
    };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", null)).toBe("My OmniRoute API");
  });

  it("detects OmniRoute on custom domain (e.g. omniroute.trollzera.com) and respects owner", () => {
    const conn = {
      name: "My OpenAI API",
      config: {
        baseUrl: "https://omniroute.trollzera.com/v1",
        ai: { provider: "openai" },
      },
    };
    const owner = { label: "Matheus", image: null };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", owner)).toBe("Matheus’ OmniRoute API");
  });

  it("handles \"My OpenAI API account\" generic name", () => {
    const conn = {
      name: "My OpenAI API account",
      config: {
        baseUrl: "https://api.omniroute.io/v1",
        ai: { provider: "openai" },
      },
    };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", null)).toBe("My OmniRoute API");
  });

  it("detects DeepSeek from baseUrl", () => {
    const conn = {
      name: "My OpenAI API",
      config: {
        baseUrl: "https://api.deepseek.com/v1",
        ai: { provider: "openai" },
      },
    };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", null)).toBe("My DeepSeek API");
  });

  it("preserves explicitly customized connection names", () => {
    const conn = {
      name: "Production Gateway OmniRoute",
      config: {
        baseUrl: "https://api.omniroute.io/v1",
        ai: { provider: "openai" },
      },
    };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", null)).toBe("Production Gateway OmniRoute");
  });

  it("leaves standard native OpenAI connections as OpenAI", () => {
    const conn = {
      name: "My OpenAI API",
      config: {
        ai: { provider: "openai" },
      },
    };
    expect(connectionDisplayNameForOwner(conn, "OpenAI", null)).toBe("My OpenAI API");
  });
});
