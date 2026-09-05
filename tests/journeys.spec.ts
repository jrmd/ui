import { test, expect } from "@playwright/test";
test("dialog traps focus and returns to trigger", async ({ page }) => {
  await page.goto("/preview/dialog");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: "Open dialog" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("textbox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger).toBeFocused();
});
test("table searches and sorts meaningful records", async ({ page }) => {
  await page.goto("/preview/data-table");
  await page.waitForLoadState("networkidle");
  await page.getByRole("searchbox", { name: "Search Records" }).fill("Field");
  await expect(page.getByRole("cell", { name: "Field notes" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Little things" })).toBeHidden();
  await page.getByRole("searchbox").fill("");
  await page.getByRole("button", { name: /Tasks/ }).click();
  await expect(page.locator("tbody tr").first()).toContainText("Little things");
});
test("upload rejects oversized files and accepts valid files", async ({
  page,
}) => {
  await page.goto("/preview/file-upload");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Choose files").setInputFiles({
    name: "large.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.alloc(6 * 1024 * 1024),
  });
  await expect(page.locator("p[role=alert]")).toContainText("under 5 MB");
  await page.getByLabel("Choose files").setInputFiles({
    name: "notes.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("demo"),
  });
  await expect(
    page.getByRole("button", { name: "Remove notes.pdf" }),
  ).toBeVisible();
});
test("calendar month navigation and selection", async ({ page }) => {
  await page.goto("/preview/calendar");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Next month" }).click();
  await expect(page.getByText("October 2026")).toBeVisible();
  await page.getByRole("button", { name: /Thursday,? 1 October 2026/ }).click();
  await expect(
    page.getByRole("button", { name: /Thursday,? 1 October 2026/ }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("task creation, editing, status and persistence", async ({ page }) => {
  await page.goto("/templates/projects/preview/board");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("New task title").fill("Ship the real thing");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  await page.getByLabel("Status for Ship the real thing").selectOption("Done");
  await page.reload();
  await expect(page.getByLabel("Status for Ship the real thing")).toHaveValue(
    "Done",
  );
  await page
    .getByLabel("Edit task Ship the real thing")
    .fill("Ship a better thing");
  await expect(page.getByLabel("Status for Ship a better thing")).toBeVisible();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByLabel("Status for Ship a better thing")).toBeHidden();
});
test("chat stream can stop, retry, persist and reset", async ({ page }) => {
  await page.goto("/templates/ai-chat/preview/conversation/demo");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Message", { exact: true }).fill("Plan a launch");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Stop response" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Stop response" }).click();
  await page.getByRole("button", { name: "Retry response" }).click();
  await expect(page.getByRole("log")).toContainText(
    "when the work is finished?",
    {
      timeout: 15000,
    },
  );
  await page.reload();
  await expect(page.getByRole("log")).toContainText("Plan a launch");
  await page.getByRole("button", { name: "New conversation" }).click();
  await expect(page.getByRole("log")).not.toContainText("Plan a launch");
});
test("storefront selection, cart persistence and checkout validation", async ({
  page,
}) => {
  await page.goto("/templates/storefront/preview/product/studio-lamp");
  await page.waitForLoadState("networkidle");
  await page.getByRole("combobox", { name: "Finish" }).selectOption("Ink");
  await page.getByLabel("Quantity", { exact: true }).fill("2");
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.getByRole("link", { name: "View bag" }).click();
  await expect(page.getByLabel("Quantity Ink")).toHaveValue("2");
  await page.reload();
  await expect(page.locator(".objects-total")).toContainText("£290");
  await page.getByRole("link", { name: /Continue to demo checkout/ }).click();
  await page.getByRole("button", { name: "Complete demo" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByLabel("Full name").fill("Alex Morgan");
  await page.getByLabel("Delivery address").fill("12 Example Road");
  await page.getByLabel("Postcode").fill("NE1 1AA");
  await page.getByRole("button", { name: "Complete demo" }).click();
  await expect(page.getByRole("status")).toContainText("no order was placed");
});
test("reports filter and export real CSV data", async ({ page }) => {
  await page.goto("/templates/analytics/preview/reports");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("From", { exact: true }).fill("2026-09-01");
  await expect(
    page.getByRole("cell", { name: "August overview" }),
  ).toBeHidden();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Export CSV/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("metric-report.csv");
  const stream = await download.createReadStream();
  let text = "";
  for await (const chunk of stream!) text += chunk;
  expect(text).toContain("Weekly performance");
  expect(text).not.toContain("August overview");
});
