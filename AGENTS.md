# Base44 Dev Environment

## What this repo is

This is the **Expo CLI monorepo** (`expo/expo-cli`) — a collection of dev tooling packages published to npm. It is **not** a standalone web application. The only web-facing component is `packages/dev-tools` (`@expo/dev-tools`), a Next.js 9 + Express app that serves as a browser-based project manager for Expo projects.

## How it runs

`docker compose -f docker-compose.base44.yml up -d` starts a single `dev-tools` service:

1. **Install**: `yarn install --ignore-scripts` (skips lifecycle scripts including the root `postinstall` that runs `expo-yarn-workspaces check-workspace-dependencies`).
2. **Build**: `lerna run prepare --scope xdl --include-filtered-dependencies` — builds `xdl` and all its workspace dependencies (TypeScript + Babel). Only runs if `packages/xdl/build/index.js` doesn't exist.
3. **Dummy project**: creates a minimal `app.json` at `/tmp/dummy-project` so the dev server has a `projectRoot` argument.
4. **Start**: `yarn dev /tmp/dummy-project` — runs `ts-node ./server/dev-server` which starts Next.js dev mode + Express + GraphQL WebSocket server on port 3000.

## Key modifications for the preview

- `packages/dev-tools/server/dev-server.ts`: port changed to 3000 (env `PORT`), binds `0.0.0.0`, `Project.startAsync` wrapped in try/catch (Metro bundler can't fully run in this environment), `openBrowserAsync` removed.
- `packages/dev-tools/server/DevToolsServer.ts`: `createAuthenticationContextAsync` now checks `BASE44_PUBLIC_HOST_SUFFIX` — if set, uses `wss://` and the public HTTPS origin for the GraphQL WebSocket URL and origin check, so the browser can connect through the preview proxy.

## Requirements

- **Node 16** (volta-pinned in root `package.json`). Uses `node:16-bullseye` Docker image.
- **No external secrets** — this is a dev tool with no third-party API dependencies.
- First startup is slow (~10 min): yarn install + lerna build. Subsequent starts skip the build if artifacts exist.

## Verifying it works

```sh
docker compose -f docker-compose.base44.yml ps          # should show "healthy"
curl -s http://localhost:3000/ | head -20               # should return HTML
docker compose -f docker-compose.base44.yml logs dev-tools # check for errors
```

The page loads the Expo dev-tools UI. GraphQL queries return empty data since no real Expo project is running — this is expected.
