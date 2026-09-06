# Jez UI

91 editable React components, 92 composed blocks, and nine standalone Next.js templates. React 19, TypeScript, Tailwind 4. Original source is private and all rights reserved.

## Run

Use Node 22.12+ and pnpm 11.

```sh
pnpm install
pnpm generate
pnpm dev
```

Open http://localhost:3000. `pnpm build` builds the production catalogue; `pnpm --filter @jez-ui/catalogue start` serves it.

## Source of truth

- `registry/ui` and `registry/blocks`: canonical, editable component source.
- `packages/catalogue/items.json`: fixed catalogue manifest and examples, generated initially by `scripts/author-previews.mjs` from `scripts/catalogue-data.mjs`.
- `templates/*/app/view.tsx`: the eight independent template identities and frontend journeys.
- `scripts/build-registry.mjs`: resolves local dependency closures, emits shadcn registry JSON, documentation metadata, template source copies, and archives. It does not invent component implementations.
- `assets`: original geometric artwork and generated fictional product imagery. Font packages are bundled locally by the builds.

When changing a component, edit canonical source and run `pnpm generate`. Do not edit the copies in templates or consumer fixtures. Update examples in `scripts/author-previews.mjs` and run it when the public interface changes. Each preview imports the canonical source used in its registry entry.

## Verification

```sh
pnpm verify
pnpm build
# With the production catalogue running on port 3000:
pnpm fixtures:verify
pnpm templates:build
pnpm exec playwright install chromium firefox webkit
pnpm test
```

The browser suite covers all 126 demos and all 40 template routes at desktop/mobile sizes, targeted accessibility scans, and critical journeys across Chromium, Firefox, and WebKit. Playwright requires its documented native libraries; `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select an existing Chromium binary on a development machine.

`pnpm fixtures:verify` uses the actual shadcn CLI to install every component and block into Vite and Next.js fixtures, then compiles/builds them. `pnpm templates:build` extracts the eight public archives outside the workspace, installs dependencies, and builds each independently. See `docs/VERIFICATION.md` for recorded results and limitations, and `docs/release-artifacts.json` for archive checksums.

## Preview images

With the catalogue running, `node scripts/capture-catalogue.mjs` captures the real demos and templates into `apps/catalogue/public/thumbnails`. These are local gallery images, not substitute implementations. Rebuild the catalogue after updating them.

## Release artifacts

`pnpm generate` writes registry entries to `apps/catalogue/public/r`, archives to `apps/catalogue/public/downloads`, and catalogue/search metadata. Set `JEZ_PUBLIC_URL` to the final origin before a public build so registry dependencies and sitemap URLs resolve correctly. No deployment has been configured or performed. Public release also requires a distribution licence decision.

Templates are frontend demos. They intentionally do not include real authentication, AI providers, payment processing, orders, or customer entitlements. Each template README identifies its integration points. Demo local storage contains illustrative data only.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for dependency and asset provenance.
