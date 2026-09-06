import { test, expect } from "@playwright/test";
import items from "../packages/catalogue/items.json";
const fixture = process.env.COMPOSITION_FIXTURE_URL ?? "http://127.0.0.1:4175";
for (const width of [1440, 390]) {
  test(`all registered composed block recipes render at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(240_000);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${fixture}/?mode=recipe`);
    for (const item of items.filter((item) => item.kind === "block")) {
      await page.getByLabel("Block recipe").selectOption(item.slug);
      await expect(page.getByTestId("recipe"), item.slug).toHaveAttribute(
        "data-recipe",
        item.slug,
      );
      await expect(page.getByTestId("recipe"), item.slug).not.toBeEmpty();
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth), {
          message: `${item.slug} overflows at ${width}px`,
        })
        .toBeLessThanOrEqual(width);
      expect(errors, item.slug).toEqual([]);
    }
  });
}
test("composed block parts retain behavior when reordered and given custom content", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(fixture + "/?mode=compound");
  await expect(page.getByRole("region", { name: /Explore/ })).toHaveText(
    "A space for early ideas.",
  );
  const publish = page.getByRole("button", { name: /Publish Put/ });
  await publish.focus();
  await page.keyboard.press("Enter");
  await expect(publish).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("region", { name: /Publish/ })).toHaveText(
    "Share a finished project with your team.",
  );
  await expect(page.getByText("A space for early ideas.")).toHaveCount(0);
  const price = page.locator('[data-slot="pricing-table-price"]');
  await expect(price).toContainText("$12");
  await page.getByRole("switch", { name: "Pay annually" }).click();
  await expect(price).toContainText("$9");
  await expect(price).toContainText("$108 billed annually");
  await page
    .getByRole("checkbox", { name: "Complete Publish the story" })
    .click();
  const tasks = page.locator('[data-slot="task-list-item"]');
  await expect(tasks.nth(1)).toContainText("Done");
  await expect(tasks.nth(0)).toContainText("To do");
  await expect(
    page.getByRole("link", { name: "Read our story" }),
  ).toHaveAttribute("data-slot", "media-aside-action");
  await expect(
    page.getByRole("link", { name: "Visit the workshop" }),
  ).toHaveAttribute("href", "#contact");
  expect(errors).toEqual([]);
});

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

test("onboarding delivers the collected values to the caller", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=onboarding");
  await page.getByRole("textbox", { name: "Your name" }).fill("Avery");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Workspace name" })
    .fill("Our workspace");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator("output")).toHaveText("Our workspace");
});

test("composed workspace sections share edits, actions and status", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=recipe&slug=kanban-board");
  await page
    .getByRole("textbox", { name: "New task title" })
    .fill("Composed task");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Edit task Composed task" }),
  ).toHaveValue("Composed task");
  await page
    .getByRole("combobox", { name: "Status for Composed task" })
    .selectOption("Done");
  await expect(page.getByRole("status")).toContainText(
    "Composed task moved to Done",
  );
  await page.getByLabel("Block recipe").selectOption("profile-settings");
  await page
    .getByRole("textbox", { name: "Name", exact: true })
    .fill("Morgan Example");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Changes kept in this preview",
  );
  await page.getByLabel("Block recipe").selectOption("team-management");
  await page
    .getByRole("textbox", { name: "Invite email" })
    .fill("new@example.com");
  await page.getByRole("button", { name: "Invite", exact: true }).click();
  await expect(
    page.getByRole("combobox", { name: "Role for new@example.com" }),
  ).toHaveValue("Invited");
  await page.getByLabel("Block recipe").selectOption("notification-centre");
  await page.getByRole("button", { name: "Mark all read" }).click();
  await page.getByRole("button", { name: "Unread", exact: true }).click();
  await expect(page.getByText("You’re all caught up.")).toBeVisible();
});

test("composed menus, carousel and artwork controls stay connected", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(fixture + "/?mode=recipe&slug=user-switcher");
  await page.getByRole("button", { name: /^Account:/ }).click();
  const accounts = page.getByRole("menuitemradio");
  const accountName = await accounts.nth(1).innerText();
  await accounts.nth(1).click();
  await expect(page.getByRole("button", { name: /^Account:/ })).toContainText(
    accountName.split("\n")[0],
  );
  await page.getByLabel("Block recipe").selectOption("organization-switcher");
  await page.getByRole("button", { name: /^Workspace:/ }).click();
  await page.getByRole("menuitemradio").nth(1).click();
  await expect(page.getByRole("menuitemradio")).toHaveCount(0);
  await page.getByLabel("Block recipe").selectOption("testimonial-carousel");
  await page.getByRole("button", { name: "Next quote" }).click();
  await expect(
    page.getByRole("button", { name: "Go to story 2" }),
  ).toHaveAttribute("aria-current", "true");
  await page.getByLabel("Block recipe").selectOption("terrain-hero");
  const pause = page.getByRole("button", { name: "Pause terrain" });
  await pause.click();
  await expect(
    page.getByRole("button", { name: "Play terrain" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("composed authentication and chat forms retain submission behavior", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=recipe&slug=sign-in-form");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("person@example.com");
  await page.getByLabel("Password", { exact: true }).fill("example-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Demo complete");
  await page.getByLabel("Block recipe").selectOption("chat-workspace");
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("A composed question");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(
    page.getByText("Your provider response to: A composed question"),
  ).toBeVisible();
});

for (const slug of ["workspace-sidebar", "rail-sidebar", "inset-sidebar"]) {
  test(`${slug} composition preserves mobile focus and navigation`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${fixture}/?mode=recipe&slug=${slug}`);
    await page.getByRole("button", { name: "Toggle sidebar" }).click();
    await expect(
      page.getByRole("link", { name: "Work", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Toggle sidebar" }),
    ).toBeFocused();
  });
}

test("child composition preserves nested providers and router link semantics", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=recipe&slug=faq");
  await page
    .getByRole("button", { name: "Can I choose my own content?" })
    .click();
  await expect(
    page.getByText(
      "Yes. The sections keep their behavior when you supply your own content.",
    ),
  ).toBeVisible();
  await page.getByLabel("Block recipe").selectOption("marketing-navigation");
  await expect(page.getByRole("link", { name: "Our studio" })).toHaveAttribute(
    "href",
    "#home",
  );
  await expect(page.getByRole("link", { name: "Our work" })).toHaveAttribute(
    "href",
    "#work",
  );
});

test("functional sections preserve callback observers, render functions and cancelled events", async ({
  page,
}) => {
  await page.goto(fixture + "/?mode=slots");
  await page.getByRole("button", { name: /Tuesday.*2 February.*2027/ }).click();
  await expect(page.getByLabel("Observed date")).toHaveText("2027-02-02");
  await expect(page.getByText("Connected appointment")).toBeVisible();
  await expect(page.getByText(/records from the shared table/)).toBeVisible();
  await expect(page.locator("form")).toHaveAttribute(
    "data-ref-connected",
    "true",
  );
  await page
    .getByRole("textbox", { name: "New task title" })
    .fill("Cancelled task");
  await page.getByRole("button", { name: "Add task", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Edit task Cancelled task" }),
  ).toHaveCount(0);
});
