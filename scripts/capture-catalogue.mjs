import { chromium } from "@playwright/test";
import fs from "node:fs";
import { templateSpecs } from "./catalogue-data.mjs";
const items = JSON.parse(
  fs.readFileSync("packages/catalogue/items.json", "utf8"),
);
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const page = await browser.newPage({
  viewport: { width: 680, height: 430 },
  reducedMotion: "reduce",
});
fs.mkdirSync("apps/catalogue/public/thumbnails", { recursive: true });
for (const item of items) {
  await page.goto(
    (process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000") +
      "/preview/" +
      item.slug,
  );
  await page.locator(".demo-root").waitFor();
  await page.getByText("Loading example…").waitFor({ state: "hidden" });
  await page.evaluate(() => document.fonts.ready);
  if (await page.locator(".recharts-responsive-container").count())
    await page.locator(".recharts-surface").first().waitFor();
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await page.screenshot({
    path: `apps/catalogue/public/thumbnails/${item.slug}.jpg`,
    type: "jpeg",
    quality: 80,
  });
}
await page.setViewportSize({ width: 1280, height: 850 });
for (const t of templateSpecs) {
  await page.goto(
    `${process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000"}/templates/${t.slug}/preview`,
  );
  await page.locator(".template-root h1,.template-root h2").first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  if (await page.locator(".recharts-responsive-container").count())
    await page.locator(".recharts-surface").first().waitFor();
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await page.screenshot({
    path: `apps/catalogue/public/thumbnails/template-${t.slug}.jpg`,
    type: "jpeg",
    quality: 85,
  });
}
await browser.close();
console.log(
  "Captured 130 real component/block thumbnails and eight template previews.",
);
