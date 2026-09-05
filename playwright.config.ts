import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testIgnore: /composability-contract\.spec\.ts/,
  timeout: 45000,
  expect: { timeout: 8000 },
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
        },
      },
    },
    {
      name: "firefox",
      testMatch: /journeys\.spec\.ts/,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testMatch: /journeys\.spec\.ts/,
      use: {
        ...devices["Desktop Safari"],
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_WEBKIT_EXECUTABLE_PATH,
        },
      },
    },
  ],
});
