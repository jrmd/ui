import { test, expect } from "@playwright/test";

test("ordinary catalogue downloads no Three renderer", async ({ page }) => {
  const bodies: Promise<string>[] = [];
  page.on("response", (response) => {
    if (response.request().resourceType() === "script")
      bodies.push(response.text());
  });
  await page.goto("/components");
  await page.waitForLoadState("networkidle");
  expect(bodies.length).toBeGreaterThan(0);
  const code = (await Promise.all(bodies)).join("\n");
  expect(code).not.toContain("THREE.WebGLRenderer");
  expect(code).not.toContain("WebGLRenderingContext");
});

test("six WebGL scenes render and context loss falls back", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const slug of [
    "particle-field",
    "ribbon-field",
    "liquid-surface",
    "orb",
    "terrain",
    "image-distortion",
  ]) {
    await page.goto("/preview/webgl-" + slug);
    await expect(page.locator("canvas")).toBeVisible();
    await expect
      .poll(() =>
        page.locator("canvas").evaluate((c: HTMLCanvasElement) => c.width),
      )
      .toBeGreaterThan(300);
    expect(
      await page
        .locator("canvas")
        .evaluate((c: HTMLCanvasElement) => !!c.getContext("webgl2")),
    ).toBe(true);
    await page
      .locator("canvas")
      .evaluate((c: HTMLCanvasElement) =>
        c
          .getContext("webgl2")!
          .getExtension("WEBGL_lose_context")!
          .loseContext(),
      );
    await expect(page.locator("[data-webgl-fallback]")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("homepage removes offscreen GPU canvas and reduced motion restores static art", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator("canvas")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("[data-webgl-fallback]")).toBeVisible();
});
