# Jez UI verification

Verified locally on 5 September 2026. No public deployment was performed.

## Current collection

- 90 components, 40 blocks, eight standalone templates.
- 130 generated registry entries plus the shared theme.
- 46 template routes and 327 generated catalogue pages.
- 130 refreshed component/block thumbnails and eight template thumbnails.

The quality rebuild covers control sizing and focus styles; animated sheets and collapsibles; combobox and command keyboard interaction; file upload and password/search controls; selectable tables with column visibility; keyboard file trees; narrow resize dividers; controllable progress; and stable scramble geometry. Workspace forms, navigation, tasks, activity, analytics, onboarding, settings, and chat were reworked. Existing heroes were retained. Mega navigation, workspace navigation, floating navigation, and a terrain hero were added.

## Automated checks

- TypeScript, ESLint, registry schema, exact inventory, dependency closures, source parity, and local assets pass.
- Production Next.js catalogue build passes.
- 69 Chromium browser tests pass against the production server. These cover every preview and template route at desktop and mobile widths, runtime errors and overflow, eight representative axe scans, core product journeys, and WebGL rendering/fallback behavior.
- New regressions cover sheet entrance animation, scramble geometry, input font sizing, switch alignment, command keyboard selection/focus restoration, desktop/mobile date containment, Kanban dragging and persistence, wizard back navigation, progress pause/reset, table selection/column visibility, combobox keyboard selection, and desktop/mobile mega navigation.
- All eight downloaded template archives install and build outside the workspace. The verifier cleans temporary builds after each archive. See `template-build-results.json`.
- The real shadcn CLI installs all 130 items into both Vite and Next.js fixtures. Each consumer compiles the complete documentation usage examples and production-builds independently.

The catalogue sidebar now preserves its scroll position on item navigation, browser history, and reload. The default palette uses olive charcoal and sage, with verified light/dark button contrast.

## Visual review

The current pass included live desktop/mobile inspection of controls, workspace layouts, Kanban, onboarding, terrain, table interactions, and the template identities. Editorial covers were replaced with purpose-made illustrations and relevant product imagery; charts wait for rendering before thumbnail capture. Current catalogue thumbnails are under `apps/catalogue/public/thumbnails`.

The current regression run used Chromium. Previous Firefox/WebKit results are historical and are not evidence for this revision. The accessibility scans are representative, and GPU checks use the local browser environment rather than physical mobile hardware.

## Integration boundaries

Forms expose submit adapters. Chat responses and business data are illustrative; local demo state is not an authentication or backend service. Authentication, billing, AI providers, and order processing still require application integration. Source distribution terms and public hosting are unchanged.
