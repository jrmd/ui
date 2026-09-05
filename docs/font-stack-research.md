# Font-stack research

Research date: 5 September 2026.

**Accepted direction:** the user chose Instrument Sans and explicitly rejected
retaining Space Grotesk. The implementation uses Instrument Sans Variable for
all shared headings and interface text, with normal and italic weights 400–700.
The comparison below records the original research; its optional Space Grotesk
recommendation is superseded. No additional mono family was adopted.

## The decision

**Provisional choice: make Instrument Sans the shared interface and heading
face, and retain Space Grotesk only where a deliberately large, expressive
catalogue headline needs its current character. Add IBM Plex Mono only when a
component needs a purposeful code/data face.** Instrument has the strongest
fit with Jez UI's warm-paper/ink, expressive direction: it remains a precise
neo-grotesque at control sizes, but its width, italic and stylistic-set range
can give the library a more authored display voice. This is a design judgment,
not a measured readability claim.

The alternative is not a wholesale three-face identity. Start with Instrument
for `--font-interface` and `--font-heading`; use the existing Space Grotesk
only for selected hero/brand treatments. The result makes ordinary blocks more
coherent while preserving a recognisable expressive tool for the catalogue.

Proposed stacks (font loading remains a separate application concern):

```css
:root {
  --font-interface: "Instrument Sans", ui-sans-serif, system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-heading: var(--font-interface);
  --font-code: "IBM Plex Mono", ui-monospace, "SFMono-Regular",
    Consolas, "Liberation Mono", monospace;
}
```

Map Tailwind's `--font-mono` to `--font-code` if the optional mono face is
adopted. Keep display overrides explicit and consumer font tokens overridable.

## Current baseline

Jez UI currently declares Geist as `--font-interface` and Space Grotesk as
`--font-heading`; global `h1`–`h3` use the heading token at `-.035em` tracking.
The catalogue ships static Latin WOFF2 imports: Space Grotesk 400/500/700 and
Geist 400/500. Semibold examples request a weight that is not imported, and
there is no explicit shared mono token. The declared WOFF2 files total 64,888
bytes on disk; this is not a measured network transfer, so there is no evidence yet that a variable-font
change will reduce payload. Space Grotesk itself supports Vietnamese and
European Latin coverage plus tabular/old-style figures, fractions, and
alternates. [Space Grotesk project](https://github.com/floriankarsten/space-grotesk)

## Candidate comparison

| Family | Fit and expressive range | Technical evidence | Coverage and delivery | Assessment |
| --- | --- | --- | --- | --- |
| **Instrument Sans** | The best shared face candidate: restrained at UI sizes, with twelve named stylistic sets for headings and branding. | Variable width 75–100, weight 400–700, and italic axes; `pnum` and `tnum` are documented. [Instrument's README](https://github.com/Instrument/instrument-sans#variable-axes) | 389 languages; SIL OFL-1.1; author links to Google Fonts. [Language and licence](https://github.com/Instrument/instrument-sans#language-support) | **Recommend for a browser prototype.** Weight range covers Jez's current normal-to-bold use, while its variants add a controlled expressive lever. |
| **IBM Plex Sans + Mono** | Calm, technical, more institutional than Jez's present direction; excellent when a coherent mono partner matters. | Sans, Mono, Serif, and Condensed have Roman and true italics; the official repo supplies npm packages for Sans and Mono. [IBM Plex README](https://github.com/IBM/plex#ibm-plex-typeface-packages) | Extended Latin, Arabic, CJK variants, Cyrillic, Devanagari, Greek, Hebrew, Japanese, Korean, and Thai; OFL. [Coverage](https://github.com/IBM/plex#ibm-plex-typeface) | **Best optional mono/data system**, but use it as a full replacement only if Jez intentionally becomes more sober and technical. |
| **Source Sans 3** | A highly legible, low-personality UI workhorse; it would make the catalogue quieter. | Official variable CSS declares 200–900 upright and 200–900 italic WOFF2 variable files. [Adobe variable CSS](https://github.com/adobe-fonts/source-sans/blob/release/source-sans-3VF.css) | Source Sans 3 is designed for UI environments; Adobe notes expanded Greek, Cyrillic, and language support. [Adobe repo](https://github.com/adobe-fonts/source-sans), [Adobe Fonts](https://fonts.adobe.com/fonts/source-sans-3) | **Strong conservative fallback**, but weaker match for the requested expressive library voice. |
| **Public Sans** | Neutral, narrow, deliberately system-compatible; useful for dense admin UI, not a stronger Jez signature. | Broad weights and italic are design goals; tabular figures are explicitly included. Its variable fonts are marked experimental. [USWDS README](https://github.com/uswds/public-sans#usage) | Latin-only, OFL-1.1, with webfonts and OTFs in the official repository. The project says it is currently unmaintained. [Status and licence](https://github.com/uswds/public-sans) | **Do not choose for the new default**: the maintenance status and Latin-only scope outweigh its dependable neutrality. |
| **Geist + Space Grotesk (current)** | Clear two-voice system: conventional interface text and distinct close-set headings. Space remains the more individual display face. | Geist has official Sans/Mono packages and OFL-1.1. Space's documented figure features support existing data blocks. [Geist](https://github.com/vercel/geist-font), [Space Grotesk](https://github.com/floriankarsten/space-grotesk) | The project currently self-hosts static Latin subsets through Fontsource. | **Keep as the control** in visual testing. The issue is not capability; it is whether its cool geometric voice best serves the warmer Jez direction. |

All candidates are SIL Open Font License 1.1 except that the Public Sans
repository additionally describes USWDS's modification terms; none introduces
a paid webfont licence. Verify the exact chosen package and licence text during
implementation rather than copying this summary into generated notices.

## Delivery and migration surface

Keep self-hosting and subset deliberately. The current static imports are in
`apps/catalogue/app/globals.css`; the shared tokens originate in
`registry/theme.css`, then are repeated in `scripts/build-registry.mjs` and the
generated Next/Vite fixture styles. The eight templates duplicate those tokens,
and the editorial template intentionally uses Georgia. A migration must update
the source tokens and generator first, regenerate the registry and fixtures,
then check downloaded template archives. It should not replace editorial
Georgia as collateral.

For a first prototype, compare the existing five static Latin assets with the
chosen family in the actual catalogue: text at 12–16px, dense data tables with
`font-variant-numeric: tabular-nums`, `em`/`strong`, italic, mobile navigation,
and large hero headings. Record rendered request sizes, line-wrap changes and
desktop/mobile screenshots. A variable font can simplify weight selection, but
may increase transfer size; do not assert a performance win until that run.

## Sources

This note uses font-owner repositories and official font pages rather than
typeface roundups. The primary references are linked beside each claim above;
they were checked on 5 September 2026.
