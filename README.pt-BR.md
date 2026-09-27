<p align="center">
  <img src="doc/assets/banner.jpg" alt="O Paperclip é o aplicativo que as pessoas usam para gerenciar agentes de IA no trabalho." width="720" />
</p>

<p align="center">
  <a href="#início-rápido"><strong>Início Rápido</strong></a> &middot;
  <a href="https://docs.paperclip.ing"><strong>Docs</strong></a> &middot;
  <a href="https://github.com/paperclipai/paperclip"><strong>GitHub</strong></a> &middot;
  <a href="https://discord.gg/m4HZY7xNG3"><strong>Discord</strong></a> &middot;
  <a href="https://x.com/papercliping"><strong>Twitter</strong></a> &middot;
  <a href="https://paperclip.ing"><strong>Site</strong></a>
</p>

<p align="center">
  <a href="https://github.com/paperclipai/paperclip/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="Licença MIT" /></a>
  <a href="https://github.com/paperclipai/paperclip/stargazers"><img src="https://img.shields.io/github/stars/paperclipai/paperclip?style=flat" alt="Estrelas" /></a>
  <a href="https://www.star-history.com/paperclipai/paperclip"><img src="https://api.star-history.com/badge?repo=paperclipai/paperclip" alt="Ranking do Histórico de Estrelas" /></a>
  <a href="https://discord.gg/m4HZY7xNG3"><img src="https://img.shields.io/badge/discord-join-7289da" alt="Discord" /></a>
</p>

<br/>

<div align="center">
  <video src="https://github.com/user-attachments/assets/773bdfb2-6d1e-4e30-8c5f-3487d5b70c8f" width="600" controls></video>
</div>

<br/>

# O Paperclip é o aplicativo que as pessoas utilizam para gerenciar agentes de IA no trabalho.

Orquestração open-source para equipes de agentes de IA.

**Se o OpenClaw é o _funcionário_, o Paperclip é a _empresa_.**

O Paperclip é um servidor em Node.js com interface em React que orquestra uma equipe de agentes de IA responsável por conduzir um negócio. Traga seus próprios agentes, atribua objetivos e monitore o trabalho e os custos através de um painel único.

Na superfície, parece apenas um gerenciador de tarefas. Mas debaixo do capô: organogramas, orçamentos, governança, alinhamento de metas e coordenação entre agentes.

**Gerencie objetivos de negócio, não pull requests.**

|        | Etapa            | Exemplo                                                            |
| ------ | --------------- | ------------------------------------------------------------------ |
| **01** | Defina o objetivo | _"Construa o aplicativo #1 de anotações com IA e alcance US$ 1M de receita."_ |
| **02** | Contrate a equipe | CEO, CTO, engenheiros, designers, time de marketing — qualquer robô, de qualquer provedor. |
| **03** | Aprove e rode | Revise a estratégia. Defina os orçamentos. Dê a largada. Acompanhe tudo do painel! |

<br/>

<div align="center">
<table>
  <tr>
    <td align="center"><strong>Funciona<br/>com</strong></td>
    <td align="center"><img src="doc/assets/logos/openclaw.svg" width="32" alt="OpenClaw" /><br/><sub>OpenClaw</sub></td>
    <td align="center"><img src="doc/assets/logos/claude.svg" width="32" alt="Claude" /><br/><sub>Claude Code</sub></td>
    <td align="center"><img src="doc/assets/logos/codex.svg" width="32" alt="Codex" /><br/><sub>Codex</sub></td>
    <td align="center"><img src="doc/assets/logos/cursor.svg" width="32" alt="Cursor" /><br/><sub>Cursor</sub></td>
    <td align="center"><img src="doc/assets/logos/bash.svg" width="32" alt="Bash" /><br/><sub>Bash</sub></td>
    <td align="center"><img src="doc/assets/logos/http.svg" width="32" alt="HTTP" /><br/><sub>HTTP</sub></td>
  </tr>
</table>

<em>Se consegue receber um heartbeat (sinal de vida), está contratado.</em>

</div>

<br/>

## O Paperclip é perfeito para você se:

- ✅ Você quer construir **organizações autônomas dominadas por IA**.
- ✅ Você **coordena muitos agentes diferentes** (OpenClaw, Codex, Claude, Cursor) sob o mesmo teto rumo a um propósito.
- ✅ Você percebe que costuma manter **20 terminais do Claude Code abertos em simultâneo** e perde completamente o controle de quem está fazendo o quê.
- ✅ Você deseja agentes operando forma **autônoma trabalhando 24/7**, mas ainda exige acompanhar as auditorias e interferir interativamente quando preciso.
- ✅ Você precisa **monitorar custos**, cobrar resultados e definir tetos de carteira (budgets).
- ✅ Você prefere que a gestão e criação de agentes flua de modo **intuitivo e idêntico a um gerenciador de tarefas**.
- ✅ Você anseia liderar seu negócio e empresas baseadas em AIs pelo próprio **celular**, não apenas via CLI/Terminal no computador de mesa.

<br/>

## Os quatro pilares

Qualquer organização composta de agentes baseados em Inteligências Artificiais requer fundamentalmente que a infraestrutura se sustente por quatro vértices para dar retorno: as tarefas, a coordenação da empresa no organograma (Org Chart), o treinamento de novas habilidades e a infraestrutura dos sistemas. O Paperclip é edificado nativamente contendo este suporte.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/paperclipai/paperclip/1ec33ffd8b597f7e36aac3e2fbb4665b8c42dc3c/doc/assets/four-pillars-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/paperclipai/paperclip/1ec33ffd8b597f7e36aac3e2fbb4665b8c42dc3c/doc/assets/four-pillars-light.png">
  <img src="https://raw.githubusercontent.com/paperclipai/paperclip/1ec33ffd8b597f7e36aac3e2fbb4665b8c42dc3c/doc/assets/four-pillars-light.png" alt="Os quatro pilares do Paperclip">
</picture>

