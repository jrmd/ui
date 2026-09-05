# Jez UI verification

Verified locally on 5 September 2026. No public deployment was performed.

## Current collection

- 91 components, 67 blocks, eight standalone templates.
- 158 generated registry entries plus the shared theme.
- 48 template routes and 386 generated catalogue pages.
- 158 refreshed component/block thumbnails and eight template thumbnails.

The quality rebuild covers control sizing and focus styles; animated sheets and collapsibles; combobox and command keyboard interaction; file upload and password/search controls; selectable tables with column visibility; keyboard file trees; narrow resize dividers; controllable progress; and stable scramble geometry. Workspace forms, navigation, tasks, activity, analytics, onboarding, settings, and chat were reworked. Existing heroes were retained. Mega navigation, workspace navigation, floating navigation, and a terrain hero were added.

## Automated checks

- TypeScript, ESLint, registry schema, exact inventory, dependency closures, source parity, and local assets pass.
- Production Next.js catalogue build passes.
- 100 Chromium browser tests pass against the production server. These cover every preview and template route at desktop and mobile widths, runtime errors and overflow, eight representative axe scans, core product journeys, and WebGL rendering/fallback behavior.
- New regressions cover sheet entrance animation, scramble geometry, input font sizing, switch alignment, command keyboard selection/focus restoration, desktop/mobile date containment, Kanban dragging and persistence, wizard back navigation, progress pause/reset, table selection/column visibility, combobox keyboard selection, and desktop/mobile mega navigation.
- All eight downloaded template archives install and build outside the workspace. The verifier cleans temporary builds after each archive. See `template-build-results.json`.
- The real shadcn CLI installs all 158 items into both Vite and Next.js fixtures. Each consumer compiles the complete documentation usage examples and production-builds independently.

The catalogue sidebar now preserves its scroll position on item navigation, browser history, and reload. The default palette uses olive charcoal and sage, with verified light/dark button contrast.

## Visual review

The current pass included live desktop/mobile inspection of controls, workspace layouts, Kanban, onboarding, terrain, table interactions, and the template identities. Editorial covers were replaced with purpose-made illustrations and relevant product imagery; charts wait for rendering before thumbnail capture. Current catalogue thumbnails are under `apps/catalogue/public/thumbnails`.

The current regression run used Chromium. Previous Firefox/WebKit results are historical and are not evidence for this revision. The accessibility scans are representative, and GPU checks use the local browser environment rather than physical mobile hardware.

## Integration boundaries

Forms expose submit adapters. Chat responses and business data are illustrative; local demo state is not an authentication or backend service. Authentication, billing, AI providers, and order processing still require application integration. Source distribution terms and public hosting are unchanged.

## Hero and workspace expansion

The current catalogue contains 20 heroes, ten with WebGL artwork. Sixteen new compositions cover media, editorial, geometric, typographic, and interactive treatments. Four new GPU scenes provide silk, eclipse, tunnel, and constellation effects, with pause controls, offscreen suspension, reduced-motion posters, and context-loss fallbacks.

Three additional navigations, three sidebar layouts, account and organisation switchers, and three login blocks join the existing collection. Login blocks expose asynchronous credential and Google/GitHub/SAML adapters; the unconnected demos explicitly report that no authentication occurs. Carousel slides now transition with reduced-motion support, touch gestures, direct pagination, and arrow controls. Icon alignment and mega-menu width have explicit geometry regressions.

Media artwork is bundled as textual SVG registry files, including a self-contained JPEG-backed product image, so shadcn installs copy each block's artwork into public/assets alongside its source.

## Organisation and customisation

The catalogue sidebar and filters share eight block collections: heroes, navigation, sidebars, authentication, forms, commerce, content, and workspace. Links within sidebar collections are alphabetised; existing sidebar scroll restoration is retained.

The sixteen new heroes and three new login blocks expose presentation props and a live catalogue customiser with matching copyable JSX. Hero content, action labels, media, and artwork settings are available where the composition supports them. The sidebar variants accept organisations, accounts, and integration handlers. Defaults preserve the original designs.


## Component composition audit

All 91 component APIs were reviewed for styled defaults, content composition, native integration, and overrides. [The audit](COMPONENT_API_AUDIT.md) records each decision. Card, overlays, menus, fields, tabs, accordions, select, table, stepper, pagination and sidebars now expose named parts. Existing data/trigger shortcuts remain supported.

The 100-test Chromium run used an isolated production build (`JEZ_BUILD_DIR=.next-composition`, port 3101) to avoid another task rebuilding the main catalogue. It includes all twenty hero text slots, editable distortion text in static/live modes, empty copy/reset, desktop/mobile sidebar nesting and focus restoration, zero-utility Card layout, composed tabs/select/dialog/menu interactions, and independent keyboard resizing of three panels. Card and Sidebar were visually reviewed at desktop and mobile widths, and the composed Dialog was checked in the browser.

All 158 registry entries were freshly installed using the real shadcn CLI and compiled in both Vite and Next.js, including generated compound-part imports and usage examples. No public deployment was performed for this audit.
