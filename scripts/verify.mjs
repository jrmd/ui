import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import Ajv from "ajv";
import { templateSpecs } from "./catalogue-data.mjs";
const items = JSON.parse(
  fs.readFileSync("apps/catalogue/generated/catalogue.json", "utf8"),
);
assert.equal(items.filter((i) => i.kind === "component").length, 91);
assert.equal(items.filter((i) => i.kind === "block").length, 67);
assert.equal(new Set(items.map((i) => i.slug)).size, 158);
assert.equal(templateSpecs.length, 8);
const ajv = new Ajv({ strict: false, allErrors: true });
const schema = JSON.parse(
  fs.readFileSync("docs/schemas/registry-item.json", "utf8"),
);
schema.$schema = "http://json-schema.org/draft-07/schema#";
const validate = ajv.compile(schema);
for (const item of items) {
  assert.ok(
    item.description && item.props && item.example && item.accessibility,
  );
  const reg = JSON.parse(
    fs.readFileSync(`apps/catalogue/public/r/${item.slug}.json`, "utf8"),
  );
  assert.ok(validate(reg), `${item.slug}: ${JSON.stringify(validate.errors)}`);
  assert.ok(reg.files.length > 0);
  for (const f of reg.files) {
    assert.equal(f.content, fs.readFileSync(f.path, "utf8"));
    if (f.path.startsWith("assets/"))
      assert.equal(f.target, "public/" + f.path);
    assert.ok(!f.content.includes("TODO"), "Unfinished source " + f.path);
    for (const [, ref] of f.content.matchAll(/from ['"](\.[^'"]+)['"]/g)) {
      const resolved = path.normalize(path.join(path.dirname(f.path), ref));
      assert.ok(
        reg.files.some(
          (x) => x.path === resolved + ".tsx" || x.path === resolved + ".ts",
        ),
        `Missing local dependency ${ref} from ${f.path}`,
      );
    }
  }
}
const theme = JSON.parse(
  fs.readFileSync("apps/catalogue/public/r/jez-theme.json", "utf8"),
);
assert.ok(validate(theme), JSON.stringify(validate.errors));
for (const t of templateSpecs) {
  assert.ok(fs.existsSync(`apps/catalogue/public/downloads/${t.slug}.tar.gz`));
  const text = fs.readFileSync(`templates/${t.slug}/app/view.tsx`, "utf8");
  assert.ok(text.includes("export function TemplateView"));
  assert.ok(fs.existsSync(`templates/${t.slug}/README.md`));
  for (const asset of [
    "fieldwork.svg",
    "frequency.svg",
    "common.svg",
    "studio-lamp.png",
  ])
    assert.ok(
      fs.statSync(`templates/${t.slug}/public/assets/${asset}`).size > 100,
    );
}
console.log(
  "PASS: 91 components, 67 blocks, 8 templates; official registry schema; complete dependency closures; canonical source parity; local assets.",
);
