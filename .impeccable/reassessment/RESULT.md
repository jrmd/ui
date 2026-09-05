# Example reassessment — 2026-09-05

Scope: read-only reassessment following rejection of the component demos and most WebGL demos. The home page is out of scope and is not a candidate for change.

## Evidence

- Captured 24 direct preview renders at `1280x800` and `390x844`: Button, Card, Input, Tilt Card, Shared Layout Transition, Area Chart, and all six WebGL components.
- Captured four full catalogue detail pages (Button and WebGL Ribbon Field, desktop and mobile) to check the preview in its actual product context.
- `manifest.json` records the route list, dimensions, local URL, and browser.
- Contact sheets: `core-desktop-contact.png`, `core-mobile-contact.png`, `webgl-desktop-contact.png`, `webgl-mobile-contact.png`, and `detail-contact.png`.

The direct routes were captured from `http://localhost:3000` with the repository's pinned Chromium headless shell. Captures were inspected visually.

## What is working

- The catalogue identity holds on the detail pages: warm paper, dense type, quiet toolbars, and the mobile document flow are clear and usable.
- The preview frame correctly exposes desktop/tablet/mobile, theme, restart, and an open route. Do not replace this shell to solve demo composition.
- WebGL has its required fallback and containment; the critique is about the scene art direction and exhibit context, not the existence of the WebGL implementation.

## Material failures

### P0 — the preview composition is generic by construction

Every direct preview is placed in a fixed, vertically centred `330px` demo root. A Button, Card, and Input therefore occupy a negligible fraction of a wide preview while the rest reads as blank canvas. On mobile the same fixed field makes a single control look stranded rather than intentional.

The authoring generator has one hand-written example map, then mounts every missing item bare (`<Component/>`) or wraps visual effects around the same `A little atmosphere.` heading. The audit finds that all 10 chart examples, 14 of 15 effects, 18 of 18 marketing blocks, and 17 of 18 workspace blocks use this fallback path. This is the primary cause, more than individual component styling.

Repair direction: make the demo authoring contract describe an interaction scene, density, and a device-aware layout for each family. A primitive needs a compact realistic cluster of adjacent controls and states; a block needs a full task or marketing section; a motion component needs a before/after or pointer/scroll affordance; a chart needs the decision context it supports. Keep the preview shell and let each scene choose its useful height rather than centring every scene in 330px.

### P0 — WebGL scenes have one visual voice and no reason to exist

The six canvases all arrive in the same dark, rounded `h-80` stage with the same acid-lime default. Particle Field is too sparse at desktop scale; Orb, Liquid, and Terrain are near-identical green procedural forms; Ribbons is the only scene with a recognisable silhouette; Image Distortion provides the only authored subject but is still just a floating, warped rectangle.

The shared stage branches on geometry while retaining one lighting/camera/material grammar. The result is a component inventory of demo-scene tropes rather than six visual tools a builder would choose between.

Repair direction: keep the shared lifecycle/fallback API, but make each scene earn a distinct semantic role and art direction: particles as data/depth, ribbons as kinetic editorial mark, liquid as reflective material, orb as a tactile identity object, terrain as an information landscape, and distortion as an image interaction with an input/cursor comparison. Give each an authored surrounding composition, scale, palette, camera, and controls appropriate to that role. Avoid making every replacement another neon object on a black rectangle.

### P1 — motion demos show a component, not the promised behaviour

Tilt Card is a bordered text panel; Shared Layout Transition is two generic stacked buttons. Both have working mechanics, but a first screenshot cannot tell why the effect matters, what the initial and resulting layouts are, or how to engage it.

Repair direction: stage motion inside a meaningful composition with an explicit interaction cue. Use content whose rearrangement changes comprehension, and make the resting frame visually complete before motion begins. Do not rely on generic motivational copy as the demonstration material.

### P1 — charts have no product context or visual hierarchy

Area Chart uses generic weekday data, the label `Area chart`, a small disclosure, and otherwise full-width plotting. It is functional and accessible, but reads as a library default rather than a decision surface. The remaining chart entries are bare mounts too.

Repair direction: give each chart a concise dashboard card or report slice with a named metric, current value, comparison, time horizon, and only the legend/filter controls the chart needs. Different chart types should demonstrate different analytical questions rather than the same synthetic week rendered ten ways.

### P2 — density and sizing do not adapt to component category

The outer preview stage has a 340px minimum and the iframe clamps every example to at least 330px. That is acceptable for a canvas scene but wrong for a simple input, action, tag, or navigation unit. The detail pages consequently reserve most of their first interactive panel for emptiness.

Repair direction: introduce a small set of preview scene sizes (for example: compact control, form/workflow, data, immersive) and have the demo metadata declare one. Preserve a minimum only for scenes that need it; compact examples should demonstrate variants, focus/error/loading, or contextual neighbours instead of dead space.

## Recommended build order

1. Replace the generated fallback demonstration contract and compose the six high-traffic categories first: foundations, form controls, motion, charts, effects, and blocks.
2. Land the independently rebuilt WebGL scenes against a six-scene art-direction matrix, then compose each inside an exhibit rather than a bare canvas.
3. Make preview height/category metadata drive the iframe stage; test the same representative set at 1280px and 390px.
4. Re-capture the 12 routes in this folder and judge the new work against the current contact sheets. Retain the home page and the catalogue framing unless a concrete regression appears.

## Source evidence

- `scripts/author-previews.mjs:88-97` selects a bare component or the repeated atmosphere wrapper when no explicit example exists.
- `apps/catalogue/app/globals.css:539-546` centres every direct preview in a 330px minimum-height canvas.
- `apps/catalogue/components/detail.tsx:58-68` and `apps/catalogue/app/globals.css:472-487` enforce the catalogue preview's corresponding height floor.
- `registry/ui/webgl-stage.tsx:102-146` implements all scene branches under a common lighting/material grammar; `:151-222` applies the common lime default and dark 320px stage.
- `registry/ui/chart-frame.tsx:31-56` provides functional chart framing but no decision context beyond a label and data-table disclosure.
