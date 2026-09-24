#!/bin/sh
set -e

# Capture runtime UID/GID from environment variables, defaulting to 1000
PUID=${USER_UID:-1000}
PGID=${USER_GID:-1000}

# Without root we can neither remap the node user (usermod/groupmod/chown)
# nor switch users (gosu needs CAP_SETUID/CAP_SETGID), so exec directly.
# This covers Kubernetes restricted PodSecurity (runAsNonRoot + runAsUser)
# as well as platforms that assign arbitrary UIDs (e.g. OpenShift); for the
# latter a UID/GID mismatch is unfixable here, so warn instead of letting
# usermod fail cryptically and keep volume-permission issues diagnosable.
if [ "$(id -u)" -ne 0 ]; then
    if [ "$(id -u)" -ne "$PUID" ] || [ "$(id -g)" -ne "$PGID" ]; then
        echo "docker-entrypoint.sh: running unprivileged as $(id -u):$(id -g); cannot remap to requested ${PUID}:${PGID}" >&2
    fi
    exec "$@"
fi

# Adjust the node user's UID/GID if they differ from the runtime request
if [ "$(id -u node)" -ne "$PUID" ]; then
    echo "Updating node UID to $PUID"
    usermod -o -u "$PUID" node
fi

if [ "$(id -g node)" -ne "$PGID" ]; then
    echo "Updating node GID to $PGID"
    groupmod -o -g "$PGID" node
    usermod -g "$PGID" node
fi

# Ensure the app home is owned by the runtime user BEFORE dropping
# privileges -- not only after a UID/GID remap. A freshly mounted volume
# (Docker named volume, Railway volume, Kubernetes PV) arrives root-owned
# and shadows the image's build-time chown, so with the default UID the old
# remap-only condition dropped privileges onto an unwritable home and the
# server crashed on its first mkdir. The probe is a first-mismatch find
# over the WHOLE tree (uid and gid): a root-owned mount or descendant
# (init containers, backup restores, files written before a remap) is
# found immediately and repaired recursively, a GID-only remap is caught,
# and a fully-correct tree costs one metadata-only walk with no chown.
home_dir="${PAPERCLIP_HOME:-/paperclip}"
if [ -d "$home_dir" ] && [ -n "$(find "$home_dir" \( ! -user node -o ! -group node \) -print -quit 2>/dev/null)" ]; then
    chown -R node:node "$home_dir"
fi

# Ensure default instance directory and config exist for non-interactive / container deployments
instance_dir="${home_dir}/instances/${PAPERCLIP_INSTANCE_ID:-default}"
config_file="${instance_dir}/config.json"
if [ ! -f "$config_file" ]; then
    mkdir -p "$instance_dir"
    cat << 'EOF' > "$config_file"
{
  "$meta": {
    "version": 1,
    "updatedAt": "2026-09-24T00:00:00.000Z",
    "source": "configure"
  },
  "database": {
    "mode": "postgres"
  },
  "logging": {
    "mode": "file",
    "logDir": "/paperclip/instances/default/logs"
  },
  "server": {
    "deploymentMode": "authenticated",
    "exposure": "private",
    "bind": "lan",
    "host": "0.0.0.0",
    "port": 3100,
    "allowedHostnames": [],
    "serveUi": true
  },
  "auth": {
    "baseUrlMode": "auto",
    "disableSignUp": false
  },
  "telemetry": {
    "enabled": true
  },
  "storage": {
    "provider": "local_disk",
    "localDisk": {
      "baseDir": "/paperclip/instances/default/data/storage"
    }
  },
  "secrets": {
    "provider": "local_encrypted",
    "strictMode": false,
    "localEncrypted": {
      "keyFilePath": "/paperclip/instances/default/secrets/master.key"
    }
  }
}
EOF
    chown -R node:node "$instance_dir"
fi

# Patch compiled routes to respect OPENAI_BASE_URL and ANTHROPIC_BASE_URL if set
node -e '
const fs = require("fs");
for (const file of ["/app/server/dist/routes/ai-connections.js", "/app/server/dist/adapters/codex-models.js"]) {
  if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, "utf8");
    let changed = false;
    if (c.includes("https://api.openai.com/v1/models")) {
      c = c.replace(/["\x27]https:\/\/api\.openai\.com\/v1\/models["\x27]/g, "(process.env.OPENAI_BASE_URL ? process.env.OPENAI_BASE_URL.replace(/\\/+$/, \"\") + \"/models\" : \"https://api.openai.com/v1/models\")");
      changed = true;
    }
    if (c.includes("https://api.anthropic.com/v1/models?limit=1")) {
      c = c.replace(/["\x27]https:\/\/api\.anthropic\.com\/v1\/models\?limit=1["\x27]/g, "(process.env.ANTHROPIC_BASE_URL ? process.env.ANTHROPIC_BASE_URL.replace(/\\/+$/, \"\") + \"/models?limit=1\" : \"https://api.anthropic.com/v1/models?limit=1\")");
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(file, c);
      console.log("[docker-entrypoint] Patched " + file + " to respect custom BASE_URL");
    }
  }
}
' 2>/dev/null || true

exec gosu node "$@"
