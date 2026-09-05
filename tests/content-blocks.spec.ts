import { test, expect } from "@playwright/test";
test("pricing updates billing, seat totals, and selection", async ({
  page,
}) => {
  await page.goto("/preview/plan-comparison");
  await page.getByRole("button", { name: "Annual", exact: true }).click();
  await expect(page.getByText("£180", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Choose Team" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Team selected. Demo only",
  );
  await page.goto("/preview/usage-pricing");
  await page.getByRole("slider", { name: "Team size" }).fill("25");
  await expect(page.getByText("Workspace saves £60 per month.")).toBeVisible();
  await page.getByRole("button", { name: "Choose Workspace" }).click();
  await expect(page.getByRole("status")).toContainText("25 people");
});
for (const slug of ["immersive-login", "ribbon-login", "editorial-login"]) {
  test(`${slug} submits with honest demo state`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/preview/${slug}`);
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill("reader@example.com");
    await page.getByPlaceholder("Enter your password").fill("demo-password");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("status")).toContainText("Demo only");
  });
}
test("newsletter footer submits and feature matrix scrolls on mobile", async ({
  page,
}) => {
  await page.goto("/preview/newsletter-footer");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("reader@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await expect(page.getByRole("status")).toContainText("No email was sent");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/preview/feature-comparison");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const region = page.getByRole("region", { name: "Plan features" });
  expect(await region.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(
    true,
  );
});
