import fs from "node:fs/promises";

const DEFAULT_AGENT_BUNDLE_FILES = {
  default: ["AGENTS.md"],
  ceo: ["AGENTS.md", "HEARTBEAT.md", "SOUL.md", "TOOLS.md"],
} as const;

type DefaultAgentBundleRole = keyof typeof DEFAULT_AGENT_BUNDLE_FILES;

function resolveDefaultAgentBundleUrl(role: DefaultAgentBundleRole, fileName: string) {
  return new URL(`../onboarding-assets/${role}/${fileName}`, import.meta.url);
}

export async function loadDefaultAgentInstructionsBundle(role: DefaultAgentBundleRole): Promise<Record<string, string>> {
  const fileNames = DEFAULT_AGENT_BUNDLE_FILES[role];
  const entries = await Promise.all(
    fileNames.map(async (fileName) => {
      let content = await fs.readFile(resolveDefaultAgentBundleUrl(role, fileName), "utf8");
      if (fileName === "AGENTS.md") {
        content = `${content}\n\n- Idioma e Comunicação: Comunique-se, formule perguntas, escreva comentários de tarefas e crie planos/documentos sempre em Português do Brasil (pt-BR), a menos que o usuário solicite explicitamente outro idioma. Nunca responda em inglês quando o usuário ou a organização se comunicar em português.\n`;
      }
      return [fileName, content] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export function resolveDefaultAgentInstructionsBundleRole(role: string): DefaultAgentBundleRole {
  return role === "ceo" ? "ceo" : "default";
}