| Pilar | Desenhado para | O que engloba |
| --- | --- | --- |
| **Gerenciador de Tarefas do Agente** — Declare o objetivo. Os agentes trabalham. Você revisa/aprova a saída. | Para o uso cotidiano (Todos) | Tarefas, aprovações, revisões · Agentes proativos atuando corporativamente como colegas · Rotinas de auditorias · Verifique com evidências como capturas de telas através do CLI, diffs nos pull-requests e suites de testes locais de verificação. |
| **Organograma dos Agentes (Org Chart)** — Separe e nomeie com funções: permissões, limites entre bots ou humanos. | Gestores | Organogramas corporativos mistos com humanos+agentes · Responsabilidades restritivas e em camadas baseadas da matriz · Governança na estrutura organizacional (quem edita as configurações base?) · Vazamentos isolados (segredos contidos individualmente nos níveis superiores - nunca compartilhe API Keys ativas globalmente onde um bot local mal instruído teria poder de visualizar, mas permita herdar de cima os proxies das IAs do CEO via credenciais limitadas). |
| **Treinamento e Ensino Corporativo da Base** — Ensine e forme seus "bot" colaboradores em escala. | Profissionais Técnicos/Recursos Humanos para IA | Extensões baseadas em repositórios (Skill Studio - Loja de Habilidades) · Execuções isoladas com aprendizado contínuo onde os testes e o workflow (run) ensina a inteligência internamente |
| **Sistema Operacional do Agente** — Como toda máquina industrial, um bom ecossistema. | Equipes de TI de Plataformas | Ambientes independentemente do provedor, para rodar IAs · Integrações unificadas independentes · Ferramentas conteinerizadas ou integrando MCP de conexões corporativas como o SSO, Auth, GRC (Compliance) · Orçamentos centralizados. |

<br/>

## Recursos e Vantagens Principais

<table>
<tr>
<td align="center" width="33%">
<h3>🔌 Traga o Seu Próprio Agente (BYOA)</h3>
Qualquer agente e plataforma em um só organograma compartilhado. Consegue escutar "Sinal de Vida" (Heartbeat)? Tá dentro.
</td>
<td align="center" width="33%">
<h3>🎯 Alinhamento de Missão</h3>
Tarefas avulsas carregam contexto direto com a organização que a originou. Eles vão entender não apenas o "o quê" mas sim o "porquê" daquilo.
</td>
<td align="center" width="33%">
<h3>💓 Disparo de Heartbeats</h3>
Sincronismos onde o "botão de Go" levanta as instâncias, puxa os arquivos, audita tarefas do log ou envia o sinal em árvore vertical.
</td>
</tr>
<tr>
<td align="center">
<h3>💰 Controle Financeiro Integrado</h3>
Limite diário e mensal imposto sem margem pra bug! Quota no teto de vidro. Quando atingirem o número da verba do bot (budget limit), eles auto-suspendem até o CTO estourar limite superior e liberar. Elimina sangramentos incontroláveis.
</td>
<td align="center">
<h3>🏢 Multi-Inquilinos (Organizações)</h3>
Do mesmo servidor VPS com 1 painel instanciado único você comanda vários painéis isolados como ERP corporativo (portfolio isolation data center).
</td>
<td align="center">
<h3>🎫 Tracking via Tickets e Ordens</h3>
Não um sistema crua! Se seu bot resolveu escrever 37 arquivos de vez: todo pedido possui decisão arquivada. "Ajudes ou Erros", tudo vira Ticket Imutável (auditoria transparente no painel log).
</td>
</tr>
<tr>
<td align="center">
<h3>🛡️ Fermento de Gestão Operacional</h3>
Bot desguiou, engajou num bug num script shell ou apagou uma base? Corte ou bloqueie o pull-request sem sair da mesa (aprovação obrigatória), anule estratégia, trave, substitua. A hora que quiser.
</td>
<td align="center">
<h3>📊 Hierarquia Administrativa</h3>
Tudo mapeado em árvore com hierarquia - eles agora prestam conta. "Chefe de Backend", "Assistante Técnico"... os papéis guiam os relatórios do Paperclip.
</td>
<td align="center">
<h3>📱 Layout de Navegação Responsivo iOS/Android</h3>
Você não precisa levar tablet ou abrir o notebook no modo escuro pra aprovar orçamento/ver como anda... gerencie da praia ou sofá pelo PWA completo no seu iPhone!
</td>
</tr>
</table>

<br/>

## Resolvendo Problemas que Sugam o seu Ar

| Vida Sem o Paperclip                                                                                                                                   | Vida Com o Paperclip                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ Você cria janelas de bate-papo à beça (20 janelas em paralelo no Claude Desktop) e na hora de fechar ou o PC reiniciar o contexto se desfaza nas memórias flutuantes. | ✅ Tarefas com emissão de TICKETS gravados nativamente! Mesmo em Hard Reboot da instância server ou VPS as memórias restabelecem as sessões abertas de forma resiliente!                                                |
| ❌ Todo bot exige o Ctrl+C/Ctrl+V de "quem o usuário é". Prompt Engineering constante pra lembrar aos bots a "meta x, o negócio da gente faz tal coisa e usa Node/Python".                                     | ✅ Regra Corporativa em Massa! Contexto herda do "Projeto -> Company". Tudo automático. Ele sempre sabe qual ambiente, meta-chave do squad ou por qual razão de vendas a task ta ativada.                  |
| ❌ Montar orquestração manual em pastas jogadas num Vscode com configurações independentes em .JSON e reinvenção rotineira de tarefas ou script bash. | ✅ O painel do Paperclip já traz Delegações Prontas, "Sinalizações Administrativas" e Estruturas prontas pra botar em linha as diretrizes empresariais da IA sem brincar de fazer gambiarras manuais nas janelas limitadas da interface gringa original. |
| ❌ IA preso no Loop infinito devorando seus limites e quebrando seu mês na Conta do Cartão com +$$ dólares torrados. Você até chora pra OpenAi por Chargebacks nas calls desnecessárias de API de bug | ✅ Painel "Rastreador de Custões": Controle total unificado do Fluxo - Você impõe de 1 a N dólares e acabou. Priorize sua verba pelo uso na governança! |
| ❌ Automações periódicas com Cron Jobs precisando disparar de fora no Servidor toda 9h pra IA ver relatórios financeiros da bolsa e compilar.                       | ✅ Módulo NATIVO: "Heartbeats e Rotinas": Painéis geram cronjobs automáticos. "Faça ISSO toda segunda".                       |
| ❌ A Ideia brilha do nada nas suas andanças na rua... Você anota em um bloquinho, acha tempo livre e entra pra chamar o bot abrir portas, configurar docker.. E aguardar pacientemente ali..   | ✅ Cadastre uma Task no app onde quer que estejas. Seu *Robô Coding Agent* escuta o heartbeat local ou em cloud, bota a mão na massa, resolve, implementa os testes e espera apenas a sua checagem humana do painel de Aprovação final para fundir no branch. Praticamente Mãos-livres!                             |

