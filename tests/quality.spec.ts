import { test, expect } from "@playwright/test";

test("project preview keeps task state and timeline dates across filters", async ({
  page,
}) => {
  await page.goto("/preview/product-demo-hero");
  await page
    .getByRole("button", {
      name: "Complete Build the project switcher",
      exact: true,
    })
    .click();
  await expect(page.getByText("2 of 5 complete")).toBeVisible();
  await page.getByRole("button", { name: "Timeline", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search project tasks" })
    .fill("release notes");
  await expect(page.getByLabel("Due Sep 11")).toBeVisible();
  await page
    .getByRole("button", { name: "Open Write the release notes", exact: true })
    .click();
  await expect(
    page.getByRole("region", { name: "Task details" }),
  ).toContainText("Include a short migration note");
  await page
    .getByRole("textbox", { name: "Search project tasks" })
    .fill("no matching task");
  await expect(page.getByText("No tasks match this view.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(
    page.getByRole("button", { name: "Reopen Build the project switcher" }),
  ).toBeVisible();
});

test("workspace navigation searches, collapses, and identifies the current page", async ({
  page,
}) => {
  await page.goto("/templates/projects/preview/board");
  await expect(
    page
      .getByRole("navigation", { name: "Workspace" })
      .getByRole("link", { name: "Board", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("textbox", { name: "Find a page" }).fill("team");
  await expect(
    page.getByRole("navigation", { name: "Workspace" }).getByRole("link"),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Workspace" })
      .getByRole("link", { name: "Board", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand sidebar" }).click();
  await expect(page.getByRole("textbox", { name: "Find a page" })).toHaveValue(
    "team",
  );
});

test("agency and portfolio projects have distinct case studies", async ({
  page,
}) => {
  for (const [url, heading] of [
    ["/templates/agency/preview/work/new-frequencies", "New Frequencies"],
    ["/templates/agency/preview/work/common-ground", "Common Ground"],
    ["/templates/portfolio/preview/projects/frequency", "Frequency"],
    ["/templates/portfolio/preview/projects/common-ground", "Common ground"],
  ]) {
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  }
});
