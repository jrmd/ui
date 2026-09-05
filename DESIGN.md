---
name: Jez UI
description: Expressive React foundations with a calm, ink-on-warm-white catalogue.
colors:
  background: "#f8f7f3"
  foreground: "#171817"
  muted: "#eeede7"
  muted-foreground: "#64665d"
  border: "#d6d7ce"
  primary: "#36483e"
  primary-foreground: "#ffffff"
  accent: "#d9e3cd"
  danger: "#b32335"
  danger-foreground: "#ffffff"
  dark-background: "#191b19"
  dark-foreground: "#f4f4ec"
  dark-muted: "#282b27"
  dark-muted-foreground: "#b5baae"
  dark-border: "#464b42"
  dark-primary: "#bdcfb8"
  dark-primary-foreground: "#17241b"
  dark-danger: "#ff9ba7"
  dark-danger-foreground: "#3a101b"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(56px, 5.6vw, 80px)"
    fontWeight: 500
    lineHeight: 1.01
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "15px"
    lineHeight: 1.75
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "12px"
rounded:
  base: "12px"
  control: "8px"
  compact: "6px"
  exhibit: "14px"
  dialog: "16px"
  pill: "9999px"
spacing:
  unit: "4px"
  compact: "8px"
  control-x: "16px"
  card: "24px"
  page-x: "44px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.base}"
    padding: "10px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
    padding: "10px 16px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
    height: "44px"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.base}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: Jez UI

## Collection quality

The user's references are [React Bits](https://reactbits.dev), [Kibo UI](https://www.kibo-ui.com), [Kokonut UI Pro](https://kokonutui.pro), [Intent UI](https://intentui.com), and Tailwind Plus. These set the expected level of motion, composition, interaction depth, and reusable source. The catalogue identity below remains the frame around the work.