<br/>

## Por que a Abordagem do Paperclip Difere da Concorrência?

Porque entendemos perfeitamente da dor e minúcias complexas e sujas da infra em backends operando Multiplataformas da API de linguagem para bot autônomo e tratamos tudo pra escalar:

|                                   |                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Sincronismo Transacional Isolado.**             | Um ticket nunca colide - Se há limites travados ou orçamentos, nós matamos os conflitos ali mesmo atômicamente pra inibir repetições caras.               |
| **Estabilidade Perpétua de Longa Vida.**       | Reiniciou? Os contextos sobrevivem! Sessões recriadas do exato ponto e continuam tarefas nas pulsações.                    |
| **Loja de Customizações em Trânsito Livre (Runtime Skill Injection)**      | Precisa corrigir fluxo falho ou adicionar contexto temporário da equipe? Nossas Skills injetam e ensinam fluxos nativos pros agentes enquanto ele está EM OPERAÇÃO (sem reiniciar/retreinar a rede inteira).                      |
| **Comitê Interno Anti-Apocalipse (Governança/Rollbacks Seguros).**     | Alteração arriscada que seu AI tomou? A proteção bloqueia passos errantes antes mesmo de mesclarem dados críticos - revisões de portas nas mãos de gestores aprovadores online. Se errarem? Há *Historial em Commit e Log*, reverta facilmente (Rollbacks e Diff Versions). |
| **Evolução Multi-Companhia em um Node Server Host Local**         | Tudo aqui dentro nasce Compartimentado! O App foi isolado na estrutura. Suba num *VPS de $5 dólares pelo Coolify, rodando Node.js* e atenda desde a companhia sua pessoal vendendo bugigangas... até uma mega incorporadora multi-site tudo da MESMA DOCKER INSTALL! Cada uma opera em ambientes de dados totalmente fechados usando uma única licença de sistema base. |

<br/>

## A Engenharia Oculta: O Motor Subjacente

O Paperclip é uma plataforma madura e robusta de *Control Plane* (Gestor Tático centralizado), não um envelopamento descartável de APIs. Entenda nossa modelagem profunda que opera unificadamente:

```
┌──────────────────────────────────────────────────────────────┐
│                       SERVIDOR PAPERCLIP                     │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │Identidade │  │Trabalho & │  │ Execução  │  │Governança │  │
│  │  E Acesso │  │  Tarefas  │  │ Heartbeat │  │ & Aprova. │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │Organograma│  │ Espaços & │  │  Plugins  │  │Orçamentos │  │
│  │ & Agentes │  │  Runtime  │  │           │  │ & Custos  │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │ Rotinas & │  │ Segredos &│  │ Atividade │  │Mobilidade │  │
│  │ Agendas   │  │ Storages  │  │ & Eventos │  │Da Empresa │  │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │
└──────────────────────────────────────────────────────────────┘
         ▲              ▲              ▲              ▲
   ┌─────┴─────┐  ┌─────┴─────┐  ┌─────┴─────┐  ┌─────┴─────┐
   │  Claude   │  │   Codex   │  │   CLI     │  │ Webhooks  │
   │   Code    │  │           │  │  Agents   │  │ HTTP Bots │
   └───────────┘  └───────────┘  └───────────┘  └───────────┘
```

### O Que Tudo Isso Significa:

<table>
<tr>
<td width="50%">

**Motor SSO & Identidades e Acessos Protegidos** — Cansado de scripts shell? Fornecemos painel local seguro com Modos Duplos (Modo Autenticado para a Web Pessoal versus Proxy Fechado com Confiança Isolada Local). Convidemos humanos pra equipe via Hub central da conta... E toda solicitação do Agente gera um "JWT curto" para assegurar conexões com rastreio absoluto de onde quem ou tal bot fez x alteração.

</td>
<td width="50%">

**Organograma dos Agentes & Empregados Digitais** — Nenhuma inteligência solta no infinito! Cada um preenche um cargo de Título Oficial (CTO, Redator Senior). Podem utilizar a fundação e os contornos restritivos via Roles e Orçamentos da corporação. Adaptadores abertos rodam Claude Code CLI, Python OpenClaw, HTTP da Vercel ou Gemini em shell Linux/Mac de linha de comando. E repito: Sinal Vital pulsou? Estão admitidos no HR dele.

</td>
</tr>
<tr>
<td>

**Máquinas de Work Flow Isolados (Workspaces & Runtimes Independentes)** — Isolamento virtual: o Bot desenvolvedor em Node não frita seu banco de dados de Redes Python se um quebrar porque nós subimos eles em pastas, galhos (branches Git do código fonte isolado de modo operador restrito) que espelham Dev Servers customizáveis. É o equivalente a botar ele trabalhando no prato dele e as ferramentas à mesa em local blindado sempre que o alarme despertar... Contexto não se perde e arquivos ficam intocáveis pros demais colaboradores!

</td>
<td>

**Governança & Barreiras em Tickets de Workflow** — Políticas operacionais severas! Nada avança pro Github Prod sem liberação via conselho/comentários e crivo explícito humano nas chaves operacionais! O chefe (Você ou um Agente Gerente-General de Confiança) bloqueia repositórios pra revisão (Hold-Up / Pausa Forçada) e encerra as tasks se fugir aos controles da política orçamentária para a equipe base. Tudo documentado em atas duradouras da própria empresa na Database SQL nativa.

</td>
</tr>
<tr>
<td>

