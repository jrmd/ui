import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const route = "/templates/product-launch/preview";
test("launch synth makes audio, exports edited settings, and stops", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = window.AudioContext;
    Object.defineProperty(window, "AudioContext", {
      value: class extends original {
        constructor() {
          super();
          const analyser = this.createAnalyser();
          const createGain = this.createGain.bind(this);
          let gains = 0;
          this.createGain = () => {
            const node = createGain();
            if (++gains === 2) node.connect(analyser);
            return node;
          };
          Object.assign(window, {
            afterTestAudio: { context: this, analyser },
          });
        }
      },
    });
  });
  await page.goto(route);
  await page.getByRole("button", { name: /Glass tide/ }).click();
  await expect(
    page.getByRole("slider", { name: "Tone", exact: true }),
  ).toHaveValue("220");
  await page.getByRole("slider", { name: "Tone", exact: true }).fill("330");
  await page.getByRole("button", { name: "Play sound", exact: true }).click();
  await expect(page.getByRole("button", { name: "Stop sound" })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const audio = (
          window as unknown as { afterTestAudio: { analyser: AnalyserNode } }
        ).afterTestAudio;
        const data = new Float32Array(audio.analyser.fftSize);
        audio.analyser.getFloatTimeDomainData(data);
        return Math.max(...data.map(Math.abs));
      }),
    )
    .toBeGreaterThan(0.001);
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save preset" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("afterhours-preset.json");
  const preset = JSON.parse(fs.readFileSync((await download.path())!, "utf8"));
  expect(preset).toMatchObject({ tone: 330, waveform: "triangle", space: 80 });
  await page.getByRole("button", { name: "Stop sound" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { afterTestAudio: { context: AudioContext } })
            .afterTestAudio.context.state,
      ),
    )
    .toBe("closed");
});

test("launch mobile routes and demo access form work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Get early access" })
    .click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("listener@example.com");
  await page.getByRole("button", { name: "Join early access" }).click();
  await expect(page.getByRole("status")).toContainText(
    "You’re on the demo list.",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Release notes" })
    .click();
  await expect(
    page.getByRole("heading", { name: "The first frequency." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Play this edition" }).click();
  await expect(
    page.getByRole("button", { name: "Play sound", exact: true }),
  ).toBeVisible();
});

test("launch WebGL, fallback and responsive visual evidence", async ({
  page,
}) => {
  test.setTimeout(90000);
  fs.mkdirSync(".impeccable/review/product-launch", { recursive: true });
  for (const width of [1440, 1149, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(route);
    await expect(page.locator(".after-hero canvas")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    // Wait for actual nonempty WebGL frames before freezing the composition.
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Pause hero animation" }).click();
    await expect(
      page.getByRole("button", { name: "Play hero animation" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.waitForTimeout(150);
    await page.addStyleTag({
      content: "nextjs-portal { display:none !important; }",
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `.impeccable/review/product-launch/launch-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `.impeccable/review/product-launch/launch-${width}-top.png`,
    });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".after-hero canvas")).toHaveCount(0);
  await expect(page.locator(".after-hero [data-webgl-fallback]")).toBeVisible();
  await page.screenshot({
    path: ".impeccable/review/product-launch/launch-fallback-390.png",
  });
  const accessibility = await new AxeBuilder({ page })
    .include(".after-launch")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  for (const subroute of ["early-access", "release-notes"]) {
    await page.goto(`${route}/${subroute}`);
    await expect(page.locator(".after-launch h1")).toBeVisible();
    await page.addStyleTag({
      content: "nextjs-portal { display:none !important; }",
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.screenshot({
      path: `.impeccable/review/product-launch/${subroute}-390.png`,
      fullPage: true,
    });
  }
});
