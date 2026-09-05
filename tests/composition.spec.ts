import { test, expect } from "@playwright/test";
import items from "../packages/catalogue/items.json";
test("all twenty heroes expose their remaining text slots", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  test.setTimeout(120000);
  const heroes = items.filter((i) => i.slug.endsWith("-hero"));
  expect(heroes).toHaveLength(20);
  for (const item of heroes) {
    await page.goto("/blocks/" + item.slug);
    await page.getByRole("button", { name: "Customise this block" }).click();
    await page
      .getByRole("textbox", { name: "Heading", exact: true })
      .fill("Your own headline");
    const frame = page.frameLocator("iframe").first();
    await expect(frame.getByRole("heading", { level: 1 }).first()).toHaveText(
      "Your own headline",
    );
    for (const key of Object.keys(item.copyDefaults).filter(
      (k) => !["playLabel", "pauseLabel", "artworkLabel"].includes(k),
    )) {
      const input = page.getByRole("textbox", {
        name: key.replace(/([A-Z])/g, " $1"),
        exact: true,
      });
      await input.fill("Custom " + key);
      await expect(frame.locator("body")).toContainText("Custom " + key);
    }
  }
});
test("distortion wordmark changes in static and live rendering", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/blocks/distortion-hero");
  await page.getByRole("button", { name: "Customise this block" }).click();
  await page.getByRole("textbox", { name: "Artwork wordmark" }).fill("NORTH");
  const frame = page.frameLocator("iframe").first();
  await expect(frame.locator("[data-webgl-fallback] text")).toHaveText("NORTH");
  await page.locator("iframe").first().scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(frame.locator("canvas")).toBeVisible();
  await page.getByRole("textbox", { name: "Artwork wordmark" }).fill("STUDIO");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(frame.locator("[data-webgl-fallback] text")).toHaveText(
    "STUDIO",
  );
});
test("a copy slot can be removed and reset", async ({ page }) => {
  await page.goto("/blocks/eclipse-hero");
  await page.getByRole("button", { name: "Customise this block" }).click();
  const field = page.getByRole("textbox", { name: "brand", exact: true });
  await field.fill("North");
  await field.fill("");
  const frame = page.frameLocator("iframe").first();
  await expect(frame.getByText("UMBRA", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Reset customisation" }).click();
  await expect(frame.getByText("UMBRA", { exact: true })).toBeVisible();
});
test("sidebar composition supports groups, nested links and collapse", async ({
  page,
}) => {
  await page.goto("/preview/sidebar");
  const sidebar = page.getByRole("complementary", { name: "Navigation" });
  await expect(sidebar.getByRole("link")).toHaveCount(8);
  await expect(
    sidebar.getByRole("link", { name: "Design system" }),
  ).toHaveAttribute("href", "#design-system");
  await sidebar.getByRole("link", { name: "Design system" }).click();
  await expect(page).toHaveURL(/#design-system$/);
  await page.getByRole("button", { name: "Toggle sidebar" }).click();
  await expect(sidebar).toHaveAttribute("data-state", "collapsed");
  await page.getByRole("button", { name: "Toggle sidebar" }).click();
  await expect(sidebar.getByRole("link", { name: "Mobile app" })).toBeVisible();
});
test("mobile sidebar traps focus and restores the trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/sidebar");
  const trigger = page.getByRole("button", { name: "Toggle sidebar" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Team", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("Card parts supply their own layout without utility classes", async ({
  page,
}) => {
  await page.goto("/preview/card");
  const card = page.locator('[data-slot="card"]');
  await expect(
    card.getByRole("heading", { name: "A little room to think." }),
  ).toBeVisible();
  const layout = await card.evaluate((el) => {
    const header = el.querySelector('[data-slot="card-header"]')!,
      footer = el.querySelector('[data-slot="card-footer"]')!,
      content = el.querySelector('[data-slot="card-content"]')!;
    return {
      padding: getComputedStyle(el).padding,
      header: getComputedStyle(header).display,
      footer: getComputedStyle(footer).display,
      gap: getComputedStyle(footer).gap,
      contentAboveFooter:
        content.getBoundingClientRect().bottom <=
        footer.getBoundingClientRect().top,
    };
  });
  expect(layout).toMatchObject({
    header: "grid",
    footer: "flex",
    contentAboveFooter: true,
  });
  expect(parseFloat(layout.padding)).toBeGreaterThan(0);
  expect(parseFloat(layout.gap)).toBeGreaterThan(0);
  await card.getByLabel("Project name").fill("North studio");
  await card.getByRole("button", { name: "Create project" }).click();
  await expect(page.getByRole("status")).toHaveText("Project created.");
});
test("composed tabs and select retain keyboard behaviour", async ({ page }) => {
  await page.goto("/preview/tabs");
  await page.getByRole("tab", { name: "Design", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Build", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Give a good idea");
  await page.goto("/preview/select");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Engineering", exact: true }).click();
  await expect(page.getByRole("combobox")).toHaveText("Engineering");
});
test("composed dialog labels fields and returns focus", async ({ page }) => {
  await page.goto("/preview/dialog");
  const trigger = page.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Make it yours." });
  await expect(dialog.getByLabel("Project name")).toBeFocused();
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(trigger).toBeFocused();
});

test("composed menus support checkbox state and nested actions", async ({
  page,
}) => {
  await page.goto("/preview/dropdown-menu");
  const trigger = page.getByRole("button", { name: "Project actions" });
  await trigger.click();
  await expect(page.getByRole("menuitemcheckbox")).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await page.getByRole("menuitemcheckbox").click();
  await trigger.click();
  await expect(page.getByRole("menuitemcheckbox")).toHaveAttribute(
    "aria-checked",
    "false",
  );
  await page.getByRole("menuitem", { name: "Move to" }).hover();
  await page.getByRole("menuitem", { name: "Personal", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Moved to Personal.");
});
test("three composed panels resize independently with the keyboard", async ({
  page,
}) => {
  await page.goto("/preview/resizable-panels");
  const first = page.getByRole("separator", { name: "Resize navigation" }),
    second = page.getByRole("separator", { name: "Resize inspector" });
  await expect(first).toHaveAttribute("aria-valuenow", "25");
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(first).toHaveAttribute("aria-valuenow", "30");
  await expect(second).toHaveAttribute("aria-valuenow", "45");
  await second.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(second).toHaveAttribute("aria-valuenow", "40");
  await expect(first).toHaveAttribute("aria-valuenow", "30");
});