**Extensões Pós-Mercado (Ecossistema Fechado de Plugins)** — O Paperclip permite carregar ou programar plugins fora do código núcleo num ecossistema aberto como um painel da App Store. Isso abre gateways como exposição interna pra integrar em UI ou adicionar painéis sem bifurcar o núcleo ou manter forks (Sincronize novas implementações ao master fácil)

</td>
<td>

**Ata Segura De Senhas: Seu Cofre e Banco De Objetos Restrito (Secrets Vault & Media Attachments)** — Nunca acople Chaves de AWS SSH_Keys, Logins, ou API Públicas das carteiras dentro das definições ou instruções prompt num markdown TXT qualquer. Ele entrega apenas chaves transitórias no Run Scope temporário em background caso precise delas sem a capacidade direta da LLM observar as plain text e gravar elas sem malicia acidental. Além do repositório em disco nativamente.

</td>
</tr>
<tr>
<td>

**Bancos Portáteis & Extrativos** — Sua Infraestrutura Multi-Inquilina. Deseja levar um Time inteiro que você testou exaustivamente para a Servidora do seu cliente via export/import JSON blindado contra colisão pra eles executarem nas próprias instâncias SaaS da conta da nuvem deles? Nossos templates nativamente "Apagam a Mente e o DNA Secreto da sua org", transportam apenas hierarquias e lógicas organizacionais isoladas corporativamente para outros implantarem um hub Paperclip da estaca zero ou em paralelo com instâncias SaaS unificadas na plataforma cloud global!

</td>
</tr>
</table>

<br/>

## O que o Paperclip NÃO é:

|                              |                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Não somos Chatbots Isolados.**           | Os nossos IA Agents resolvem negócios de peito aberto (trabalham interativamente, sem estarem enclausurados numa tela pop-up onde esperam ordens avulsas. Eles tomam atitude). |
| **Não somos Biblioteca ou SDK de Agentes Custom.**  | A plataforma não ensina via NodeJS um Langchain pra subir um Bot e conversar com um pdf. Nós integramos aquilo num painel completo organizacional real. |
| **Não somos Automação do Zapier Limitada.**  | O foco abrange a criação de um Sistema de Táticas. Você configura de ponta-a-ponta, hierarquias, budget impeditivo, perfis dinâmicos de organogramas empresarias e delegar tickets rastreáveis, não só arrastar bloquinhos de scripts bash na tela de forma visual. |
| **Não é um Ferramenta Dedicada Somente ao Prompt.**    | Você tem Codex/Cursor/Grok/Anthropic? Insira ali. Deixe os Runtimes, Contextos longos ou Modelagens no CLI que usarem - a gente vai servir a Camada Executiva (A empresa).           |
| **Não somos direcionados as pessoas Monolíticas com só UM agent.** | É construído pro exército colaborativo. Se você programa de hobby e levanta um bot pontual rodando 2 loops ao mês de script num bot local e fechado: O Paperclip é over-kill. **Temos multi-agents simultâneos com papéis onde a confusão escala. Se a banda fica louca: nós coordenamos!** |
| **Não somos Avaliadores Diretos de Códificação (Não somos o "Code-review automático" avulso na Pipeline Github).**  | O Paperclip orquestra o TRABALHO da força. Ele monitora aprovações, relata falhas pra você fazer merges.. Traz seu príncipio unificado da revisão do app!      |

<br/>

## Início Rápido

Código-fonte livre. Auto-hospedável local (`self-hosted`). Conta Paperclip Cloud **NÃO é requisitada** para operar sua instância de nuvem!

```bash
curl -fsSLO https://paperclip.ing/install.sh
curl -fsSLO https://paperclip.ing/install.sh.sha256
if command -v sha256sum >/dev/null 2>&1; then
  sha256sum -c install.sh.sha256
else
  shasum -a 256 -c install.sh.sha256
fi
bash install.sh
```

Nosso script instalador checará ativamente se você já dispõe no seu OS do Node.js versão superior a `24.11` global ou superior e proverá a cópia empacotada oficial CLI mantida invisível e organizada sob a estrutura `~/.paperclip/cli`. Iniciando logo sob o terminal um assistente fluído! Pode assinar registros daemon via OS nativamente no MacOS / Linux Backgrounds com suportes totais e absolutos. Validadores cruzados de integridade detectam falsões se baixados sob proxys maliciosos pelas assinaturas seguras que empacotam o `.sh` garantindo sua saúde binária - ou clone manualmente direto dos scripts originários daqui.

Caso prefira modo desacompanhado e contínuo para Scripts sem interações shell:

```bash
curl -fsSL https://paperclip.ing/install.sh | bash -s -- --no-prompt --no-onboard
paperclipai onboard --yes
```

> Aviso Rápido de Segurança: Quando canalizado com `| bash -s` a instalação requisitará a presença dos utilitários subjacentes Node.js, bash e npm de fora para acoplar sem sudo na pasta local.

Test Drive Exploratório (Sandbox Isolado & Transiente) - Inicia a memória isolada RAM da plataforma na web temporariamente via npx puro, executando o CEO da companhia a partir das Chaves Locais sem criar artefatos perpétuos! Quando terminar, tudo some! Teste primeiro:

```bash
npx --registry https://registry.npmjs.org paperclipai onboard --yes

# Outros parâmetros dinâmicos nativos na invocação do teste efêmero da ferramenta:
ANTHROPIC_API_KEY=... npx paperclipai test-drive
OPENAI_API_KEY=... npx paperclipai test-drive --harness codex
OPENROUTER_API_KEY=... npx paperclipai test-drive \
  --harness opencode \
  --model openrouter/anthropic/claude-sonnet-4.5
```

