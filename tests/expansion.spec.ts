import { test, expect } from "@playwright/test";
test("icon content is centered in its hit target", async ({ page }) => {
  await page.goto("/preview/icon-button");
  const button = page.getByRole("button").first();
  const b = await button.boundingBox();
  const s = await button.locator("svg").boundingBox();
  expect(Math.abs(b!.x + b!.width / 2 - s!.x - s!.width / 2)).toBeLessThan(1);
  expect(Math.abs(b!.y + b!.height / 2 - s!.y - s!.height / 2)).toBeLessThan(1);
});
test("mega menu uses header width and remains clickable", async ({ page }) => {
  await page.goto("/preview/mega-navigation");
  await page.getByRole("button", { name: "Explore" }).click();
  const card = page.getByRole("link", { name: /Small details/ });
  await expect(card).toBeVisible();
  const b = await card.boundingBox();
  expect(b!.width).toBeGreaterThan(200);
  await card.click();
  await expect(page).toHaveURL(/\/components$/);
});

test("workspace switches organizations and accounts, including keyboard selection", async ({
  page,
}) => {
  await page.goto("/preview/workspace-sidebar");
  await page.getByRole("button", { name: "Workspace: Common Studio" }).click();
  await page.getByRole("menuitemradio", { name: /Personal/ }).click();
  await expect(
    page.getByRole("button", { name: "Workspace: Personal" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Account: Alex Rivers" }).click();
  await page.getByRole("menuitemradio", { name: /Jamie Chen/ }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Account: Jamie Chen" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "New project", exact: true }).click();
  await page.getByRole("textbox", { name: "Project name" }).fill("Launch plan");
  await page.getByRole("button", { name: "Create project" }).click();
  await expect(
    page.getByRole("heading", { name: "Launch plan" }),
  ).toBeVisible();
});
test("mobile sidebar closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/inset-sidebar");
  await page.getByRole("button", { name: "Open sidebar" }).click();
  await page
    .getByRole("navigation", { name: "Workspace pages" })
    .getByRole("button", { name: "Inbox" })
    .click();
  await expect(page.getByRole("heading", { name: "Inbox" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Workspace pages" }),
  ).toBeHidden();
});
test("login demo handles provider and SSO submissions honestly", async ({
  page,
}) => {
  await page.goto("/preview/sso-login");
  await page.getByRole("button", { name: "Continue with Google" }).click();
  await expect(page.getByRole("status")).toContainText("Demo only");
  await page.goto("/preview/workspace-login");
  await page
    .getByRole("textbox", { name: "Work email" })
    .fill("alex@example.com");
  await page.getByRole("button", { name: "Continue with SSO" }).click();
  await expect(page.getByRole("status")).toContainText("Demo only");
});
test("carousel slides, wraps, and allows direct selection", async ({
  page,
}) => {
  await page.goto("/preview/testimonial-carousel");
  await page.getByRole("button", { name: "Next quote" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.getByText("Story 2 of 3")).toBeAttached();
  await expect(page.locator('article[aria-hidden="false"]')).toContainText(
    "Jamie Chen",
  );
  await page.getByRole("button", { name: "Go to story 3" }).click();
  await page.getByRole("button", { name: "Next quote" }).click();
  await expect(page.locator('article[aria-hidden="false"]')).toContainText(
    "Rowan Ellis",
  );
});
test("studio navigation manages focus and escape", async ({ page }) => {
  await page.goto("/preview/studio-navigation");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Studio navigation" })
      .getByRole("link"),
  ).toHaveCount(3);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
});
const newHeroes = [
  "particle",
  "liquid",
  "orb",
  "silk",
  "eclipse",
  "tunnel",
  "constellation",
  "distortion",
  "media",
  "typographic",
  "shape",
  "studio",
  "journal",
  "poster",
  "portfolio",
  "collage",
];
for (const width of [390, 1280])
  test(`new heroes render without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const slug of newHeroes) {
      await page.goto(`/preview/${slug}-hero`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
        slug,
      ).toBeLessThanOrEqual(1);
      const images = page.locator("img");
      for (const img of await images.all())
        expect(
          await img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
          slug,
        ).toBeTruthy();
    }
  });
for (const kind of ["silk", "eclipse", "tunnel", "constellation"])
  test(`${kind} creates a live WebGL scene and pauses`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`/preview/${kind}-hero`);
    await expect(page.locator("canvas")).toBeVisible();
    await page.getByRole("button", { name: "Pause artwork" }).click();
    await expect(
      page.getByRole("button", { name: "Play artwork" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(errors).toEqual([]);
  });
test("hero collection filter exposes exactly twenty designs", async ({
  page,
}) => {
  await page.goto("/blocks?category=heroes");
  await expect(page.getByText("Showing 20 of 67")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "heroes", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("silk headline fits inside its mobile container", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/silk-hero");
  const bounds = await page
    .getByRole("heading", { level: 1 })
    .evaluate((el) => {
      const r = document.createRange();
      r.selectNodeContents(el);
      const text = r.getBoundingClientRect(),
        box = el.getBoundingClientRect();
      return {
        left: text.left,
        right: text.right,
        boxLeft: box.left,
        boxRight: box.right,
      };
    });
  expect(bounds.left).toBeGreaterThanOrEqual(bounds.boxLeft - 1);
  expect(bounds.right).toBeLessThanOrEqual(bounds.boxRight + 1);
});
