import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { templateSpecs } from "./catalogue-data.mjs";
const require = createRequire(import.meta.url),
  pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
let text =
  "# Third-party notices\n\nOriginal Jez UI source is all rights reserved. Dependencies retain their respective licences.\n\n";
for (const name of Object.keys(pkg.dependencies)) {
  let file;
  try {
    file = require.resolve(name + "/package.json");
  } catch {
    let dir = path.dirname(require.resolve(name));
    while (!fs.existsSync(dir + "/package.json") && dir !== path.dirname(dir))
      dir = path.dirname(dir);
    file = dir + "/package.json";
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  text += `- ${name} ${data.version}: ${typeof data.license === "string" ? data.license : "See package licence"}\n`;
  const dir = path.dirname(file);
  const licence = fs
    .readdirSync(dir)
    .find((f) => /^licen[sc]e(?:\.|$)|^ofl/i.test(f));
  if (licence) {
    fs.mkdirSync("docs/licenses", { recursive: true });
    fs.copyFileSync(
      path.join(dir, licence),
      "docs/licenses/" + name.replaceAll("/", "-") + ".txt",
    );
  }
}
text +=
  "\n## Assets\n\nSpace Grotesk and Geist are bundled via Fontsource under the SIL Open Font License; full notices are in licenses/. Geometric SVG artwork was authored for Jez UI. studio-lamp.png and its Ink and Sand variants are original AI-generated fictional product still lifes, generated for this project on 2026-09-05; it is not a photograph of an actual product. Sample names, metrics, and quotes are fictional.\n";
fs.writeFileSync("THIRD_PARTY_NOTICES.md", text);
for (const t of templateSpecs) {
  fs.copyFileSync(
    "THIRD_PARTY_NOTICES.md",
    `templates/${t.slug}/THIRD_PARTY_NOTICES.md`,
  );
  fs.cpSync("docs/licenses", `templates/${t.slug}/licenses`, {
    recursive: true,
  });
}
console.log("Third-party notices and font licences collected.");
