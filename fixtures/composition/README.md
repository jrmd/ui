# Composition consumer

This Vite app consumes the canonical registry source as an independent caller. It covers every registered block and representative component/state integrations.

Run `pnpm test:composition` from the repository root. The test config starts the fixture server automatically. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` to use system Chromium when Playwright's bundled browser is unavailable.

For manual inspection, run `pnpm exec vite fixtures/composition --config fixtures/composition/vite.config.ts` and open port 4175. The main page exercises real caller data and rearranged parts; `?mode=blocks` verifies every block's attributes, refs and content. `?mode=native` exercises native event composition and `?mode=onboarding` exercises the completion callback.

When adding a block, add a statically typed consumer in `src/blocks.tsx`. The browser test compares it against the registry inventory, so missing coverage fails. Tailwind explicitly scans the registry source, as an external consumer must do for source-owned components.
