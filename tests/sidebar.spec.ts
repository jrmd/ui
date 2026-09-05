import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("catalogue sidebar keeps its position through item navigation and reload", async ({
  page,
}) => {
  await page.goto("/components/button");
  const sidebar = page.getByRole("complementary", {
    name: "Catalogue navigation",
  });
  const tree = sidebar.getByRole("link", { name: "Tree View", exact: true });
  await tree.scrollIntoViewIfNeeded();
  const before = await sidebar.evaluate((el) => el.scrollTop);
  expect(before).toBeGreaterThan(500);
  await tree.click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tree View");
  await expect
    .poll(() => sidebar.evaluate((el) => el.scrollTop))
    .toBeCloseTo(before, 0);
  await sidebar.getByRole("link", { name: "Data Table", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Data Table",
  );
  const current = await sidebar.evaluate((el) => el.scrollTop);
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tree View");
  await expect
    .poll(() => sidebar.evaluate((el) => el.scrollTop))
    .toBeCloseTo(current, 0);
  await page.reload();
  await expect
    .poll(() => sidebar.evaluate((el) => el.scrollTop))
    .toBeCloseTo(current, 0);
});

test("button palette stays accessible in light and dark themes", async ({
  page,
}) => {
  for (const theme of ["light", "dark"]) {
    await page.goto(`/preview/button?theme=${theme}`);
    await expect(
      page.getByRole("button", { name: "Publish project" }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveClass(
      theme === "dark" ? /dark/ : /^$/,
    );
    const result = await new AxeBuilder({ page })
      .include(".demo-root")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
