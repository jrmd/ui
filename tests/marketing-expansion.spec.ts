import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const marketingBlocks = [
  "feature-carousel",
  "expandable-features",
  "feature-tabs",
  "feature-mosaic",
  "feature-spotlight",
  "product-bento",
  "integration-bento",
  "how-it-works-horizontal",
  "how-it-works-vertical",
  "centered-auth",
  "split-auth",
  "inset-auth",
] as const;

const authShells = ["centered-auth", "split-auth", "inset-auth"] as const;
const signUpControl = /^(Create (an |your )?account|Sign up)$/;

test.describe("marketing expansion", () => {
  test("feature carousel supports direct, button, and keyboard slide selection", async ({
    page,
  }) => {
    await page.goto("/preview/feature-carousel");

    const tabs = page.getByRole("tablist", { name: "Feature slides" });
    await expect(tabs.getByRole("tab")).toHaveCount(3);
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Show feature 1");

    await tabs.getByRole("tab", { name: "Show feature 1" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Show feature 2");
    await expect(page.locator('article[aria-hidden="false"]')).toContainText(
      "Review work while it still has momentum.",
    );

    await page.getByRole("button", { name: "Next feature" }).click();
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Show feature 3");
    await page.getByRole("button", { name: "Previous feature" }).click();
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Show feature 2");
    await tabs.getByRole("tab", { name: "Show feature 3" }).click();
    await expect(page.locator('article[aria-hidden="false"]')).toContainText(
      "Know what changed before you ship.",
    );

    await page.goto("/preview/feature-carousel?composition=1");
    const rail = page.locator("[data-slot=feature-carousel-content]");
    await expect(rail.getByRole("button")).toHaveCount(3);
    await rail.getByRole("button", { name: /Clear review/ }).click();
    await expect(
      rail.getByRole("button", { name: /Clear review/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("region", { name: "Selected feature" }),
    ).toContainText("Comments · requests · approvals");
  });

  test("feature tabs follow the expected roving keyboard order", async ({
    page,
  }) => {
    await page.goto("/preview/feature-tabs");
    const tabs = page.getByRole("tablist", { name: "Product capabilities" });
    const plan = tabs.getByRole("tab", { name: "Plan", exact: true });

    await plan.focus();
    await page.keyboard.press("End");
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Ship");
    await expect(tabs.getByRole("tab", { name: "Ship" })).toBeFocused();
    await expect(page.getByRole("tabpanel", { name: "Ship" })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Plan");
    await page.keyboard.press("Home");
    await expect(
      tabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName("Plan");
  });

  test("expandable features expose one selected desktop panel and work from the keyboard on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/preview/expandable-features");
    const desktopTabs = page.getByRole("tablist", { name: "Feature details" });
    await expect(desktopTabs.getByRole("tab", { selected: true })).toHaveCount(
      1,
    );
    await desktopTabs.getByRole("tab", { name: /Shape work/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      desktopTabs.getByRole("tab", { selected: true }),
    ).toHaveAccessibleName(/Ship with the full story/);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    const triggers = page.locator("[data-slot=expandable-features-trigger]");
    await expect(triggers).toHaveCount(3);
    const first = triggers.first();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await triggers.nth(1).focus();
    await page.keyboard.press("Space");
    await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(
      page.getByRole("region", { name: /Shape work/ }),
    ).toContainText("Turn feedback into a named action");
  });

  test("auth shell presets provide sign-up and password-reset flows", async ({
    page,
  }) => {
    for (const slug of authShells) {
      await page.goto(`/preview/${slug}?composition=1`);
      const shell = page.locator("section").first();
      await expect(shell).toBeVisible();

      await page.getByRole("button", { name: signUpControl }).click();
      await expect(
        page.getByRole("button", { name: "Create account" }),
      ).toBeVisible();
      await page
        .getByRole("textbox", { name: "Email address" })
        .fill("reader@example.com");
      await page.getByPlaceholder("Enter your password").fill("new-password");
      await page
        .getByPlaceholder("Confirm your password")
        .fill("different-password");
      await page.getByRole("button", { name: "Create account" }).click();
      await expect(
        page.getByText("Passwords do not match", { exact: false }),
      ).toBeVisible();

      await page.getByRole("button", { name: "Sign in" }).click();
      await page.getByRole("button", { name: "Forgot password?" }).click();
      await expect(
        page.getByRole("button", { name: "Send reset link" }),
      ).toBeVisible();
      await page
        .getByRole("textbox", { name: "Email" })
        .fill("reader@example.com");
      await page.getByRole("button", { name: "Set new password" }).click();
      await page.locator("input[name=password]").fill("one");
      await page.locator("input[name=passwordConfirmation]").fill("two");
      await page.getByRole("button", { name: "Update password" }).click();
      await expect(
        page.getByText("Passwords do not match", { exact: false }),
      ).toBeVisible();
      await page.locator("input[name=passwordConfirmation]").fill("one");
      await page.getByRole("button", { name: "Update password" }).click();
      await expect(page.getByRole("status")).toContainText(
        "Demo complete. No password was changed.",
      );
    }
  });

  test("horizontal and vertical how-it-works blocks retain the numbered sequence", async ({
    page,
  }) => {
    for (const slug of ["how-it-works-horizontal", "how-it-works-vertical"]) {
      await page.goto(`/preview/${slug}`);
      const steps = page.locator(`[data-slot=${slug}-step]`);
      await expect(steps).toHaveCount(3);
      expect(
        await steps.evaluateAll((nodes) =>
          nodes.map((node) => node.textContent),
        ),
      ).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/^\s*01/),
          expect.stringMatching(/^\s*02/),
          expect.stringMatching(/^\s*03/),
        ]),
      );
      const positions = await steps.evaluateAll((nodes) =>
        nodes.map((node) => node.getBoundingClientRect()),
      );
      expect(positions[1].top).toBeGreaterThanOrEqual(positions[0].top);
      expect(positions[2].top).toBeGreaterThanOrEqual(positions[1].top);
    }
  });

  for (const [label, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ] as const) {
    test(`all new marketing presets render without overflow at ${label} size`, async ({
      page,
    }) => {
      const qaDirectory =
        process.env.MARKETING_QA_DIR ?? "test-results/marketing-qa";
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      mkdirSync(qaDirectory, { recursive: true });
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "reduce" });

      for (const slug of marketingBlocks) {
        await page.goto(`/preview/${slug}`);
        await expect(page.getByText("Example not found.")).toHaveCount(0);
        await expect(page.locator("[data-group]")).toHaveAttribute(
          "data-slug",
          slug,
        );
        await expect(page.getByText("Loading example…")).toHaveCount(0);
        await expect(
          page.locator("[data-group] section").first(),
        ).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          ),
          slug,
        ).toBeLessThanOrEqual(1);
        await page.screenshot({
          path: `${qaDirectory}/${label}-${slug}.png`,
          fullPage: true,
        });
        if (slug === "feature-carousel") {
          await page.goto(`/preview/${slug}?composition=1`);
          await expect(
            page
              .locator("[data-slot=feature-carousel-content]")
              .getByRole("button"),
          ).toHaveCount(3);
          await page.screenshot({
            path: `${qaDirectory}/${label}-${slug}-rail.png`,
            fullPage: true,
          });
        }
      }
      expect(pageErrors).toEqual([]);
    });
  }
});

