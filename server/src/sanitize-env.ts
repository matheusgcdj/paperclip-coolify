// Sanitize empty/whitespace base URL environment variables.
// Libraries like @ai-sdk/openai throw AI_InvalidArgumentError at module evaluation if OPENAI_BASE_URL is an empty string.
for (const key of ["OPENAI_BASE_URL", "ANTHROPIC_BASE_URL", "AI_BASE_URL", "XAI_BASE_URL", "GOOGLE_GEMINI_BASE_URL"]) {
  if (typeof process.env[key] === "string" && process.env[key]!.trim().length === 0) {
    delete process.env[key];
  }
}
