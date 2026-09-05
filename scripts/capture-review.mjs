import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const page = await browser.newPage({ reducedMotion: "reduce" });
for (const [size, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  await page.setViewportSize({ width, height });
  for (const [name, route] of [
    ["components", "/components"],
    ["detail", "/components/button"],
    ["analytics", "/templates/analytics/preview"],
    ["storefront", "/templates/storefront/preview/collection"],
  ]) {
    await page.goto("http://localhost:3000" + route);
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
      await document.fonts.ready;
    });
    await page.waitForFunction(() =>
      Array.from(document.images).every(
        (i) => i.complete && i.naturalWidth > 0,
      ),
    );
    await page.screenshot({
      path: `.impeccable/review/${name}-${size}.png`,
      fullPage: true,
    });
    if (name === "components")
      await page.screenshot({
        path: `.impeccable/review/${name}-${size}-top.png`,
      });
  }
}
await browser.close();
