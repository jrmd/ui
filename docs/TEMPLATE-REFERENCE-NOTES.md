# Portfolio and storefront reference pass

Template-specific visual composition and responsive invariants are recorded in [TEMPLATE-DESIGN.md](./TEMPLATE-DESIGN.md). It complements, and does not replace, the catalogue-wide [DESIGN.md](../DESIGN.md).

User-supplied references reviewed September 2026:

- [Solace UI](https://www.solaceui.com/): artwork leads the section and typography has a clear supporting role; its live hero combines full-scale product imagery with a restrained frame.
- [Shadcn Studio](https://shadcnstudio.com/): varied compositions, clear action groups and much richer product-detail examples than a bare image and title.
- [Shadcn Space](https://shadcnspace.com/): coordinated image-led sections and complete page sequences.
- [Shadcncraft](https://shadcncraft.com/): restrained controls and a consistent interface vocabulary.
- [Shadcn UI Kit](https://shadcnuikit.com/) and [Tailark](https://tailark.com/): reviewed the public inventories as supporting references for complete template and block coverage.
- [Tailwind Plus](https://tailwindcss.com/plus/ui-kit): public UI and ecommerce previews. The exposed Chrome session showed Sign in. Used composition and interaction coverage as reference; no commercial source was copied into this distributable kit.

## Resulting changes

Portfolio now leads with an interface concept for Field notes, followed by two paired projects, rather than a repeated poster/text split with empty columns. Project case studies, mobile navigation, about and contact share the new rhythm.

Objects now has three product families (five finishes), room photography, product cards, an editorial feature, category previews, search/filter/sort, product-detail views, a cart with correct per-product pricing, and an order-summary layout. Newsletter and checkout remain explicitly local demonstrations.

New reusable block opportunities remain: extract the product gallery, product card grid, cart summary, category preview, and portfolio case-study layout into registry blocks once their APIs are settled. They are implemented within these templates now; do not report them as separately installable blocks yet.

The three new project-bound images are assets/objects-room.png, assets/objects-vase.png, and assets/objects-throw.png. Generated with the built-in imagegen tool. Exact prompts travel in the image metadata under impeccable:prompt.
