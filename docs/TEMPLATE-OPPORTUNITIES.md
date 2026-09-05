# Template improvements and next blocks

The eight templates retain their separate identities. The initial pass added scoped responsive typography and navigation spacing, an editorial masthead, stronger project shortcuts and chat prompts, creative contact endings, next-project navigation, and related reading. Following user feedback, the portfolio and storefront were rebuilt with work-led project previews, a three-product homewares collection, product filters, multi-product cart totals and a fuller editorial shopping layout. See TEMPLATE-REFERENCE-NOTES.md for the revised reference pass. `templates/styles.css` is authored source, copied to standalone apps and included in catalogue previews by the registry generator.

## Blocks worth adding

These are gaps in the reusable block collection, rather than a request to invent product claims.

| Priority | Block | Where it helps |
| --- | --- | --- |
| High | Case-study story with brief, approach, image gallery, and next project | The portfolio now has distinct interface concepts, metadata and project-specific design narratives. A reusable long-form case-study block would make richer examples easier to compose. |
| High | Product detail gallery with thumbnails, finish selection and specification rows | The expanded storefront now has a finish gallery and three product-detail views. Extract these inline compositions into a reusable block. |
| High | Cart summary and checkout form | Existing storefront routes work as a demo, but their source is inline rather than reusable commerce blocks. |
| High | Workspace empty, loading, error and permission states | Dedicated compositions would make the application templates easier to adapt to real data and first use. |
| Medium | Services and process section | Gives the agency studio page more substance using real service details supplied by its owner. |
| Medium | Editorial article layout with author, reading progress and related stories | Extract the existing reading flow into a configurable block, with pull quotes and image captions. |
| Medium | Saved report builder with chart, breakdown table and date comparison | Expands analytics beyond its fixed illustrative overview. |
| Medium | Project overview with milestones, owners and activity | Adds a useful layer between the project shortcut and the task board. |

Newsletter signup, FAQ, pricing comparison, testimonials, team management and billing settings already exist. Compose these where useful rather than add duplicates. Testimonials and outcomes need genuine source material before using them as credibility sections.

## Validation scope

Check the live desktop and mobile preview, connected journeys and generated archive together. The style detector compares templates against the catalogue type ramp; the independent template display sizes are intentional, consistent with DESIGN.md's eight distinct identities. Demo auth, chat, checkout and analytics remain illustrative frontend experiences.
