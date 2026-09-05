import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  ...base,
  testMatch: /composability-contract\.spec\.ts/,
  testIgnore: [],
  outputDir: "test-results-composition",
  projects: base.projects?.filter((project) => project.name === "chromium"),
  webServer: {
    command:
      "pnpm exec vite fixtures/composition --config fixtures/composition/vite.config.ts",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: !process.env.CI,
  },
});
