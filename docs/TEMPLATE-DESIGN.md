# Template Design Reference

This document records the visual rules of the standalone illustrative templates rebuilt in September 2026. It is a template-specific companion to the catalogue [DESIGN.md](../DESIGN.md), not a replacement for it. The identities below deliberately override some shared catalogue tokens inside their own template roots. The Afterhours product launch has its own focused companion, [PRODUCT-LAUNCH-TEMPLATE.md](./PRODUCT-LAUNCH-TEMPLATE.md), because its working browser instrument and inherited WebGL lifecycle need behavioral guidance as well as visual rules.

## Overview

### Alex Rivers portfolio

**Creative North Star: "The considered working portfolio"**

Alex Rivers presents interface design and frontend work through a compact, editorial portfolio. A large statement and a short supporting column introduce the work; the primary project is given a wide interface-concept stage, with two smaller studies beneath it. Project details preserve the same calm reading rhythm rather than becoming a generic marketing page.

### Objects storefront

**Creative North Star: "The quiet homewares journal"**

Objects is an illustrative homewares shop. Warm photography and generous object canvases lead the composition, while the olive action colour, small utility type, and restrained border language keep browsing and purchasing clear. The template carries a complete local shopping journey: collection, product, cart, and demo checkout.

## Colors

### Alex Rivers portfolio

- **Sage canvas** (`#dce2d5`) frames the principal interface concept and closing invitation.
- **Olive action** (`#2d4439`) is reserved for the circular `ar.` mark and the closing action.
- **Paper surface** (`#fffefa`) forms the contained interface studies; its internal support surfaces use pale green-grey (`#f0f3eb`, `#f1f3ec`).
- **Frequency blue** (`#2646df`) belongs only to the Frequency artwork. It is not a portfolio control colour.
- Shared foreground, muted copy, border, and accent tokens provide the rest of the reading surface.

### Objects storefront

- **Warm paper** (`#faf8f3`) is the page surface; **ink** (`#282b24`) is the default text.
- **Olive** (`#394635`) carries the announcement bar, primary actions, selected collection filters, and active gallery thumbnail border.
- **Stone and sage neutrals** (`#e9e5db`, `#eeece3`, `#ebe8df`, `#dce1ce`) make image stages, summaries, search, and selection surfaces.
- **Hairline stone** (`#dddcd1`) separates navigation, filters, product disclosures, and footer regions.

## Typography

Both identities use the template heading family (`--font-heading`, currently Instrument Sans Variable) with close negative tracking for headings. Body and control copy use the template interface family.

### Alex Rivers portfolio

- Statements and project titles use medium-weight heading type; the primary display runs from 40px to 64px at a 1.05–1.06 line-height.
- Navigation and text links are 12–13px, while supporting copy is typically 13–15px with 1.6–1.75 line-height.
- The muted sage headline treatment is semantic emphasis, not italic typography: `em` is reset to normal style.

### Objects storefront

- The brand is a 32px medium-weight wordmark; home display type runs from 44px to 64px and editorial display type reaches 56px.
- Product titles and section headings remain small and useful (15px product names; 30px section titles); prices use tabular figures.
- Product descriptions and supporting commerce copy use 11–14px text at generous 1.6–1.8 line-height.

## Layout

### Alex Rivers portfolio

- The shell is capped at 1248px with 40px desktop gutters and an 88px border-separated navigation row.
- The introduction is a 1.7:1 statement/supporting-copy grid. The project grid is two columns, with the first project spanning both columns and using a 2.6:1 interface stage.
- Case studies and about content use balanced two-column reading pairs; the closing prompt is a horizontal sage callout.
- At 1000px gutters reduce to 28px. At 700px, gutters are 20px; every primary content grid becomes one column, artwork changes to a 1.35 ratio, and the contained interface reduces its internal density.
- At 430px the navigation changes to a 44px menu control that reveals the otherwise hidden link row. The Frequency artwork uses `object-fit: contain` and a 1.78 ratio so its full text remains visible at narrow widths.

### Objects storefront

- The navigation, main content, and footer use a 1360px maximum; desktop page gutters are 40px. The announcement bar is a separate 32px-high, full-width utility strip.
- The home hero is a 0.85:1.35 copy/image grid with a 460px minimum height (490px at 1440px and above). Product browsing is a four-column grid; editorial content and product details are two columns.
- The collection supports category filters, sort, result count, and text filtering without breaking the product-card grid. Cart and checkout retain a content/summary split.
- At 1000px gutters reduce to 28px, media minimums reduce to 400px, and large paired layouts tighten their gaps. At 700px gutters are 20px: the navigation wraps with its link row underneath, the hero and editorial feature stack, the product grid becomes two columns, and product detail/cart/checkout become one-column sequences.

## Elevation & Depth

### Alex Rivers portfolio

The portfolio is flat except for contained project interfaces. Those mock interfaces use a soft `0 16px 40px #253a2720` lift and move upward 5px on project-card hover. Borders establish routine structure; no other ambient card shadow is used.

### Objects storefront

Objects uses tonal stages, hairline separators, image cropping, and rounded image frames instead of shadows. Product-card feedback comes from a 3.5% image scale and a small arrow translation, keeping the merchandise rather than the card chrome visually prominent.

## Shapes

### Alex Rivers portfolio

The signature shapes are a circular 35px `ar.` mark and circular 36px project arrows. Artwork and the closing invitation use 14px corners; interface studies meet the crop with rounded top corners only. Controls retain the shared focus outline.

### Objects storefront

The shop uses compact 6–10px radii for actions, form controls, product media, summaries, and the product detail image. Product arrows are circular. Image crops are intentional: product cards use 4:5, gallery media is square, and category imagery shifts from 1.4 to a taller 0.8 ratio on mobile.

## Components

### Alex Rivers portfolio

- **Navigation:** plain 13px links in an 88px rule-separated row; current pages receive an underlined state with a 7px offset. The compact mobile menu preserves accessible expanded state.
- **Project cards:** artwork leads, then a concise title, description, role line, and circular arrow. The first card is the wide lead story; do not flatten all projects into identical cards.
- **Interface studies:** Field notes keeps a small navigation rail and writing surface; Common ground removes the rail for a board-like composition. Their lightweight internal UI is artwork, not a reusable product shell.
- **Closing action:** sage container with an olive, 48px-minimum action button.

### Objects storefront

- **Product cards:** 4:5 image first, then product/finish/category metadata and price. The circular arrow appears over the image; hover movement stays small.
- **Commerce controls:** primary actions use olive fill, white text, 6px corners, and a 48px minimum height. Selected category filters also use olive fill; fields remain transparent or paper-toned with a stone border.
- **Product detail:** square main image, selectable finish thumbnails, compact quantity stepper, a service note, and bordered disclosure rows. Related merchandise uses a three-column desktop variation.
- **Cart and demo checkout:** order summary is a tonal stone panel; local-demo status stays explicit in the summary and checkout copy.

## Do's and Don'ts

- **Do** keep Alex Rivers work-led: make the interface concepts and case-study sequence do the visual work.
- **Do** retain the wide lead project and the different internal compositions of Field notes and Common ground.
- **Don't** use Frequency blue as a general portfolio action colour.
- **Do** let Objects merchandise photography occupy the hero, product cards, and editorial feature before adding decorative treatment.
- **Do** preserve the active/filter, search, sort, gallery, cart, and local-checkout states as part of the storefront composition.
- **Don't** turn the illustrative local checkout into a claim that payment or order processing occurs.
- **Don't** treat either template's overrides as catalogue design tokens; use [DESIGN.md](../DESIGN.md) for shared catalogue guidance.
