import { test, expect } from "@playwright/test";
test("sheet has an entrance animation", async ({ page }) => {
  await page.goto("/preview/sheet");
  await page.getByRole("button", { name: "Open details" }).click();
  const animated = await page.getByRole("dialog").evaluate((el) => {
    const s = getComputedStyle(el);
    return s.animationName !== "none" || parseFloat(s.transitionDuration) > 0;
  });
  expect(animated).toBe(true);
});
test("scramble preserves its text geometry", async ({ page }) => {
  await page.goto("/preview/scramble-text");
  const target = page.locator(".demo-root").locator("span").first();
  const box = await target.boundingBox();
  await target.hover();
  const widths: number[] = [];
  for (let i = 0; i < 12; i++) {
    const b = await target.boundingBox();
    widths.push(b!.width);
    await page.waitForTimeout(35);
  }
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
  expect(box).not.toBeNull();
});
test("file upload hides native filename chrome", async ({ page }) => {
  await page.goto("/preview/file-upload");
  const input = page.locator("input[type=file]");
  expect(
    await input.evaluate((el) => el.getBoundingClientRect().width),
  ).toBeLessThanOrEqual(1);
});

test("controls retain their intended font size and switch geometry", async ({
  page,
}) => {
  await page.goto("/preview/input");
  await expect(
    page.getByRole("textbox", { name: "Workspace slug" }),
  ).toBeVisible();
  expect(
    await page
      .getByRole("textbox", { name: "Workspace slug" })
      .evaluate((el) => getComputedStyle(el).fontSize),
  ).toBe("14px");
  await page.goto("/preview/switch");
  const control = page.getByRole("switch").first();
  const check = async () =>
    control.evaluate((el) => {
      const a = el.getBoundingClientRect();
      const b = el.firstElementChild!.getBoundingClientRect();
      return Math.abs(a.y + a.height / 2 - b.y - b.height / 2);
    });
  expect(await check()).toBeLessThan(0.6);
  await control.click();
  expect(await check()).toBeLessThan(0.6);
});
test("command palette selects with arrows and returns focus", async ({
  page,
}) => {
  await page.goto("/preview/command-palette");
  const trigger = page.getByRole("button", { name: /Search commands/ });
  await trigger.click();
  const input = page.getByRole("combobox", { name: "Search commands" });
  await expect(input).toBeFocused();
  await input.fill("");
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Team search selected.");
  await expect(trigger).toBeFocused();
});
test("date picker stays inside its catalogue preview", async ({ page }) => {
  await page.goto("/components/date-picker");
  const frame = page.frameLocator("iframe").first();
  await frame
    .getByRole("button", { name: /Choose date|Pick a date|September/ })
    .first()
    .click();
  const calendar = frame.getByRole("dialog");
  await expect(calendar).toBeVisible();
  const bounds = await calendar.evaluate((el) => {
    const box = el.getBoundingClientRect();
    return {
      top: box.top,
      bottom: box.bottom,
      height: window.innerHeight,
      left: box.left,
      right: box.right,
      width: window.innerWidth,
    };
  });
  expect(bounds.top).toBeGreaterThanOrEqual(0);
  expect(bounds.bottom).toBeLessThanOrEqual(bounds.height);
  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(bounds.width);
});
test("kanban drag handles move tasks into another column", async ({ page }) => {
  await page.goto("/preview/kanban-board");
  const title = "Explore homepage directions";
  await page
    .getByRole("button", { name: `Drag ${title}` })
    .dragTo(page.getByRole("region", { name: "Done", exact: true }));
  await expect(
    page.getByRole("combobox", { name: `Status for ${title}` }),
  ).toHaveValue("Done");
  await page.reload();
  await expect(
    page
      .getByRole("region", { name: "Done", exact: true })
      .getByRole("textbox", { name: `Edit task ${title}` }),
  ).toBeVisible();
});
test("wizard keeps workspace data when moving backwards", async ({ page }) => {
  await page.goto("/preview/onboarding-wizard");
  await page.getByRole("textbox", { name: "Your name" }).fill("Alex");
  await page.getByRole("button", { name: "Continue" }).click();
  await page
    .getByRole("textbox", { name: "Workspace name" })
    .fill("Field Studio");
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(
    page.getByRole("textbox", { name: "Workspace name" }),
  ).toHaveValue("Field Studio");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Field Studio", { exact: true })).toBeVisible();
});
test("progress can pause and reset without jumping", async ({ page }) => {
  await page.goto("/preview/progress");
  await page.getByRole("button", { name: "Start export" }).click();
  await expect(page.getByRole("progressbar")).not.toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  const paused = await page
    .getByRole("progressbar")
    .getAttribute("aria-valuenow");
  await page.waitForTimeout(500);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    paused!,
  );
  await page.getByRole("button", { name: "Reset progress" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
});

test("table selection and column controls work", async ({ page }) => {
  await page.goto("/preview/data-table");
  await page
    .getByRole("checkbox", { name: "Select row 1", exact: true })
    .check();
  await expect(page.getByText(/1 selected/)).toBeVisible();
  await page.getByRole("button", { name: "Choose visible columns" }).click();
  await page
    .getByRole("dialog")
    .getByRole("checkbox", { name: "Status", exact: true })
    .uncheck();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("columnheader", { name: /Status/ })).toHaveCount(
    0,
  );
});
test("combobox filters options and selects with the keyboard", async ({
  page,
}) => {
  await page.goto("/preview/combobox");
  await page.getByRole("button", { name: "Choose framework" }).click();
  const search = page.getByRole("combobox");
  await search.fill("Ast");
  await search.press("Enter");
  await expect(
    page.getByRole("button", { name: "Choose framework" }),
  ).toContainText("Astro");
});
test("date picker fits a mobile preview", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/components/date-picker");
  const frame = page.frameLocator("iframe").first();
  await frame.getByRole("button", { name: "Choose date" }).click();
  const panel = frame.getByRole("dialog");
  await expect(panel).toBeVisible();
  const b = await panel.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.x,
      right: r.right,
      bottom: r.bottom,
      w: innerWidth,
      h: innerHeight,
    };
  });
  expect(b.x).toBeGreaterThanOrEqual(0);
  expect(b.right).toBeLessThanOrEqual(b.w);
  expect(b.bottom).toBeLessThanOrEqual(b.h);
});
test("mega navigation exposes links on desktop and mobile", async ({
  page,
}) => {
  await page.goto("/preview/mega-navigation");
  await page.getByRole("button", { name: "Explore" }).click();
  await expect(page.getByRole("link", { name: /Small details/ })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link"),
  ).toHaveCount(3);
});
