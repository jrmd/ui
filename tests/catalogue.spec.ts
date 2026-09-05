import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import items from "../packages/catalogue/items.json";
import { templateSpecs } from "../scripts/catalogue-data.mjs";
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
]) {
  for (const group of [
    "foundations",
    "product",
    "motion",
    "effects",
    "charts",
    "marketing",
    "workspace",
  ])
    test(`${group} demos render at ${viewport.width}`, async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const item of items.filter((i) => i.group === group)) {
        await page.goto("/preview/" + item.slug);
        await expect(page.locator(".demo-root")).toBeVisible();
        await expect(page.getByText("Loading example…")).toHaveCount(0);
        await expect(
          page.locator(".demo-root > div > *").first(),
        ).toBeAttached();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 2,
        );
        expect(overflow, item.slug + " overflow").toBe(false);
      }
      expect(errors).toEqual([]);
    });
  for (const t of templateSpecs)
    test(`${t.slug} routes render at ${viewport.width}`, async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize(viewport);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of t.routes) {
        await page.goto(
          `/templates/${t.slug}/preview${route ? "/" + route : ""}`,
        );
        await expect(page.locator(".template-root")).toBeVisible();
        await expect(page.locator("h1,h2").first()).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 2,
          ),
          route + " overflow",
        ).toBe(false);
        await expect(
          page
            .locator("img")
            .evaluateAll((imgs) =>
              imgs.every(
                (i) =>
                  (i as HTMLImageElement).complete &&
                  (i as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        ).resolves.toBe(true);
      }
      expect(errors).toEqual([]);
    });
}
for (const route of [
  "/",
  "/components",
  "/blocks",
  "/templates",
  "/preview/button",
  "/preview/dialog",
  "/preview/data-table",
  "/templates/storefront/preview/checkout",
])
  test("accessibility " + route, async ({ page }) => {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("body")).not.toBeEmpty();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
test("catalogue search works and normal catalogue does not fetch WebGL", async ({
  page,
}) => {
  const scripts: string[] = [];
  page.on("response", (r) => {
    if (r.request().resourceType() === "script") scripts.push(r.url());
  });
  await page.goto("/components");
  await page.getByLabel("Search catalogue").fill("ribbon");
  await expect(page.locator(".catalogue-tile")).toHaveCount(1);
  await expect(page.getByText("WebGL Ribbon Field")).toBeVisible();
  expect(await page.locator("canvas").count()).toBe(0);
  expect(scripts.length).toBeGreaterThan(0);
});
test("WebGL static fallback honours reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/preview/webgl-orb");
  await expect(page.locator("[data-webgl-fallback]")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
