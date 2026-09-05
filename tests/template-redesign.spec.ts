import { test, expect } from "@playwright/test";
import fs from "node:fs";

test("store categories, multiple products and cart totals stay coherent", async ({
  page,
}) => {
  await page.goto("/templates/storefront/preview/collection?category=Objects");
  await expect(
    page.getByRole("button", { name: "Objects", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".objects-product-card")).toHaveCount(1);
  await page.locator(".objects-product-card").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Form vase.",
  );
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.goto("/templates/storefront/preview/product/linen-throw");
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.getByRole("link", { name: "View bag", exact: true }).click();
  await expect(page.locator(".objects-cart-row")).toHaveCount(2);
  await expect(page.locator(".objects-total")).toContainText("£133");
  await page.reload();
  await expect(page.locator(".objects-total")).toContainText("£133");
  await page.getByRole("button", { name: "Remove Form vase Chalk" }).click();
  await expect(page.locator(".objects-total")).toContainText("£85");
  await page.goto("/templates/storefront/preview/collection");
  await page
    .getByRole("textbox", { name: "Filter products" })
    .fill("no matching product");
  await expect(
    page.getByRole("heading", { name: "No pieces found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".objects-product-card")).toHaveCount(5);
  await page
    .getByRole("combobox", { name: "Sort products" })
    .selectOption("price-low");
  await expect(page.locator(".objects-product-card").first()).toContainText(
    "Form vase",
  );
});

test("portfolio navigation and case-study links work on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/templates/portfolio/preview");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Curiousby default.",
  );
  await page.goto("/templates/portfolio/preview");
  await page.locator(".rivers-project-card").first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Field notes",
  );
  await page.locator(".rivers-next").click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Frequency");
});

test("template visual evidence at desktop, user and mobile widths", async ({
  page,
}) => {
  test.setTimeout(90000);
  fs.mkdirSync(".impeccable/review/template-rebuild", { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 1149, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of ["portfolio", "storefront"]) {
      await page.goto(`/templates/${slug}/preview`);
      await expect(
        page.locator(
          slug === "portfolio" ? ".rivers-portfolio" : ".objects-store",
        ),
      ).toBeVisible();
      if (slug === "portfolio") {
        await expect(page.locator(".rivers-frequency img")).toHaveCSS(
          "object-fit",
          "contain",
        );
      }
      await page.addStyleTag({
        content: "nextjs-portal { display: none !important; }",
      });
      await page.evaluate(async () => {
        document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
        await document.fonts.ready;
      });
      await page.waitForFunction(() =>
        Array.from(document.images).every(
          (i) => i.complete && i.naturalWidth > 0,
        ),
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await page.screenshot({
        path: `.impeccable/review/template-rebuild/${slug}-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `.impeccable/review/template-rebuild/${slug}-${width}-top.png`,
      });
    }
  }
});