Additional references: [Solace UI](https://www.solaceui.com/), [Tailark](https://tailark.com/), [Shadcn Studio](https://shadcnstudio.com/), [Shadcncraft](https://shadcncraft.com/), [Shadcn Space](https://shadcnspace.com/), [Shadcn UI Kit](https://shadcnuikit.com/), and [Tailwind Plus Catalyst](https://tailwindcss.com/plus/ui-kit). Use these to assess block composition, restrained controls, and complete product layouts.

The shared palette now uses olive charcoal for primary controls and soft sage for accents. Warm paper and ink remain the foundation. This follows the user’s feedback that bright blue buttons feel too intense.

- Effects must have a deliberate composition at desktop and mobile sizes. Pointer response, material, motion, and the static fallback are part of the component. An empty stage with a small object is not a finished exhibit.
- Application examples need recognisable work, meaningful data, and usable controls. Search, selection, empty results, and navigation must have coherent outcomes. Avoid miniature interfaces made from decorative placeholders.
- Blocks should communicate a specific capability through their content and composition. Generic slogans and repeated heading-and-paragraph grids do not establish a product.
- Templates need distinct artwork and complete connected routes. Every project link must lead to its own content. Keep illustrative identities explicit.
- Artwork is authored source in `assets/`; registry generation must never replace it. Template registries are generated dependency closures, and must exclude obsolete files.
- Validate the live preview, catalogue thumbnail, and standalone download together. A passing build establishes technical correctness, not visual quality.

## Overview

**Creative North Star: "The Mineral Workbench"**

Jez UI makes a generous, warm-white work surface for building interfaces, then interrupts it with concentrated mineral colour and a few playful moving exhibits. The catalogue stays calm enough to scan: ink typography, hairline divisions, roomy grids, and compact controls make the product source easy to assess.

Expression is deliberate rather than ambient. The home exhibit is the place for expressive ribbons, olive-charcoal controls, motion, and dark stages; documentation and component inventory return to quiet surfaces.

**Key Characteristics:**
- Warm white paper and near-black ink establish the default reading environment.
- Space Grotesk gives headings a large, close-set editorial voice; Geist keeps controls and supporting copy direct.
- Soft sage and olive charcoal identify interaction, selection, and the live exhibit rather than filling whole screens.
- Borders and tonal surface changes organize information; shadows appear only on contained previews and elevated overlays.

## Colors

The light palette is paper, ink, and soft mineral neutrals, with olive charcoal for committed interaction and soft sage for the active, playful signal.

### Primary

- **Olive Charcoal:** Primary actions, checked controls, selected tabs, active sidebar links, input carets, and focus outlines.
- **Soft Sage:** Selection, the home-statement underline, and high-energy exhibit panels.
- **Danger Red:** Destructive actions and states.

**The Concentrated Signal Rule.** Use olive charcoal and soft sage at moments that need direction or energy. Let the warm-white and ink system do the reading work everywhere else.

### Neutral

- **Warm White:** Page, card, input, and preview-canvas surface in light mode.
- **Ink:** Default text and dark fill for primary catalogue actions.
- **Mineral Muted:** Quiet tile and selected-control surfaces.
- **Soft Graphite:** Supporting text, captions, and metadata.
- **Hairline Stone:** One-pixel boundaries for navigation, cards, fields, and content divisions.
- **Night Ink:** Dark-mode base and live-exhibit stage, paired with the documented dark foreground and muted tokens.

## Typography

**Display Font:** Space Grotesk, sans-serif  
**Body Font:** Geist, sans-serif

**Character:** Space Grotesk carries the confident, close-set statement type. Geist is the quieter interface voice for navigation, labels, descriptions, and utility controls.

### Hierarchy

- **Display:** The home statement uses the display token; page titles step down to 56px and detail titles to 46px.
- **Heading:** Section headings use the heading token and the shared close tracking.
- **Body:** Catalogue introductions and descriptions use the body token, with muted foreground for supporting copy.
- **Label:** Navigation, filters, preview toolbars, and metadata use the label token or smaller compact interface sizes.

**The Two-Voice Rule.** Use Space Grotesk for headings only. Keep UI controls, navigation, code, and supporting text in Geist unless a component explicitly needs a different functional face.

## Layout

The catalogue sits in a centred 1440px shell with 44px horizontal page padding. Its navigation is 88px high and divided by a single border. The home starts with a two-column introduction, then a 1.55:1 exhibit grid with two stacked companion panels. Component cards use three columns, template cards use two, and the long-form docs column is capped at 760px.

At 900px the shell shifts to 24px gutters, component cards become two columns, and detail navigation narrows. At 600px gutters are 18px, navigation is 74px high, the introduction and exhibit collapse to one column, and the detail sidebar disappears.

**The Quiet Frame Rule.** Keep durable content aligned to the shared shell and let the exhibit, preview canvas, or template artwork provide the visual event inside it.

## Elevation & Depth

This is a mostly flat system. Hairline borders, muted canvases, and nested preview surfaces establish hierarchy in ordinary use. The catalogue adds one soft preview lift (`0 10px 30px #00000012`) to a template miniature; popovers, menus, toasts, sheets, and dialogs use their elevated overlay treatment. Do not add ambient card shadows to routine inventory tiles.

**The Flat-at-Rest Rule.** Give ordinary cards and controls their boundary with colour and a one-pixel border. Reserve elevation for overlays and nested previews that need to read as above their context.

## Shapes

The base form is a gently rounded rectangle. Shared controls, cards, and preview frames use the 12px base radius; catalogue filters and compact menu items use 8px, toolbar actions use 6px, and major exhibit panels use 14px. Dialogs and sheets expand to 16px, while switches, badges, sliders, avatar treatments, and circular controls use a full pill.

Borders are thin and stone-coloured. The brand mark is the one deliberately skewed shape: a small rounded square rotated slightly counter-clockwise. Keep the geometry clean and useful; reserve irregularity for the exhibit and animated fields.

## Components

### Buttons

The button family is compact, medium-weight, and clearly functional.

- **Shape:** Gently rounded rectangle (12px), with an 8px compact treatment in catalogue filter tabs and links.
- **Primary:** Electric olive charcoal fill with white text; the normal medium size uses 16px horizontal and 10px vertical padding.
- **Hover / Focus:** Primary buttons brighten on hover. Every focusable control shares the 2px olive charcoal outline offset by 4px.
- **Secondary / Outline / Ghost:** Secondary buttons use muted fill; outline buttons retain the stone border and gain muted fill on hover; ghost buttons gain muted fill only on hover. Disabled buttons reduce to 45% opacity.

### Inputs / Fields

- **Style:** Warm-white fill, stone one-pixel border, 12px corners, 44px height, and compact Geist text.
- **Focus:** The shared olive charcoal focus outline carries interaction; the caret is olive charcoal and placeholder text uses muted foreground.
- **Disabled:** Fields reduce to 50% opacity.

### Badges, Tabs, and Switches

- **Badges:** Full-pill muted labels with medium-weight 12px interface text.
- **Tabs:** A flat bottom-border track; the selected tab replaces its transparent lower line with olive charcoal and changes its text to olive charcoal.
- **Switches:** A 44px by 24px pill track moves a 20px warm-white thumb to the checked position; checked state is olive charcoal.

### Cards / Containers

- **Corner Style:** Shared card and preview frame use 12px corners.
- **Background:** Warm white on the standard surface, with muted art canvases and a slightly darker preview stage for embedded examples.
- **Shadow Strategy:** Flat by default; use documented preview and overlay elevation only where the layer changes.
- **Border:** One pixel in the border role.
- **Internal Padding:** Cards use 24px.

### Navigation

The shared top navigation is an 88px, border-separated line inside the page shell. It uses compact Geist text and plain links; hover changes link colour to olive charcoal. On narrow screens it shortens the link set and hides the end action before content becomes crowded.

## Do's and Don'ts

### Do:

- **Do** use the warm-white, ink, and hairline-stone foundation for catalogue, documentation, and component previews.
- **Do** reserve soft sage for highlights, selection, or a deliberate exhibit panel, and olive charcoal for active controls and direct action.
- **Do** keep display type in Space Grotesk with close tracking and use Geist for interface work.
- **Do** retain the shared focus treatment on every interactive primitive.
- **Do** collapse exhibit and catalogue grids at the established breakpoints rather than squeezing desktop arrangements on mobile.

### Don't:

- **Don't** introduce ambient shadows or heavy card chrome into the standard catalogue grid.
- **Don't** turn the documentation surface into a permanent dark or sage field; expression belongs in bounded demos and exhibits.
- **Don't** use rounded decorative blobs as a substitute for the system's restrained rectangle, pill, and hairline language.
- **Don't** replace real component states with inert showcase controls; the live exhibit and registry both depend on working interaction.
