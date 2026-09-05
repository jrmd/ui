# Afterhours product-launch template

Afterhours is a standalone, illustrative product-launch template for a fictional sound-design instrument. It is a **Persuade** surface with a real browser-only demonstration: the visitor can select a texture, change its sound controls, start and stop it, and save the current settings. It does not represent an available product, native application, release date, or signup service.

It extends the existing [`TunnelHero`](../registry/blocks/tunnel-hero.tsx) AFTERHOURS world rather than establishing a second visual system. The first viewport remains a black stage with an ice-blue volumetric tunnel, Instrument Sans, and restrained dark chrome. Its large `SOUND, UNBOUND.` message leads directly to the playable instrument.

## Journey and routes

The home route connects the moving hero, introductory statement, instrument, explanation of the three sound controls, early-access invitation, FAQ, and anchored footer. The template also has standalone `early-access` and `release-notes` routes. Navigation, the mobile menu, hero action, and in-page instrument links must remain connected when the template is previewed or extracted.

The early-access form is deliberately a frontend demonstration. Submission changes only the local view to a confirmation state: no address is sent, saved, or claimed as a real registration.

## Hero and motion

`TunnelHero` supplies the tunnel scene and its established lifecycle: a visitor can pause or resume the animation; it respects reduced-motion preferences; it suspends while off screen; and it presents a static fallback when WebGL is unavailable. The template overrides its copy, action target, styling, and a slow `0.28` scene speed, but does not replace its artwork or lifecycle behavior.

At 700px and below, the navigation becomes an explicit menu control, the hero remains readable in a 570px stage, and the instrument changes from three horizontal control columns to a stacked control surface. Keep this hierarchy rather than compressing the desktop control grid.

## Playable instrument

The instrument is an opt-in Web Audio synth with no samples, remote audio, or autoplay. It begins silent, exposes a clear Play sound / Stop sound transport, and advises visitors to begin at a low volume. It closes the audio context when stopped, when the document becomes hidden, on `pagehide`, and on component cleanup. If Web Audio cannot start, the template reports a visible retry message.

The three presets provide the starting settings below; they are examples, not a registry component API.

| Preset | Tone | Space | Movement | Waveform |
| --- | ---: | ---: | ---: | --- |
| Low orbit | 110 Hz | 65% | 12% | sine |
| Glass tide | 220 Hz | 80% | 36% | triangle |
| Night signal | 164 Hz | 30% | 72% | sawtooth |

`Tone` sets the primary oscillator frequency from 55–440 Hz; an overtone follows at 1.5× that frequency. `Space` sets the wet delay amount, while `Movement` controls the LFO rate and detune depth. The synth uses a primary oscillator, a sine overtone, a feedback delay, and a movement LFO; master gain ramps to a quiet `0.055` when playback begins. Save preset exports the current preset name and settings as `afterhours-preset.json`; it records parameters, never audio.

This playable demonstration may later be extracted as a reusable product-demo instrument if its API, visual contract, and lifecycle are intentionally defined. It is not an existing registry block.

## Asset and distribution boundary

The template uses procedural WebGL and inline vector waveform artwork. The only new raster media is the catalogue screenshot thumbnail, whose origin metadata remains with the generated catalogue asset. Do not introduce replacement raster artwork to imitate the tunnel or waveform.

The extracted standalone archive must retain the same routes, hero fallback behavior, audio lifecycle, and local-only signup semantics as the catalogue preview.

## Recorded validation

The completed product-launch browser suite has three passing tests. It verifies actual nonzero sample amplitude after playback, edited preset export, and closed audio context after Stop sound; mobile navigation and both standalone routes; and live WebGL at 1440px, 1149px, and 390px, plus the reduced-motion fallback and an axe scan with no violations.

After the template readiness fix, all nine archives were regenerated. The new product-launch archive was extracted and rebuilt alongside the other eight, and canonical source byte parity passed. The recorded extracted-build results list all nine templates as passed. The final reviewer outcome was Full approval.
