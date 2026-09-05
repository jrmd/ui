import { test, expect } from "@playwright/test";
import items from "../packages/catalogue/items.json";
const fixture = process.env.COMPOSITION_FIXTURE_URL ?? "http://127.0.0.1:4175";
test("every block accepts caller content, native attributes, refs and styles", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(fixture + "/?mode=blocks");
  for (const item of items.filter((item) => item.kind === "block")) {
    const root = page.getByTestId(item.slug);
    await expect(root).toContainText(`Owned ${item.slug}`);
    await expect(root).toHaveAttribute("id", item.slug);
    await expect(root).toHaveAttribute("aria-label", `Owned ${item.slug}`);
    await expect(root).toHaveAttribute("data-ref-connected", "true");
    await expect(root).toHaveCSS("outline-offset", "7px");
    await expect(root).toHaveCSS("padding-top", "8px");
  }
  expect(errors).toEqual([]);
});
test("caller state is replaceable and separate instances remain independent", async ({
  page,
}) => {
  await page.goto(fixture);
  const controlled = page.getByTestId("controlled");
  await controlled.getByRole("checkbox").click();
  await expect(controlled.getByRole("checkbox")).toBeChecked();
  await expect(
    page.getByTestId("independent").getByRole("checkbox"),
  ).not.toBeChecked();
  await page.getByRole("button", { name: "Replace tasks" }).click();
  await expect(controlled).toContainText("Replaced externally");
});
test("forwarded search ref preserves clear focus and input styling targets the input", async ({
  page,
}) => {
  await page.goto(fixture);
  const input = page.getByRole("searchbox");
  await expect(input).toHaveCSS("height", "48px");
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(input).toHaveValue("");
  await expect(input).toBeFocused();
  await expect(page.getByLabel("Custom password")).toHaveCSS("height", "48px");
});
test("table slots work and selection follows record identity across reorder", async ({
  page,
}) => {
  await page.goto(fixture);
  await page
    .getByRole("checkbox", { name: "Select row 1", exact: true })
    .click();
  await expect(page.getByLabel("Selected IDs")).toHaveText("a");
  await page.getByRole("button", { name: "Reverse records" }).click();
  await expect(page.getByLabel("Selected IDs")).toHaveText("a");
  await expect(
    page.getByRole("checkbox", { name: "Select row 2", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Custom filter" }).click();
  await expect(page.getByText("Caller empty state")).toBeVisible();
  await expect(page.getByText("0 custom rows")).toBeVisible();
});
test("pricing, matrix and calendar use caller content", async ({ page }) => {
  await page.goto(fixture);
  await expect(page.getByRole("link", { name: "Buy Custom" })).toBeVisible();
  await expect(page.getByText("Rich feature")).toBeVisible();
  await page.getByRole("switch").click();
  await expect(page.getByText("$5", { exact: false }).first()).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Three $12" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Choose Three" }),
  ).toBeVisible();
  await expect(page.getByText("Our own event")).toBeVisible();
});
test("failed save remains an error until a successful caller action", async ({
  page,
}) => {
  await page.goto(fixture);
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByRole("alert")).toHaveText("Save rejected");
  await expect(page.getByText("Changes saved.")).toHaveCount(0);
  await page.getByRole("button", { name: "Allow save" }).click();
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByText("Changes saved.")).toBeVisible();
});
test("chat calls the supplied provider", async ({ page }) => {
  await page.goto(fixture);
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Hello");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.getByText("Own provider: Hello")).toBeVisible();
});

test("native handlers compose with built-in behavior and tree refs reach the root", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=native");
  await expect(page.getByRole("tree")).toHaveAttribute(
    "data-ref-connected",
    "true",
  );
  await page.getByText("Click surface").click();
  await expect(page.getByText("pointer delivered")).toBeVisible();
  await page.getByRole("button", { name: "Custom submit" }).click();
  await expect(page.getByText("submit delivered")).toBeVisible();
});

test("composed blocks contain their overflow in a narrow grid", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fixture);
  await expect(
    page.getByRole("heading", { name: "Consumer composition" }),
  ).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});

test("onboarding delivers the collected values to the caller", async ({ page }) => {
  await page.goto(fixture + "/?mode=onboarding");
  await page.getByRole("textbox", {name:"Your name"}).fill("Avery");
  await page.getByRole("button", {name:"Continue",exact:true}).click();
  await page.getByRole("textbox", {name:"Workspace name"}).fill("Our workspace");
  await page.getByRole("button", {name:"Continue",exact:true}).click();
  await expect(page.locator("output")).toHaveText("Our workspace");
});