test("embedded desktop preview keeps the expanding feature panels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/blocks/expandable-features");
  const frame = page.frameLocator(
    'iframe[title="expandable-features live preview"]',
  );
  const tabs = frame.getByRole("tablist", { name: "Feature details" });
  await expect(tabs).toBeVisible();
  await expect(tabs.getByRole("tab")).toHaveCount(3);
  await tabs.getByRole("tab").nth(1).click();
  await expect(tabs.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    frame.locator('[data-slot="expandable-features-trigger"]').first(),
  ).not.toBeVisible();
});

test("desktop preview fits the catalogue while device controls keep fixed widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/blocks/expandable-features");
  const preview = page.locator(
    'iframe[title="expandable-features live preview"]',
  );
  for (const [device, width] of [
    ["Tablet", 768],
    ["Mobile", 375],
  ] as const) {
    await page
      .getByRole("button", { name: `${device} preview`, exact: true })
      .click();
    await expect(preview).toHaveCSS("width", `${width}px`);
  }
  await page
    .getByRole("button", { name: "Desktop preview", exact: true })
    .click();
  await expect(preview).toHaveAttribute("style", /width: 100%/);
  const geometry = await preview.evaluate((frame) => {
    const stage = frame.parentElement!;
    return {
      fits: frame.clientWidth <= stage.clientWidth,
      overflow: stage.scrollWidth > stage.clientWidth,
      pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  expect(geometry.fits).toBe(true);
  expect(geometry.overflow).toBe(false);
  expect(geometry.pageOverflow).toBe(false);
});
