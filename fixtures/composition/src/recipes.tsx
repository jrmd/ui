import * as React from "react";
import Recipe0 from "../../../examples/blocks/media-aside";
import Recipe1 from "../../../examples/blocks/journal-bento";
import Recipe2 from "../../../examples/blocks/article-sidebar";
import Recipe3 from "../../../examples/blocks/editorial-footer";
import Recipe4 from "../../../examples/blocks/studio-footer";
import Recipe5 from "../../../examples/blocks/newsletter-footer";
import Recipe6 from "../../../examples/blocks/plan-comparison";
import Recipe7 from "../../../examples/blocks/feature-comparison";
import Recipe8 from "../../../examples/blocks/usage-pricing";
import Recipe9 from "../../../examples/blocks/editorial-hero";
import Recipe10 from "../../../examples/blocks/product-demo-hero";
import Recipe11 from "../../../examples/blocks/webgl-hero";
import Recipe12 from "../../../examples/blocks/logo-wall";
import Recipe13 from "../../../examples/blocks/feature-grid";
import Recipe14 from "../../../examples/blocks/alternating-feature-story";
import Recipe15 from "../../../examples/blocks/product-comparison";
import Recipe16 from "../../../examples/blocks/metrics-strip";
import Recipe17 from "../../../examples/blocks/testimonial-grid";
import Recipe18 from "../../../examples/blocks/testimonial-carousel";
import Recipe19 from "../../../examples/blocks/pricing-table";
import Recipe20 from "../../../examples/blocks/pricing-comparison";
import Recipe21 from "../../../examples/blocks/faq";
import Recipe22 from "../../../examples/blocks/newsletter-signup";
import Recipe23 from "../../../examples/blocks/contact-form";
import Recipe24 from "../../../examples/blocks/cta-section";
import Recipe25 from "../../../examples/blocks/marketing-navigation";
import Recipe26 from "../../../examples/blocks/mega-navigation";
import Recipe27 from "../../../examples/blocks/floating-navigation";
import Recipe28 from "../../../examples/blocks/terrain-hero";
import Recipe29 from "../../../examples/blocks/terrain-relief-hero";
import Recipe30 from "../../../examples/blocks/marketing-footer";
import Recipe31 from "../../../examples/blocks/particle-hero";
import Recipe32 from "../../../examples/blocks/liquid-hero";
import Recipe33 from "../../../examples/blocks/orb-hero";
import Recipe34 from "../../../examples/blocks/silk-hero";
import Recipe35 from "../../../examples/blocks/eclipse-hero";
import Recipe36 from "../../../examples/blocks/tunnel-hero";
import Recipe37 from "../../../examples/blocks/constellation-hero";
import Recipe38 from "../../../examples/blocks/distortion-hero";
import Recipe39 from "../../../examples/blocks/media-hero";
import Recipe40 from "../../../examples/blocks/typographic-hero";
import Recipe41 from "../../../examples/blocks/shape-hero";
import Recipe42 from "../../../examples/blocks/studio-hero";
import Recipe43 from "../../../examples/blocks/journal-hero";
import Recipe44 from "../../../examples/blocks/poster-hero";
import Recipe45 from "../../../examples/blocks/portfolio-hero";
import Recipe46 from "../../../examples/blocks/collage-hero";
import Recipe47 from "../../../examples/blocks/editorial-navigation";
import Recipe48 from "../../../examples/blocks/commerce-navigation";
import Recipe49 from "../../../examples/blocks/studio-navigation";
import Recipe50 from "../../../examples/blocks/immersive-login";
import Recipe51 from "../../../examples/blocks/ribbon-login";
import Recipe52 from "../../../examples/blocks/editorial-login";
import Recipe53 from "../../../examples/blocks/application-shell";
import Recipe54 from "../../../examples/blocks/workspace-navigation";
import Recipe55 from "../../../examples/blocks/analytics-overview";
import Recipe56 from "../../../examples/blocks/activity-feed";
import Recipe57 from "../../../examples/blocks/searchable-records-screen";
import Recipe58 from "../../../examples/blocks/record-detail-panel";
import Recipe59 from "../../../examples/blocks/kanban-board";
import Recipe60 from "../../../examples/blocks/task-list";
import Recipe61 from "../../../examples/blocks/calendar-schedule";
import Recipe62 from "../../../examples/blocks/onboarding-wizard";
import Recipe63 from "../../../examples/blocks/sign-in-form";
import Recipe64 from "../../../examples/blocks/sign-up-form";
import Recipe65 from "../../../examples/blocks/password-reset-form";
import Recipe66 from "../../../examples/blocks/profile-settings";
import Recipe67 from "../../../examples/blocks/team-management";
import Recipe68 from "../../../examples/blocks/billing-settings";
import Recipe69 from "../../../examples/blocks/notification-centre";
import Recipe70 from "../../../examples/blocks/command-search";
import Recipe71 from "../../../examples/blocks/chat-workspace";
import Recipe72 from "../../../examples/blocks/workspace-sidebar";
import Recipe73 from "../../../examples/blocks/rail-sidebar";
import Recipe74 from "../../../examples/blocks/inset-sidebar";
import Recipe75 from "../../../examples/blocks/user-switcher";
import Recipe76 from "../../../examples/blocks/organization-switcher";
import Recipe77 from "../../../examples/blocks/sso-login";
import Recipe78 from "../../../examples/blocks/split-login";
import Recipe79 from "../../../examples/blocks/workspace-login";
import Recipe80 from "../../../examples/blocks/feature-carousel";
import Recipe81 from "../../../examples/blocks/expandable-features";
import Recipe82 from "../../../examples/blocks/feature-tabs";
import Recipe83 from "../../../examples/blocks/feature-mosaic";
import Recipe84 from "../../../examples/blocks/feature-spotlight";
import Recipe85 from "../../../examples/blocks/product-bento";
import Recipe86 from "../../../examples/blocks/integration-bento";
import Recipe87 from "../../../examples/blocks/how-it-works-horizontal";
import Recipe88 from "../../../examples/blocks/how-it-works-vertical";
import Recipe89 from "../../../examples/blocks/centered-auth";
import Recipe90 from "../../../examples/blocks/split-auth";
import Recipe91 from "../../../examples/blocks/inset-auth";
const recipes: Record<string, React.ComponentType> = {
  "media-aside": Recipe0,
  "journal-bento": Recipe1,
  "article-sidebar": Recipe2,
  "editorial-footer": Recipe3,
  "studio-footer": Recipe4,
  "newsletter-footer": Recipe5,
  "plan-comparison": Recipe6,
  "feature-comparison": Recipe7,
  "usage-pricing": Recipe8,
  "editorial-hero": Recipe9,
  "product-demo-hero": Recipe10,
  "webgl-hero": Recipe11,
  "logo-wall": Recipe12,
  "feature-grid": Recipe13,
  "alternating-feature-story": Recipe14,
  "product-comparison": Recipe15,
  "metrics-strip": Recipe16,
  "testimonial-grid": Recipe17,
  "testimonial-carousel": Recipe18,
  "pricing-table": Recipe19,
  "pricing-comparison": Recipe20,
  faq: Recipe21,
  "newsletter-signup": Recipe22,
  "contact-form": Recipe23,
  "cta-section": Recipe24,
  "marketing-navigation": Recipe25,
  "mega-navigation": Recipe26,
  "floating-navigation": Recipe27,
  "terrain-hero": Recipe28,
  "terrain-relief-hero": Recipe29,
  "marketing-footer": Recipe30,
  "particle-hero": Recipe31,
  "liquid-hero": Recipe32,
  "orb-hero": Recipe33,
  "silk-hero": Recipe34,
  "eclipse-hero": Recipe35,
  "tunnel-hero": Recipe36,
  "constellation-hero": Recipe37,
  "distortion-hero": Recipe38,
  "media-hero": Recipe39,
  "typographic-hero": Recipe40,
  "shape-hero": Recipe41,
  "studio-hero": Recipe42,
  "journal-hero": Recipe43,
  "poster-hero": Recipe44,
  "portfolio-hero": Recipe45,
  "collage-hero": Recipe46,
  "editorial-navigation": Recipe47,
  "commerce-navigation": Recipe48,
  "studio-navigation": Recipe49,
  "immersive-login": Recipe50,
  "ribbon-login": Recipe51,
  "editorial-login": Recipe52,
  "application-shell": Recipe53,
  "workspace-navigation": Recipe54,
  "analytics-overview": Recipe55,
  "activity-feed": Recipe56,
  "searchable-records-screen": Recipe57,
  "record-detail-panel": Recipe58,
  "kanban-board": Recipe59,
  "task-list": Recipe60,
  "calendar-schedule": Recipe61,
  "onboarding-wizard": Recipe62,
  "sign-in-form": Recipe63,
  "sign-up-form": Recipe64,
  "password-reset-form": Recipe65,
  "profile-settings": Recipe66,
  "team-management": Recipe67,
  "billing-settings": Recipe68,
  "notification-centre": Recipe69,
  "command-search": Recipe70,
  "chat-workspace": Recipe71,
  "workspace-sidebar": Recipe72,
  "rail-sidebar": Recipe73,
  "inset-sidebar": Recipe74,
  "user-switcher": Recipe75,
  "organization-switcher": Recipe76,
  "sso-login": Recipe77,
  "split-login": Recipe78,
  "workspace-login": Recipe79,
  "feature-carousel": Recipe80,
  "expandable-features": Recipe81,
  "feature-tabs": Recipe82,
  "feature-mosaic": Recipe83,
  "feature-spotlight": Recipe84,
  "product-bento": Recipe85,
  "integration-bento": Recipe86,
  "how-it-works-horizontal": Recipe87,
  "how-it-works-vertical": Recipe88,
  "centered-auth": Recipe89,
  "split-auth": Recipe90,
  "inset-auth": Recipe91,
};
export function BlockRecipe({ slug }: { slug: string }) {
  const Recipe = recipes[slug];
  return Recipe ? <Recipe /> : <p>Unknown recipe</p>;
}

export function RecipeBrowser() {
  const [slug, setSlug] = React.useState(
    new URLSearchParams(location.search).get("slug") ?? "media-aside",
  );
  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <label className="mb-6 block text-sm">
        Block recipe
        <select
          aria-label="Block recipe"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        >
          {Object.keys(recipes).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <div data-testid="recipe" data-recipe={slug} key={slug}>
        <BlockRecipe slug={slug} />
      </div>
    </main>
  );
}
