import { test, expect } from "@playwright/test";
import items from "../packages/catalogue/items.json";
const blockCount = items.filter(item => item.kind === "block").length;
test("hero edits update the live preview, code, and reset", async ({
  page,
}) => {
  await page.goto("/blocks/eclipse-hero");
  await page.getByRole("button", { name: "Customise this block" }).click();
  await page
    .getByRole("textbox", { name: "Heading", exact: true })
    .fill("A different perspective.");
  await page
    .getByRole("textbox", { name: "Button label", exact: true })
    .fill("Discover Umbra");
  const frame = page.frameLocator("iframe").first();
  await expect(frame.getByRole("heading", { level: 1 })).toHaveText(
    "A different perspective.",
  );
  await expect(
    frame.getByRole("link", { name: "Discover Umbra" }),
  ).toBeVisible();
  await page.getByText("Customised JSX", { exact: true }).click();
  await expect(page.locator(".preview-box pre")).toContainText(
    '"title": "A different perspective."',
  );
  await page.getByRole("button", { name: "Dark preview" }).click();
  await expect(frame.getByRole("heading", { level: 1 })).toHaveText(
    "A different perspective.",
  );
  await page.getByRole("button", { name: "Reset customisation" }).click();
  await expect(frame.getByRole("heading", { level: 1 })).toContainText(
    "Beyond",
  );
});
test("login branding and copy are editable", async ({ page }) => {
  await page.goto("/blocks/split-login");
  await page.getByRole("button", { name: "Customise this block" }).click();
  await page
    .getByRole("textbox", { name: "Brand", exact: true })
    .fill("North Studio");
  await page
    .getByRole("textbox", { name: "Heading", exact: true })
    .fill("Your next chapter");
  const frame = page.frameLocator("iframe").first();
  await expect(frame.getByRole("heading", { level: 1 })).toHaveText(
    "Your next chapter",
  );
  await expect(frame.getByText("North Studio").first()).toBeVisible();
});
test("block sidebar and gallery share collections without losing entries", async ({
  page,
}) => {
  await page.goto("/blocks/workspace-sidebar");
  const sidebar = page.getByRole("complementary", {
    name: "Catalogue navigation",
  });
  await expect(
    sidebar.getByRole("heading", { name: "heroes", exact: true }),
  ).toBeVisible();
  await expect(sidebar.getByRole("link")).toHaveCount(blockCount);
  await page.goto("/blocks?category=authentication");
  await expect(page.getByText(`Showing 9 of ${blockCount}`)).toBeVisible();
});
