---
title: Coolify Deployment
summary: Self-hosting Paperclip on Coolify with Docker Compose, PostgreSQL 17, and automatic SSL
---

# Self-Hosting Paperclip on Coolify

This guide covers deploying Paperclip in production using [Coolify](https://coolify.io), an open-source, self-hosted PaaS.

Paperclip on Coolify runs as a production multi-container Docker Compose stack featuring:
- **Paperclip Server + Web UI** (`ghcr.io/paperclipai/paperclip:latest` or built from your Git fork)
- **PostgreSQL 17** dedicated database service with healthchecks
- **Persistent storage** for agent workspaces, database records, and secrets
- **All agent CLI runtimes** pre-installed (Claude Code, Codex, OpenCode, Gemini CLI, Kimi Code)
- **Automatic SSL & Reverse Proxy** handled seamlessly by Coolify (Traefik/Caddy)

---

## Prerequisites

- A running Coolify instance (v4.x)
- A domain or subdomain pointed to your Coolify server (e.g. `paperclip.yourdomain.com`)
- At least one LLM provider API key (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`)
- VPS with at least 2 vCPUs and 4 GB RAM (recommended for concurrent agent tasks)

---

## Deployment Options

Choose the method that fits your workflow:

### Option 1: One-Click / Docker Compose Empty (Recommended)

This is the fastest method. It uses the official pre-built image and Coolify's magic environment variables for automated password and secret generation.

1. In your Coolify dashboard, select your **Project** and **Environment**.
2. Click **+ New** > **Service** (or **Docker Compose Empty**).
3. In the Docker Compose field, paste the contents of `templates/coolify/paperclip.yaml`:

```yaml
# documentation: https://github.com/paperclipai/paperclip
# slogan: Open-source control plane for AI-agent companies
# category: ai
# tags: ai, agents, orchestration, claude, codex, cursor, llm, control-plane
# logo: svgs/paperclip.svg
# port: 3100

services:
  postgres:
    image: postgres:17-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${SERVICE_USER_POSTGRES}
      POSTGRES_PASSWORD: ${SERVICE_PASSWORD_POSTGRES}
      POSTGRES_DB: ${POSTGRES_DB:-paperclip}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${SERVICE_USER_POSTGRES} -d ${POSTGRES_DB:-paperclip}"]
      interval: 5s
      timeout: 5s
      retries: 10
    networks:
      - paperclip-network

  paperclip:
    image: ghcr.io/paperclipai/paperclip:latest
    restart: unless-stopped
    pids_limit: 2048
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 3100
      SERVE_UI: "true"
      PAPERCLIP_HOME: /paperclip
      PAPERCLIP_DEPLOYMENT_MODE: ${PAPERCLIP_DEPLOYMENT_MODE:-authenticated}
      PAPERCLIP_DEPLOYMENT_EXPOSURE: ${PAPERCLIP_DEPLOYMENT_EXPOSURE:-public}
      PAPERCLIP_PUBLIC_URL: ${SERVICE_URL_PAPERCLIP}
      PAPERCLIP_ALLOWED_HOSTNAMES: ${PAPERCLIP_ALLOWED_HOSTNAMES:-}
      BETTER_AUTH_SECRET: ${SERVICE_HEX_64_PAPERCLIP}
      DATABASE_URL: postgres://${SERVICE_USER_POSTGRES}:${SERVICE_PASSWORD_POSTGRES}@postgres:5432/${POSTGRES_DB:-paperclip}

      # LLM Provider Keys
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY:-}
      OPENAI_API_KEY: ${OPENAI_API_KEY:-}
      GEMINI_API_KEY: ${GEMINI_API_KEY:-}
      MOONSHOT_API_KEY: ${MOONSHOT_API_KEY:-}
      XAI_API_KEY: ${XAI_API_KEY:-}
      CURSOR_API_KEY: ${CURSOR_API_KEY:-}
      GITHUB_TOKEN: ${GITHUB_TOKEN:-}
      OPENCODE_ALLOW_ALL_MODELS: ${OPENCODE_ALLOW_ALL_MODELS:-true}
      GEMINI_SANDBOX: ${GEMINI_SANDBOX:-false}
    volumes:
      - paperclip-data:/paperclip
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:3100/api/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    networks:
      - paperclip-network

volumes:
  pgdata:
  paperclip-data:

networks:
  paperclip-network:
    driver: bridge
```

4. Set your domain in Coolify (e.g., `https://paperclip.yourdomain.com`). Coolify automatically routes port 3100 to HTTPS.
5. In **Environment Variables**, provide your LLM API keys (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.).
6. Click **Deploy**.

---

### Option 2: Deploy from Git Repository (Custom Fork)

Deploying from your own Git fork allows you to patch Paperclip, add custom agent adapters under `packages/adapters/`, and control your release lifecycle.

1. Fork the repository to your GitHub account (e.g. `https://github.com/matheusgcdj/paperclip-coolify`).
2. In Coolify, click **+ New** > **Application** > **Public/Private Repository**.
3. Enter your repository URL: `https://github.com/matheusgcdj/paperclip-coolify`.
4. Under **Build Pack**, select **Docker Compose**.
   - Base Directory: `/`
   - Docker Compose Location: `/docker-compose.yml`
5. Under **Domains**, set your public domain (e.g., `https://paperclip.yourdomain.com`).
6. Configure your environment variables (refer to `.env.coolify.example`).
7. Click **Deploy**. Coolify will build the container from source and start the stack.

---

## Environment Variables Reference

| Variable | Description | Coolify Behavior |
|----------|-------------|------------------|
| `PAPERCLIP_PUBLIC_URL` | Public-facing base URL (e.g., `https://paperclip.example.com`) | In templates, bound to `${SERVICE_URL_PAPERCLIP}`. Must match your Coolify domain. |
| `BETTER_AUTH_SECRET` | 64-character secret for signing auth cookies and JWTs | Generated automatically via `${SERVICE_HEX_64_PAPERCLIP}`. |
| `DATABASE_URL` | PostgreSQL connection URL | Auto-assembled using `postgres` service and generated credentials. |
| `PAPERCLIP_DEPLOYMENT_MODE` | `authenticated` (recommended) or `local_trusted` | Defaults to `authenticated`. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | `public` (for domain + TLS) or `private` (internal LAN/Tailscale) | Defaults to `public`. |
| `ANTHROPIC_API_KEY` | API Key for Claude Code adapter (`claude_local`) | Required if using Claude models. |
| `OPENAI_API_KEY` | API Key for OpenAI Codex adapter (`codex_local`) | Required if using OpenAI models. |
| `GEMINI_API_KEY` | API Key for Gemini adapter (`gemini_local`) | Must be scoped to Gemini API. |
| `OPENCODE_ALLOW_ALL_MODELS` | Enables all models in OpenCode CLI | Set to `true` by default. |
| `GEMINI_SANDBOX` | Disables nested Docker-in-Docker in Gemini CLI | Set to `false` by default. |

See `.env.coolify.example` for the full list of options.

---

## Data Persistence & Backups

Two Docker volumes persist your data:

- `pgdata`: Stores the PostgreSQL database (companies, tasks, issues, audit logs, user roles).
- `paperclip-data`: Mounted at `/paperclip` inside the container. Stores:
  - Agent workspace files, task artifacts, and git worktrees
  - Instance configuration (`/paperclip/instances/default/config.json`)
  - Local secrets master key (`/paperclip/instances/default/secrets/master.key`)
  - File uploads and attachments

### Volume Backups

Under Coolify **Configuration > Persistent Storage**, ensure both `pgdata` and `paperclip-data` are listed.
To back up the database:
```sh
# On the host or via Coolify Terminal:
docker exec -t $(docker ps -q -f name=postgres) pg_dump -U paperclip paperclip > backup_$(date +%Y%m%d).sql
```

---

## Pre-Installed Agent Adapters

The container image includes the runtime tools for local adapters:
- `claude_local` (Anthropic Claude Code CLI)
- `codex_local` (OpenAI Codex CLI)
- `opencode_local` (OpenCode Multi-Provider CLI)
- `gemini_local` (Google Gemini CLI)
- `kimi_local` (Moonshot Kimi CLI)
- `hermes_local` / `hermes_gateway` (Nous Hermes)

Each adapter automatically picks up its corresponding API key from the environment.

---

## Troubleshooting

### 1. Startup Error: "authenticated public deployments require DATABASE_URL"
- Paperclip enforces that public internet-facing instances must use an external PostgreSQL database rather than embedded PGlite.
- Ensure the `postgres` service is healthy and `DATABASE_URL` is properly set.

### 2. Port Conflict on Host Port 5432
- The Coolify compose configuration does **not** map port 5432 to the host. PostgreSQL runs exclusively inside the private Docker bridge network (`paperclip-network`). Only port 3100 is proxied.

### 3. "Invalid Redirect URI" or Authentication Issues
- Ensure `PAPERCLIP_PUBLIC_URL` exactly matches the domain accessed in the browser (including `https://` and no trailing slash).
- If accessing from additional domains or Tailscale, add them to `PAPERCLIP_ALLOWED_HOSTNAMES`.
