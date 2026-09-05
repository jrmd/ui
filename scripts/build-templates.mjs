import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { templateSpecs } from "./catalogue-data.mjs";
const root = process.cwd(),
  temp = fs.mkdtempSync(path.join(os.tmpdir(), "jez-ui-templates-"));
const results = [];
for (const t of templateSpecs) {
  console.log("Verifying standalone archive: " + t.slug);
  execFileSync("tar", [
    "-xzf",
    path.join(root, "apps/catalogue/public/downloads", t.slug + ".tar.gz"),
    "-C",
    temp,
  ]);
  const cwd = path.join(temp, t.slug);
  try {
    execFileSync("pnpm", ["install"], {
      cwd,
      stdio: "pipe",
      maxBuffer: 20 * 1024 * 1024,
    });
    execFileSync("pnpm", ["build"], {
      cwd,
      stdio: "pipe",
      maxBuffer: 20 * 1024 * 1024,
    });
    results.push({ slug: t.slug, status: "passed" });
    console.log("PASS " + t.slug);
  } catch (e) {
    console.error(e.stdout?.toString(), e.stderr?.toString());
    results.push({ slug: t.slug, status: "failed" });
    fs.writeFileSync(
      "docs/template-build-results.json",
      JSON.stringify(results, null, 2),
    );
    throw e;
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
}
fs.rmSync(temp, { recursive: true, force: true });
fs.writeFileSync(
  "docs/template-build-results.json",
  JSON.stringify(
    {
      verifiedAt: new Date().toISOString(),
      temporaryBuildsCleaned: true,
      results,
    },
    null,
    2,
  ),
);
console.log(
  `All ${templateSpecs.length} extracted archives build independently.`,
);
