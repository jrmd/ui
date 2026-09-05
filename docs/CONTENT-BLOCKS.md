# Content blocks

These 12 registry blocks extend the warm-paper and ink collection with editorial reading layouts, three distinct footer treatments, comparative pricing, and sign-in compositions. They are composed React examples: replace their supplied copy, links, imagery, and illustrative pricing before production use. Default handlers deliberately complete in an honest demo state; they do not subscribe an email, authenticate a person, or create a purchase.

Import each named export from its canonical `registry/blocks/<slug>` source. Every block accepts `className`.

## Editorial layouts

| Block | Export | Purpose and primary inputs |
| --- | --- | --- |
| `media-aside` | `MediaAside` | A two-column feature story. Set `title`, `description`, `imageSrc`, `imageAlt`, `href`, `actionLabel`, and `reverse`; on narrow screens it becomes a single reading flow. |
| `journal-bento` | `JournalBento` | A responsive journal grid. Pass `title` and `items: JournalStory[]`, where every item has `title`, `category`, `href`, `imageSrc`, and `imageAlt`. The first item receives the large editorial treatment. |
| `article-sidebar` | `ArticleSidebar` | Long-form article framing. Set `title`, `imageSrc`, and `imageAlt`, or provide `children` for the article body and `aside` for its margin content. The margin rail becomes a top-divided section on mobile. |

Use meaningful image alternatives. The supplied editorial artwork and “illustrative editorial content” caption are demo material, not publication content.

## Footers

All three footers take `groups?: FooterLinkGroup[]`, where each group is `{ title, links: { label, href }[] }`. Use real destinations before release.

| Block | Export | Purpose and primary inputs |
| --- | --- | --- |
| `editorial-footer` | `EditorialFooter` | Quiet, serif-led publication close. Set `brand` and `description`. |
| `studio-footer` | `StudioFooter` | Dark olive studio close with a single contact action. Set `brand`, `title`, `href`, and `actionLabel`; its default mail link is illustrative. |
| `newsletter-footer` | `NewsletterFooter` | Newsletter sign-up beside navigation. Set `brand` and `groups`; connect `onSubmit(email): Promise<void>` to a subscription service. Without it, the block reports “Demo complete. No email was sent.” |

## Pricing and comparison

All displayed amounts are illustrative GBP prices, not a billing implementation. The controls update local demo state and announce selection; connect a callback to route an informed selection into the product’s own checkout or sales flow.

| Block | Export | Purpose and callback |
| --- | --- | --- |
| `plan-comparison` | `PlanComparison` | Monthly/annual plan cards. Set `title` and `plans?: ComparisonPlan[]`; a plan is `{ name, monthly, annual, features }`. `onSelect(plan, billing)` receives the selected name and `"monthly"` or `"annual"`. |
| `feature-comparison` | `FeatureComparison` | Accessible, horizontally scrollable feature matrix. Set `title`; `onSelect(plan)` receives `"Personal"` or `"Studio"`. Retain the labelled region and horizontal overflow for narrow viewports. |
| `usage-pricing` | `UsagePricing` | A seat slider compares flexible and flat workspace pricing. Set `title`; `onSelect(plan, seats)` receives the chosen plan and current 1–50 seat count. |

## Sign-in blocks

`ImmersiveLogin`, `RibbonLogin`, and `EditorialLogin` share the same sign-in form contract:

```tsx
onSubmit?: (credentials: { email: string; password: string }) => Promise<void> | void
onSSO?: (provider: "google" | "github" | "saml", email?: string) => Promise<void> | void
```

Wire those callbacks to the application’s authentication layer. When omitted, submissions state clearly that the block is a demo and no authentication occurred. Callback failures are surfaced to the user; successful calls produce a completion status.

| Block | Distinct presentation inputs |
| --- | --- |
| `immersive-login` | `brand`, `title`, `description`, and `animated?: boolean`. Its orb artwork is optional: `animated={false}` renders a static brand treatment. |
| `ribbon-login` | `brand`, `title`, `description`, and `animated?: boolean`. Its ribbon artwork is optional: `animated={false}` renders a static brand treatment. |
| `editorial-login` | `brand`, `title`, `description`, `imageSrc`, and `imageAlt`. It uses supplied editorial imagery rather than WebGL. |

Use `animated={false}` for reduced-motion preferences, constrained devices, a non-WebGL environment, or any product context where the illustrative animation is not appropriate. The sign-in blocks keep the form usable in that fallback state.

## Visual and responsive guidance

These layouts deliberately widen the collection’s quiet catalogue language into editorial, studio, and dark immersive moments. Keep the surrounding page on warm paper with ink copy, hairline divisions, restrained radii, and Instrument Sans for interface work; the footer and login panels provide bounded colour or artwork events. Editorial variants may use their deliberate serif display treatment.

At desktop widths, editorial stories use paired media/text or a margin rail; pricing cards form columns; login panels split form and artwork. At narrow widths, these compositions stack into reading order. The feature matrix preserves its columns in a labelled, keyboard-focusable horizontal scroll region rather than compressing its comparison semantics.

## Validation

The block suite has reviewer disposition **SHIP**. Captures for every block are stored in [`.impeccable/review/blocks`](../.impeccable/review/blocks): `*-1280.png` records the 1280px review and `*-390.png` the 390px mobile review. The content-block Playwright coverage verifies annual pricing, seat totals, demo selection states, reduced-motion login submission, newsletter demo status, and the mobile comparison scroll region. Project verification reports 91 components, 79 blocks, and nine templates passing the registry/schema and source-parity gate.