Múltiplos flags rodam contornos únicos - Exemplo: Passando instanciadores estáticos como `--data-dir` permite aos arquivos retomarem sessão isolada para o teste efêmero em sua máquina sem poluir globais. Diretório espelhado Git acoplado detectam automaticamente sua Workspace caso rode na pasta raiz.
Veja mais na API CLI do paperclip acessando: [`doc/CLI.md`](doc/CLI.md#isolated-manual-test-drives) (Comportamentos, credencializações temporárias...).

> **Resoluções (Solucionando Travadas em `.npmrc` Privados Fechados e de Redes Corporativas via VPN)**
> 
> Se rodou o NPM ou NPX caindo numa armadilha comum do erro `E404` tentando achar o Pacote `paperclipai` nos seus pacotes internos confinados por registros fechados (exemplo do ambiente coorporativo da Nexus API interna customizada com `~/.npmrc` alterado), basta mandar a flag explícita puxando pra nossa pipeline NPM mundial externa aberta usando a saída cruzada forçante:
> 
> Check: `npm config get registry` 
> Se for diferente deste abaixo, substitua usando Bypass: `npx --registry https://registry.npmjs.org paperclipai onboard --yes`

Isso foca de princípio no "Local Loopback Otimizado" permitindo abrir sem logar/redirecionar se os endereços são de domínio interno do mesmo proxy de tráfego seu. Contudo se preferir blindagens Autenticadas/Privadas na rede online abertas em modo exposto - configure pra travar a UI por sessões (Aba login pra usuários com Auth Seguro):

```bash
paperclipai onboard --yes --bind lan
# Ou alternativo via Tailscale Integrado Ativo globalmente seguro
paperclipai onboard --yes --bind tailnet
```

O comando global `paperclipai configure` também atesta suporte estrito à edições offline completas nas definições atuais ativas para que você não necessitaria rodar interações setup infinitas e possa editar no backend tudo por arquivos de rotas.

Aprenda implantações profundas escalonadas (Canarys refs), integrações na árvore da vida das organizações como rollbacks no banco ou como remover por completo na documentação mestra: [`doc/INSTALLING.md`](doc/INSTALLING.md) 

### Ou via Modo Código-Fonte Completo Manual do Dev (Compilação Nativa):

```bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev
```

E voilà! Isso dispara os monitores de serviços compilando na porta `http://localhost:3100` diretamente injetado ao React UI. Bancos PostgreSQL Embutidos atrelam a sincronização na mesma montada (Instalador SQL Lite integrado dispensa instalação prévia de banco relacional!).

> **Pré-Requisitos Manuais Absolutos:** Node.js 24.11+ e Instalador Rápido PNPM 9.15+

<br/>

## FAQ & Dúvidas Mais Frequentes

**Como se parece um painel/execução operando na vida real e estruturada corporativa em implantação hoje?**
Num ambiente limpo Node.js o processo abre com Postgres embutido sem conexões online terceiras necessárias do app web - arquivos em diretórios da pasta em container nativo. Quer usar Nuvem do VPS / Cloud (Produção Online Remota Global)? Ative sua própria infraestrutura embutindo PostgreSQL real, use Vercel / Herokus ou Painéis e nós trabalharemos lado a lado (Seja o arquiteto autônomo e ele atende todas as fronteiras de configuração como "Cofres do agente e Orçamentos isolados na nuvens").

Trabalhando autônomo local e testando pra uso 1 pra 1 corporativo? Conecte seu PC no tunelamento global através da infra VPN integrada global *Tailscale*, rode no seu ambiente privado sem publicá-los nas vitrines na rede com exposição 0 e você monitora seus relatórios das estradas usando seu smartphone abrindo a mesma instância de casa em real-time. Quando quiser profissionalizar exposte, lance-o global em um SaaS Vercel final pra os clientes com as integrações portáveis!

**É exequível criar centenas de "companhias digitais SaaS" paralelas aqui?**
SIM MÁXIMO! Diferente de outros softwares de painel de prompt avulsos, nós projetamos e desenhamos toda a raiz como arquitetura isolada central multilocatária! O painel isolará cada agente base da Companhia Y contra Companhia X sem interferência do painel raiz - garantidas num único banco relacional as trilhas isolada entre suas 12 companhias sob as mesmas chaves unificadas sem recriar múltiplas Instâncias. 

**Em quais vertentes operacionais e tecnológicas este conceito (A Empresa) colide ou diverge da modelagem comum base de bots autônomos puros interativops em CLI? (Como CodeX, Devins ou Claude)**
O Paperclip **SUB_ALUGA** as mentes da IA dessas potências (Esses são os cérebros), a Plataforma deles responde mas a Coordenação do nosso ambiente, Painel Front, Tickets de Resolução atrelada às métricas monetárias limitadores em Orçamento Central Corporativo com Governança a nós gerimos tudo global. Isso torna viável rodar o cérebro OpenAI num organograma com Chefes hierárquicos interligados. Eles executam. A nossa orquestração controla!

**Por que eu deveria integrar agentes aqui ao invés de codar um robô bot nativo integrando via webhooks simples as issues originais em um JIRA, Notion ou Kanban do Trello nativamente com a ajuda de prompts avulsos pro OpenClaw?**
Orquestramentos massivos corporativos lidam de cara com armadilhas dolorosas contra erros operacionais, gestão falha nos limites de uso monetários invisíveis entre provedoras da AWS ou IA que engatilham faturas diárias e, centralizar essas orquestras numa ferramenta desenhada apenas pro Bot autônomo previne furos em sincronizações de chaves secretas/credenciais/repositórios corrompidos dos diretórios e garante reestrutrações resilientes pós-reinicializadas sem perder em tempo real context logs! A Paperclip centraliza e evita que reinventem essas "Rodas Quadradas" na unha a cada nova base/framework!

*(Obs de Engenharia do Futuro: Uma estrada livre a caminho - Estamos criando suporte Bring-Your-Own-Tickets na Plataforma, que viabiliza importar tudo que for base nativa Jira, Github e Linear como extensões em cima dos nossos painéis para alimentar seus times num dashboard só em breve na Roadmap!)*

**Como e Onde as sessões das memórias sobrevivem contínuamente na infra (Autônomamente)?**
O pulso de "Estímulo de Acordar" gerado sob Demanda ativa com Eventos ("O chefe criou uma issue Nova no Slack" > Bot reage / "Usuário Mencionou ele no Comentário do Repo" > Pull e Resolve > Agregação cronometrada ao longo dos tempos em CronJobs Heartbeat), a máquina desperta, alinha base central do banco local DB, insere e dorme. Acopla em modo daemon, webhooks abertos... Se adaptam pra servir a todas coordenações ativas onde nós unicamente sincronizamos tudo sem sobreposições desorientas sem sua vigilância corporativa em massa da auditoria central.

<br/>

## Guias Específicos para Contribuição Diária do Desenvolvedor Back/Front

```bash
pnpm dev              # O Modo Deus do Ambiente Node (Vigília Múltipla Nativa: Server+UI ativadas, Hot Module Substitutions reativas à mudanças no src online no navegador)
pnpm dev:once         # Mesmo da rotina full em 1 única passagem para ignorar sentinelas de mudanças na memória ativa
pnpm dev:server       # Módulo Back/Headless para atuar com Server nativo na raiz apenas com portas APIs limpas
pnpm dev:mobile       # Espelho com proxy reativo pré-construído emulado numa porta cruzada porta :3101 mirando /api no root :3100
pnpm dev:both         # Junção reativa de `pnpm dev` padrão de navegador de terminal operando sincronismo ativo cruzado pra mobile app server no loop e debug multi-device `pnpm dev:mobile` ativo juntos ao mesmo tempo
pnpm build            # Motor compilador geral massivo pra release unificado e final pro Typescript
pnpm typecheck        # Avalia nativamente sem soltar/salvar nenhum output de compilador para achar quebras nos importes da cadeia TS em pacotes
pnpm test             # Rotinas rápidas vitest - varreduras dos módulos curtos (barato) locais que excluem renderização de frontend Playwright 
pnpm test:watch       # Modo interativo CLI (watch) p/ rodar apenas de classes vitest e reagir em real time
pnpm test:e2e         # Robôs End-to-End da biblioteca Playwright do Chrome/Firefox interagindo no DOM visual clicando interfaces
pnpm db:generate      # Triggers nativos pro Drizzle acoplar atualizações nos Modelos mapeados na pasta schema criando o script real e único transacional na .SQL
pnpm db:migrate       # Appplica na sua memória base PostgresSQL central todas .SQL nativas da pasta pro BD
```

A base enxuta que chamamos rotineiramente por `$ pnpm test` dispensa de sobrecarga visual dos ambientes pesados como UI e testadores browser (O Teste base cru ignora toda as suites test:e2e no run cotidiano limpo de unit-tests base do módulo interno. Exclusivo de CIs nas integrações PR!).

Vislumbra toda modelagem dos Guias Desenvolvedores profundos mergulhando em nossos repositórios acoplados da base no guia da bíblia de setup: [doc/DEVELOPING.md](doc/DEVELOPING.md).

<br/>

## Roadmap Completo dos Marco de Projeto (Planos)

- ✅ Base Principal: Sistema Aberto Plunge-in p/ Plugins (extensões acopladas sem modificar core do app pra acoplar KB corporativos, rastreios personalizados e relógios de tráfego central nativo)
- ✅ Importações de Funcionários da Linha OpenClaw Nativa para as Organizações no Dashboard central
- ✅ Intercâmbio `companies.sh` (Exportações puras JSON e importação massivamente portáveis transientes e modulares protegidos do seu Banco)
- ✅ Suporte em Bloco unificado TXT em Documentos `AGENTS.md` dinâmicos fáceis no repositório GitHub acoplado pro parse da org em runtime base local.
- ✅ Cédula Completa Habilidades e Marketplace Base das Habilidades via Instalações na Skill Store Cloud / Skill Studios para treinadores na plataforma UI local.
- ✅ Jobs (Heartbeats/Agenda de Rotinas Crons) ativadoras da força produtiva diária sem dependência dos seus CLI via UI
- ✅ Infraestruturas complexas de Governanças (Barreira orçamentárias pesados em dólar nas permissões diárias / limites dos bot para bloqueios financeiros puros nas chaves limitadoras API sem gastos desnecessárias)
- ✅ Camada de Revisão e Auditorias Inter-bots no Painel Final pelo Board App (Gestão Executiva) interativamente!
- ✅ Usuários Humanos Coletivos no SaaS com multi-board
- ✅ Implantação e suporte aos Cloud Agentes de containers globais do ecossistemas Sandboxes sem máquina da empresa! Execuções terceirizadas seguras isoladas dentro do e2b (Escalonadores puros), Servidores limitados Daytona isolado, Modal Runtime seguro global, Cloudflares de tráfegos web e Servidor Kubernetes de gestão remota via docker próprio sem interrupções e falhas escalonadas seguradas remotas! 
- ✅ Gerenciamento Completo Nativo (Ativos criados, Work Artifacts da execução armazenada pra acesso imediato dos Humanos pela empresa das mídias locais das nuvens p/ artefatos globais digitais nativamente criados no ticket)
- ✅ Planning e Workflow interativos! Códificados (Mode Planners iterativo central sem gambiarras onde tudo da estrutura nasce planejado das conversas longas ou revisões, gerando histórico imutável duradouro corporativamente).
- ✅ Checkpoints Puros Interativos (Cão-De-Guarda limitantes base em Recuperações interligadas e Testes Gates/Pontes com barreiras obrigatórios validatários pré-implementação).
- ✅ Proxies Customizados de MCP Universais (Protocolo do Agente Base, Gateways base ferramentas limitadas pra conexão de servidores no contexto local em redes das intuições permitidas governadas com barreiros unificados proxy no painel nativo do core corporativo)
- ✅ Proteção do Secretos do seu app web base cofre! Armazém restritivos onde todas variáveis protegidos das senhas API nas chaves são controladas, auditáveis e exclusivas a apenas Agentes especificamente instanciado para atuar ou acessar a porta via cofres temporários dinâmicos. Sem exposição contínua livre na memória LLM exposta na cloud.
- ✅ Hub Dinâmico Log central do Evento Imutável no Relacionador da Conta! Rastreador puro para ver onde aquele bug nas rotas originaram as atribuições originais em linha contínuos nas modificações totais
- ✅ AutoRecuperações no Loop: Auto-limpeza sem crash se travar servidor em hard reboot no meio da IA puxando! Ele reinicia interativo nativamente restaurando estados da memória efêmera no ticket com segurança.
- ✅ Testador Nativo do App (Aprenda mais e avalie bots com Feedback Corporativo e Suítes em Evals puros isolados diretamente no fluxo organizacional)
- ⚪ Implementações do Banco Pessoal Semântico do Cérebro/KB Longo (Módulos Base da Memória do projeto isoladas por bots base context)
- ⚪ Controle Multi-Instanciado Focado em Teto Total MAXIMIZER MODE Corporativo
- ⚪ Gestores Fiscais e Enfileiradores para Fluxos Expostos da Web Limitadas em Work Queues central p/ processador 
- ⚪ Reações Ativas das Organizações Internas (Self-Organization corporativos adaptáveis em real time dinâmicos limitando perfis com bots independentes de gestores)
- ⚪ Câmaras Modulares do Enriquecimento (O Aprendizado Estrutural de todos Agentes contínuos com aprendizado próprio nativo de loop pra evoluir auto-rotinas orgânicas base nas suas demandas internas exclusivas e interações humanas automáticas - Auto ML Model tuning interativo local organizacional pra bots do painel ativo com a experiência diária corporativa de todos) 
- ⚪ Chat Pessoal interativo direto pelo aplicativo ao nível global: A Janela Pessoal Administrativa do CTO
- 🟡 Infraestruturas SaaS Prontas / Cloud Nativa Implantadoras para isolamentos multilocatários (Base pronta, em exportações implementada via UI já operacionais interativas e robustas)
- ⚪ Lançador Completo Empacotado MacOS / Win Desktop Puros Aplicativos interativos PWA Desktop 
- ⚪ Sincronizações nativas ativas "Jogue seu Ticket Jira Oficial do Banco de Dados aqui": (Extensões nativas na aba do app ligando base Linear, Atlassian, Jira Software e Asana Board pra servir diretamente as tarefas em andamento originais na sua interface pra injetar ao board sem atritos sem alterar seu stack principal atual local corporativo interativo).
- ⚪ Conexão Direta Clickable 1 Click Puros sem scripts CLI (Ex: Click & Deploy Vercel Pura pra IAs sem senhas pra CI Cloud direto e muito mais)

Sendo essa apenas a nossa versão resumida global da grande visão master interativas - Observe na íntegra nossa Estrada Operacional oficial pelo guia de mapas documentados online base no arquivo mestre: [ROADMAP.md](ROADMAP.md).

<br/>

## Comunidade Integrada & Extensões

Puxe extensões interativas personalizadas variadas da base mantida na Comunidade [awesome-paperclip](https://github.com/gsxdsm/awesome-paperclip) nativamente pra uso do seu próprio App

## Rastreamentos & Integridade Analítica (Observabilidade) 

Em prol das métricas absolutas, O painel da instanciamento Web do Paperclip permite optar livremente em habilitar a suíte robusta interativa baseada nos protocolos de telemetria base OpenTelemetry Auto-Instrumentation (Para rastreamentos Server-Side Traces Puros Internos). Ele desperta e ativa sua injeção em base de rotinas contanto que registre o destino base pela váriavel livre do ecossistema servidor `OTEL_EXPORTER_OTLP_ENDPOINT`, aderindo ativamente as bases de protocolos oficiais via env `OTEL_EXPORTER_OTLP_PROTOCOL` suportando tanto modos `grpc` diretos absolutos ou as API padrões HTTP web base nos pacotes via `http/protobuf` bem como puramente dados seriais dinâmicos via `http/json`. A biblioteca base na suíte `@opentelemetry/api` mora já hospedada em nossos painéis do servidor central com injeção automática e pronta - porém SDKs, instrumentadores puramente ativos remotos e adaptadores da exposição base (Exporter) transitam como PeerDependencies opcionais dinâmicas: apenas rode `$ npm install x` caso resolva enviar à nuvem nativamente os pacotes ou centralize no banco de traçados do Jaeger ou APM de preferência. Leia em suma todo o mapeamento variável puramente documentado das referências nos guias: [doc/observability.md](doc/observability.md) nativos no nosso Github central p/ rodar no painel local ativando-as puramente ativas em minutos local e remoto.

Como alternativa de rastreamento robusto unificado ao longo de toda cadeia Frontend e Sistema Server, embarcamos opcionalmente suítes Error-Tracking da plataforma Sentry pura sem aporrinhação integrando de nativo nativa. Forneça ativamente a env `SENTRY_DSN_FRONTEND` p/ mapear nos robôs visuais puramente o rastreador de interface Web e para intercepções robustas das lógicas backends atrelados adicione p/ backend na raiz host via variável livre `SENTRY_DSN_BACKEND` o DSN respectivo nativos em seu arquivo local ou instanciado no seu ambiente cloud da plataforma nativos puramente ativando. (Legacy support compatível retroativamente ativada: Apenas a raiz `SENTRY_DSN` espalha as rotas ativas do roteador paras nas 2 metades da pilha do app como fallback puro contínuo também). Nossa camada fixa do Node.js backend central da base da versão puramente estabilizada no núcleo gira interligada da estrutura pacote em `@sentry/node@10.71.0` – sendo transitório opcional nos modulos peer. Basta intalar ativamente os SDK puros opcionalmente caso resolva rastrear eventos e quebras falhos de erros de tela localmente ou remotos visuais ao invés das checagens locais em logs em massa. Modulares da renderização web giram unificados na mesma tag puramente versionadas amarradas na raiz via instanciamento puramente `@sentry/browser` nativo! Aprenda todas lógicas seguras base do painel Sentry na porta principal rastreamentos na navegação em guias puros de documentação do painel integrável base `doc/observação` em nosso painel seguro GitHub para rastreios locais via guia [doc/observability.md](doc/observability.md#sentry-error-monitoring) para referências variáveis, limitações na injeção da sua segurança p/ privacidade limitadora impeditiva contínua padronizada de informações vazadas via logs puros nativos e padrões base limitantes em captura na infra da versão ativas e remotos pra nuvem em rotas puramente configuradas base de painéis localmente na plataforma contínuo.

## Rastreamentos Base Produto Oficial Privado & Anonimizados (Sinais Telemtétricos Embutidos)

A Paperclip carrega em trânsito leve do sistema, coletas puros estatísticos totalmente seguros anonimizadas interligada sobre telemetria para ajudar nós da comunidade central a interpretar puros em bases gerais com métricas ativas comportamentais interativamente sem devassar suas bases privadas e compreender fluxos limpos puramente na base nativos orgânicos na rotina (Por exemplo como as lógicas de cliques fluem no portal de acesso e melhoria constante das UI da interface orgânica sem erros de pontas-soltas nativas) pra nutrir puramente as implementações da equipe. Dados pessoais sensoriais limpos, informações confidenciais do ticket atrelados e arquivos do Issue gerados internamente isolados privados em banco limpos do corpo dos pull-request, comandos de prompt injetados restritos em memórias, localizações base rotas raiz interligadas exclusivas ou segredos cofres integrados globais do Node puros armazenadas em arquivos remotos na cloud **JAMAIS** entram ou ativam coletas dos envios sob quaisquer circunstâncias - Nenhuma destas métricas chegam até a nuvem nossa!
Referenciamentos a diretórios privados nativos Git puros, em pacotes, puramente no sistema host no local na base passam através de Salt Hashing local exclusivo gerando encriptação purificada cega base em senhas randômicas instaladoras criadas especificamente antes da porta purificada ativa transmiti-las no pacotes criptográficos fechados p/ nuvem na forma mascarada limitadas.

Aqueles programadores base da organização e construtores orgânicos submetendo ativamente lógicas modificativas para pull nativos do Github no ecossistema de captura na versão atual alteradas na cadeia precisam obrigatoriamente alinhar bases de rotinas nativos sob a restritiva [Contrato Base dos Dados Fechados em Documentos Telemétricos Oficial do App Paperclip na Plataforma Local p/ Github](packages/shared/src/telemetry/README.md) nativos no painel. E sobre eventos adicionais das submissões de dados orgânicos (Exposições de 1st party analíticas de primeiro-passagens limpas em rotinas nativas operativas integrados dos desenvolvedores do sistema Paperclip da organização não-presentes e ainda em falta no escopo da API auto-gerador ativadora base), guiem-se sob o guia local mapeando padronizações puros de eventos [Guia do Fluxo Modificador do Core Telemétrico Nativos Contínuos e Analíticos Isolados do App](doc/TELEMETRY_WORKFLOW.md).

Eventos restritos puramente analíticos operam no App de forma livre puramente ativados em nativos **habilitadas por padrão sem configuração inicial nos ambientes da nuvem (enabled by default)** na nuvem em rotinas limpas no modo base instaladora nativas de ponta a ponta nas máquinas limpas mas podem purificadas e restritivos extintas facilmente usando as fáceis barreiras e interruptores base em documentações puros em fluxos desativos da rota em local nativo limpo:

| Formatos                 | Rota Explicativa                                        |
| -------------------- | ------------------------------------------------------- |
| Chaves de Variável Shell Ambientes base nativos p/ container bash local purificado| `PAPERCLIP_TELEMETRY_DISABLED=1` ative ou injete base purificada nos configs.                       |
| Através de Regras no SO | Defina a variável global no sistema `DO_NOT_TRACK=1` para desativar a telemetria na máquina inteira. |
| Pipelines (Ambientes CI) | O sistema identifica bots e ambientes CI automaticamente quando a variável `CI=true` está presente, bloqueando envios. |
| Arquivo de Configuração | Defina `telemetry.enabled: false` na configuração local do Paperclip (.json/.yml). |

## Contribuindo

Nós adoramos contribuições! Consulte nossa página [Guia de Contribuição](CONTRIBUTING.md) para ver as diretrizes e regras do repositório.

<br/>

## Comunidade

- [Discord](https://discord.gg/m4HZY7xNG3) — Junte-se à nossa comunidade no Discord e interaja com os construtores.
- [Twitter / X](https://x.com/papercliping) — Acompanhe de perto as novidades e últimos anúncios.
- [GitHub Issues](https://github.com/paperclipai/paperclip/issues) — Para reportar bugs e requisitar novas funcionalidades.
- [GitHub Discussions](https://github.com/paperclipai/paperclip/discussions) — Interaja e discuta novas ideias (RFCs) com a equipe e dev-community!

<br/>

## Licença

MIT &copy; 2026 [Paperclip Labs, Inc](https://paperclip.ing)

## Evolução de GitHub Stars

<a href="https://www.star-history.com/?repos=paperclipai%2Fpaperclip&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=paperclipai/paperclip&type=date&theme=dark&legend=top-left&sealed_token=hFjuwFq41bQD5cevvXVv5cTru2swWRZujwJYKlHhtBh6n0H5-VvJZW2SAlcQKB8u4KxhyEB9JqFg1yccJ8WLv9wPBcoWpWcak4gx0MYTWu_pOs2jKOaDluH7KsLeTKt6DHGkHiN3LsqV9s--MTDQcC6Xl7zV51W0-YezQXo-pVPgoFDFAGf2CY5fiP5Q" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=paperclipai/paperclip&type=date&legend=top-left&sealed_token=hFjuwFq41bQD5cevvXVv5cTru2swWRZujwJYKlHhtBh6n0H5-VvJZW2SAlcQKB8u4KxhyEB9JqFg1yccJ8WLv9wPBcoWpWcak4gx0MYTWu_pOs2jKOaDluH7KsLeTKt6DHGkHiN3LsqV9s--MTDQcC6Xl7zV51W0-YezQXo-pVPgoFDFAGf2CY5fiP5Q" />
    <img src="https://api.star-history.com/chart?repos=paperclipai/paperclip&type=date&legend=top-left&sealed_token=hFjuwFq41bQD5cevvXVv5cTru2swWRZujwJYKlHhtBh6n0H5-VvJZW2SAlcQKB8u4KxhyEB9JqFg1yccJ8WLv9wPBcoWpWcak4gx0MYTWu_pOs2jKOaDluH7KsLeTKt6DHGkHiN3LsqV9s--MTDQcC6Xl7zV51W0-YezQXo-pVPgoFDFAGf2CY5fiP5Q" alt="Gráfico de Evolução Estelar" />
  </picture>
</a>

<br/>

---

<p align="center">
  <sub>Software de código-aberto sob Licença MIT. Construído para pessoas que querem focar no trabalho final e não em administrar Agentes como babás.</sub>
</p>
