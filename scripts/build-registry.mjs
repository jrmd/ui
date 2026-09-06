import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { format } from "prettier";
import { execFileSync } from "node:child_process";
import { descriptions, templateSpecs } from "./catalogue-data.mjs";
const items = JSON.parse(
  fs.readFileSync("packages/catalogue/items.json", "utf8"),
);
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
export function closure(file, seen = new Set()) {
  if (seen.has(file)) return seen;
  seen.add(file);
  const source = fs.readFileSync(file, "utf8");
  for (const [, ref] of source.matchAll(/from ['"]([^'"]+)['"]/g)) {
    let target;
    if (ref.startsWith("."))
      target = path.normalize(path.join(path.dirname(file), ref));
    else if (ref.startsWith("@registry/")) target = "registry/" + ref.slice(10);
    if (target) {
      const resolved = [".tsx", ".ts", ".css", ""]
        .map((e) => target + e)
        .find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
      if (!resolved) throw Error("Missing " + target + " from " + file);
      closure(resolved, seen);
    }
  }
  for (const [, asset] of source.matchAll(/["']\/assets\/([^"']+\.svg)["']/g)) {
    const assetPath = "assets/" + asset;
    if (!fs.existsSync(assetPath)) throw Error("Missing artwork " + assetPath);
    seen.add(assetPath);
  }
  return seen;
}
function dependencies(files) {
  const names = new Set();
  for (const file of files)
    for (const [, ref] of fs
      .readFileSync(file, "utf8")
      .matchAll(/from ['"]([^'"]+)['"]/g))
      if (
        !ref.startsWith(".") &&
        !ref.startsWith("@registry/") &&
        !["react", "react-dom"].includes(ref)
      ) {
        const name = ref.startsWith("@")
          ? ref.split("/").slice(0, 2).join("/")
          : ref.split("/")[0];
        if (pkg.dependencies[name])
          names.add(`${name}@${pkg.dependencies[name]}`);
      }
  return [...names];
}
function props(file, symbol) {
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let result = "";
  for (const stmt of ast.statements)
    if (ts.isFunctionDeclaration(stmt) && stmt.name?.text === symbol) {
      const type = stmt.parameters[0]?.type;
      result = type?.getText(ast) ?? "No props required.";
    }
  const exports = ast.statements
    .filter(
      (s) =>
        ts.isTypeAliasDeclaration(s) &&
        s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword),
    )
    .map((s) => s.getText(ast));
  // Resolve shared presentation types so the props panel is useful on its own.
  const shared = [];
  for (const dependency of closure(file)) {
    if (dependency === file || !/\.tsx?$/.test(dependency)) continue;
    const dependencyAst = ts.createSourceFile(
      dependency,
      fs.readFileSync(dependency, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    for (const declaration of dependencyAst.statements) {
      if (
        ts.isTypeAliasDeclaration(declaration) &&
        new RegExp("\\b" + declaration.name.text + "\\b").test(result)
      )
        shared.push(declaration.getText(dependencyAst));
    }
  }
  return [...exports, ...shared, result].join("\n\n");
}
const out = "apps/catalogue/public";
fs.mkdirSync(out + "/r", { recursive: true });
fs.mkdirSync(out + "/downloads", { recursive: true });
fs.mkdirSync("apps/catalogue/generated", { recursive: true });
const theme = {
  name: "jez-theme",
  type: "registry:style",
  title: "Jez UI theme",
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  cssVars: {
    theme: {
      "color-background": "var(--background)",
      "color-foreground": "var(--foreground)",
      "color-muted": "var(--muted)",
      "color-muted-foreground": "var(--muted-foreground)",
      "color-border": "var(--border)",
      "color-primary": "var(--primary)",
      "color-primary-foreground": "var(--primary-foreground)",
      "color-accent": "var(--accent)",
      "color-danger": "var(--danger)",
      "font-display": "var(--font-heading)",
    },
    light: {
      background: "#f8f7f3",
      foreground: "#171817",
      muted: "#eeede7",
      "muted-foreground": "#64665d",
      border: "#d6d7ce",
      primary: "#36483e",
      "primary-foreground": "#ffffff",
      accent: "#d9e3cd",
      danger: "#b32335",
      "danger-foreground": "#ffffff",
      "font-heading":
        '"Instrument Sans Variable",ui-sans-serif,system-ui,sans-serif',
      "font-interface":
        '"Instrument Sans Variable",ui-sans-serif,system-ui,sans-serif',
    },
    dark: {
      background: "#191b19",
      foreground: "#f4f4ec",
      muted: "#282b27",
      "muted-foreground": "#b5baae",
      border: "#464b42",
      primary: "#bdcfb8",
      "primary-foreground": "#17241b",
      accent: "#d9e3cd",
      danger: "#ff9ba7",
      "danger-foreground": "#3a101b",
    },
  },
  css: {
    "@media (prefers-reduced-motion: reduce)": {
      '[style*="jez-"]': {
        "animation-duration": "0.01ms !important",
        "animation-iteration-count": "1 !important",
      },
    },
    "@keyframes jez-shift": { to: { "background-position": "200% 50%" } },
    "@keyframes jez-grid": { to: { "background-position": "48px 48px" } },
    "@keyframes jez-ripple": { to: { transform: "scale(3)", opacity: "0" } },
    "@keyframes jez-marquee": { to: { transform: "translateX(-50%)" } },
    "@keyframes jez-aurora": {
      "50%": { transform: "translate(12%,-8%) rotate(20deg)" },
    },
  },
};
fs.writeFileSync(out + "/r/jez-theme.json", JSON.stringify(theme, null, 2));
// The catalogue previews execute the same examples that consumers compile.
const blockRecipes = items.filter(
  (item) =>
    item.kind === "block" && fs.existsSync(`examples/blocks/${item.slug}.tsx`),
);
fs.writeFileSync(
  "apps/catalogue/components/block-recipes.tsx",
  `"use client";
import {lazy,Suspense} from "react";
${blockRecipes.map((item, index) => `const Recipe${index}=lazy(()=>import("../../../examples/blocks/${item.slug}"));`).join("\n")}
const recipes={${blockRecipes.map((item, index) => `"${item.slug}":Recipe${index}`).join(",")}};
export function BlockRecipe({slug}:{slug:string}){const Recipe=recipes[slug as keyof typeof recipes];return Recipe?<Suspense fallback={<p>Loading composition…</p>}><Recipe/></Suspense>:null;}`,
);
const manifests = [];
for (const item of items) {
  const files = [...closure(item.file)],
    deps = dependencies(files);
  if (item.example.includes("<Plus"))
    deps.push("lucide-react@" + pkg.dependencies["lucide-react"]);
  const description =
    descriptions[item.slug] ??
    {
      foundations: `${item.title} with thoughtful defaults, semantic styling, and editable source.`,
      product: `${item.title} for a useful, keyboard-friendly product interface.`,
      motion: `${item.title} brings controlled expression to your interface.`,
      effects: `${item.title} adds a distinctive visual surface to your composition.`,
      charts: `${item.title} with readable values and an accessible data representation.`,
      marketing: `A complete ${item.title.toLowerCase()} section, ready to adapt to your product.`,
      workspace: `A working ${item.title.toLowerCase()} with illustrative data and frontend interactions.`,
    }[item.group];
  const a11y = ["motion", "effects"].includes(item.group)
    ? "Respect reduced-motion preferences. Decorative effects must not carry essential information. WebGL scenes include a static fallback and only render while visible."
    : "Provide meaningful labels and preserve keyboard focus styles. Check contrast when customising theme colours.";
  const reg = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: item.kind === "block" ? "registry:block" : "registry:component",
    title: item.title,
    description,
    dependencies: deps,
    registryDependencies: [
      (process.env.JEZ_PUBLIC_URL ?? "http://localhost:3000") +
        "/r/jez-theme.json",
      ...[
        ...new Set([...item.example.matchAll(/<([A-Z]\w*)/g)].map((m) => m[1])),
      ]
        .map((symbol) =>
          items.find(
            (i) =>
              i.symbol === symbol ||
              new RegExp(
                "export (?:function|const) " + symbol + "(?:[<(=\\s])",
              ).test(fs.readFileSync(i.file, "utf8")),
          ),
        )
        .filter((dep) => dep && dep.slug !== item.slug)
        .map(
          (dep) =>
            (process.env.JEZ_PUBLIC_URL ?? "http://localhost:3000") +
            "/r/" +
            dep.slug +
            ".json",
        ),
    ],
    files: files.map((file) => ({
      path: file,
      type: file.startsWith("assets/")
        ? "registry:file"
        : file.includes("/blocks/")
          ? "registry:block"
          : "registry:component",
      target: file.startsWith("assets/")
        ? "public/" + file
        : "components/jez-ui/" + file.replace("registry/", ""),
      content: fs.readFileSync(file, "utf8"),
    })),
  };
  fs.writeFileSync(
    out + "/r/" + item.slug + ".json",
    JSON.stringify(reg, null, 2),
  );
  const symbols = [
    ...new Set([...item.example.matchAll(/<([A-Z]\w*)/g)].map((m) => m[1])),
  ];
  const importGroups = new Map();
  const individualImports = symbols
    .map((symbol) => {
      const dep = items.find(
        (i) =>
          i.symbol === symbol ||
          new RegExp(
            "export (?:function|const) " + symbol + "(?:[<(=\\s])",
          ).test(fs.readFileSync(i.file, "utf8")),
      );
      return dep
        ? `import {${symbol}} from '@/components/jez-ui/${dep.kind === "block" ? "blocks" : "ui"}/${dep.slug}';`
        : [
              "Plus",
              "ArrowUpRight",
              "Check",
              "FileCode2",
              "Folder",
              "Play",
              "Pause",
              "RotateCcw",
            ].includes(symbol)
          ? `import {${symbol}} from 'lucide-react';`
          : "";
    })
    .filter(Boolean)
    .join("\n");
  for (const [, names, module] of individualImports.matchAll(
    /import \{([^}]+)\} from '([^']+)';/g,
  )) {
    const group = importGroups.get(module) ?? new Set();
    names.split(",").forEach((name) => group.add(name.trim()));
    importGroups.set(module, group);
  }
  const usageImports = [...importGroups]
    .map(
      ([module, names]) =>
        `import { ${[...names].join(", ")} } from '${module}';`,
    )
    .join("\n");
  const setup = [
    item.example.includes("showArchived")
      ? `const [showArchived,setShowArchived]=useState<boolean|"indeterminate">(true);`
      : "",
    item.example.includes("setDraft")
      ? `const [draft,setDraft]=useState('');`
      : "",
    item.example.includes("setSearchTerm")
      ? `const [searchTerm,setSearchTerm]=useState('');`
      : "",
    item.example.includes("setButtonBusy")
      ? `const [buttonBusy,setButtonBusy]=useState(false);useEffect(()=>{if(!buttonBusy)return;const timer=setTimeout(()=>{setButtonBusy(false);setNotice('Project published.');},900);return()=>clearTimeout(timer);},[buttonBusy]);`
      : "",
    item.example.includes("setProgress")
      ? `const [progress,setProgress]=useState(0);const [progressRunning,setProgressRunning]=useState(false);useEffect(()=>{if(!progressRunning)return;if(progress>=100){setProgressRunning(false);return;}const timer=setTimeout(()=>setProgress(v=>Math.min(100,v+4)),200);return()=>clearTimeout(timer);},[progressRunning,progress]);`
      : "",
    item.example.includes("setScenePaused")
      ? `const [scenePaused,setScenePaused]=useState(false);const [sceneSpeed,setSceneSpeed]=useState(1);const [sceneColor,setSceneColor]=useState<string|undefined>(undefined);`
      : "",
    item.example.includes("setCount")
      ? `const [count,setCount]=useState(128);`
      : "",
    /setNotice|actions/.test(item.example)
      ? `const [notice,setNotice]=useState('');`
      : "",
    item.example.includes("actions")
      ? `const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];`
      : "",
    /\btabs\b/.test(item.example)
      ? `const tabs=[{value:'design',label:'Design',content:'Make it feel like something.'},{value:'build',label:'Build',content:'Give a good idea a useful shape.'},{value:'share',label:'Share',content:'Put it into the world.'}];`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  const usage = await format(
    `"use client";\n${setup.includes("useState") ? `import {useState${setup.includes("useEffect") ? ",useEffect" : ""}} from 'react';\n` : ""}${usageImports}\n\nexport default function Example(){\n${setup}\nreturn <>${item.example}${/setNotice|actions/.test(item.example) ? '<p role="status">{notice}</p>' : ""}</>;\n}`,
    {
      parser: "typescript",
      printWidth: 80,
      tabWidth: 2,
      singleAttributePerLine: true,
    },
  );
  const manifest = {
    ...item,
    description,
    dependencies: deps,
    accessibility: a11y,
    props: props(item.file, item.symbol),
    parts: [
      ...fs
        .readFileSync(item.file, "utf8")
        .matchAll(/export (?:function|const) ([A-Z]\w*)/g),
    ]
      .map((m) => m[1])
      .filter((name) => name !== item.symbol && !name.endsWith("Copy")),
    usage,
    composition: fs.existsSync(`examples/blocks/${item.slug}.tsx`)
      ? fs
          .readFileSync(`examples/blocks/${item.slug}.tsx`, "utf8")
          .replaceAll("../../registry/", "@/components/jez-ui/")
      : null,
    source: fs.readFileSync(item.file, "utf8"),
    files: files.map((f) => ({ path: f, source: fs.readFileSync(f, "utf8") })),
  };
  manifests.push(manifest);
}
fs.writeFileSync(
  out + "/registry.json",
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "jez-ui",
      homepage: process.env.JEZ_PUBLIC_URL ?? "http://localhost:3000",
      items: [
        theme,
        ...items.map((i) =>
          JSON.parse(fs.readFileSync(out + "/r/" + i.slug + ".json", "utf8")),
        ),
      ],
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  "apps/catalogue/generated/catalogue.json",
  JSON.stringify(manifests),
);
fs.writeFileSync(
  "apps/catalogue/generated/templates.json",
  JSON.stringify(templateSpecs),
);
fs.writeFileSync(
  out + "/search-index.json",
  JSON.stringify(
    manifests.map(({ slug, title, group, kind, description }) => ({
      slug,
      title,
      group,
      kind,
      description,
    })),
  ),
);
fs.mkdirSync("assets", { recursive: true });
// Artwork in assets/ is authored source. Builds copy it without rewriting it.
const themes = {
  "product-launch":
    "--background:#080a0d;--foreground:#e5eaf1;--primary:#c0d2ee;--primary-foreground:#101820;--border:#2c333e;",
  saas: "--primary:#36483e;--accent:#d9e3cd;",
  analytics: "--background:#fbfcfa;--primary:#426957;--accent:#d6e8d2;",
  projects:
    "--background:#faf7f0;--muted:#eee9df;--primary:#5c6943;--accent:#e4edcc;",
  "ai-chat": "--background:#faf9f6;--primary:#675381;--muted:#eeece8;",
  agency: "--background:#f6f1e9;--primary:#c73c16;--accent:#ff7444;",
  portfolio: "--background:#f2f4ed;--primary:#405746;--accent:#d7e0c4;",
  editorial:
    "--background:#f5efdf;--primary:#8b4933;--font-heading:Georgia,serif;--muted:#e9e0cd;",
  storefront: "--background:#f8f5ee;--primary:#414c36;--accent:#e4dcc8;",
};
let previewImports = [],
  previewCases = [];
for (const spec of templateSpecs) {
  const dir = "templates/" + spec.slug;
  fs.mkdirSync(dir + "/public/assets", { recursive: true });
  for (const asset of fs.readdirSync("assets"))
    fs.copyFileSync("assets/" + asset, dir + "/public/assets/" + asset);
  const needed = [...closure(dir + "/app/view.tsx")].filter((f) =>
    f.startsWith("registry/"),
  );
  // This directory is a generated copy of the canonical registry. Remove old
  // closure members too, or TypeScript checks orphaned files whose dependencies
  // are correctly absent from the new standalone package manifest.
  fs.rmSync(dir + "/registry", { recursive: true, force: true });
  for (const file of needed) {
    const target = dir + "/" + file;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(file, target);
  }
  fs.copyFileSync("registry/theme.css", dir + "/app/theme.css");
  fs.copyFileSync("templates/styles.css", dir + "/app/template.css");
  fs.writeFileSync(
    dir + "/app/globals.css",
    `@import "./theme.css";\n@import "./template.css";\n@import "@fontsource-variable/instrument-sans/wght.css";\n@import "@fontsource-variable/instrument-sans/wght-italic.css";\n@source "../registry";\n:root{${themes[spec.slug]}}\n`,
  );
  fs.writeFileSync(
    dir + "/app/layout.tsx",
    `import './globals.css';import type {Metadata} from 'next';export const metadata:Metadata={title:${JSON.stringify(spec.name + " — " + spec.title)},description:${JSON.stringify(spec.description)}};export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}`,
  );
  fs.mkdirSync(dir + "/app/[[...path]]", { recursive: true });
  fs.writeFileSync(
    dir + "/app/[[...path]]/page.tsx",
    `import {TemplateView} from '../view';import {notFound} from 'next/navigation';const routes=${JSON.stringify(spec.routes)};export function generateStaticParams(){return routes.map(r=>({path:r?r.split('/'):[]}))}export default async function Page({params}:{params:Promise<{path?:string[]}>}){const route=(await params).path?.join('/')??'';if(!routes.includes(route))notFound();return <TemplateView route={route}/>}`,
  );
  const deps = Object.fromEntries(
    [
      "next",
      "react",
      "react-dom",
      "tailwindcss",
      "@tailwindcss/postcss",
      "@fontsource-variable/instrument-sans",
      ...dependencies(needed).map((d) => d.slice(0, d.lastIndexOf("@"))),
    ].map((n) => [n, pkg.dependencies[n]]),
  );
  fs.writeFileSync(
    dir + "/package.json",
    JSON.stringify(
      {
        name: "jez-template-" + spec.slug,
        version: "0.1.0",
        private: true,
        scripts: { dev: "next dev", build: "next build", start: "next start" },
        dependencies: deps,
        devDependencies: {
          typescript: pkg.devDependencies.typescript,
          "@types/node": pkg.devDependencies["@types/node"],
          "@types/react": pkg.devDependencies["@types/react"],
          "@types/react-dom": pkg.devDependencies["@types/react-dom"],
          ...(deps.three
            ? { "@types/three": pkg.devDependencies["@types/three"] }
            : {}),
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    dir + "/tsconfig.json",
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["dom", "dom.iterable", "esnext"],
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          jsx: "react-jsx",
          plugins: [{ name: "next" }],
          baseUrl: ".",
          paths: { "@registry/*": ["registry/*"] },
        },
        include: ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    dir + "/next.config.ts",
    `export default {experimental:{cpus:2}};`,
  );
  fs.writeFileSync(
    dir + "/postcss.config.mjs",
    `export default {plugins:{'@tailwindcss/postcss':{}}};`,
  );
  fs.copyFileSync("LICENSE", dir + "/LICENSE");
  fs.writeFileSync(
    dir + "/README.md",
    `# ${spec.name}\n\n${spec.description}\n\n## Run independently\n\nUse Node 22.12+ and pnpm 11. Run \`pnpm install\`, then \`pnpm dev\`. Run \`pnpm build\` and \`pnpm start\` for production. No environment variables are needed.\n\nRoutes: ${spec.routes.map((r) => "`/" + r + "`").join(", ")}.\n\n## Make it yours\n\nEdit app/view.tsx for route content, app/globals.css for this identity, and registry/ for editable components. Assets are local in public/assets. This is fictional demonstration content, not customer evidence.\n\n## Backend integration\n\nForms expose async onSubmit adapters in their source. Blocks expose value/defaultValue/onValueChange for state ownership. Supply persistence from your application; template-specific demo storage uses jez-demo: keys and is not authentication. ChatWorkspace accepts an onSend callback with message history and an AbortSignal for your provider transport. Storefront add and checkout handlers are frontend demos; pricing and orders must be validated server-side in a real shop. Never store credentials in local storage.\n\n## Demo reset\n\nUse the visible Reset demo or New conversation controls. For a full reset, clear this origin's keys prefixed jez-demo:.\n\n## Distribution\n\nOriginal source is all rights reserved. Public distribution terms are pending. Third-party licences are included in THIRD_PARTY_NOTICES.md and assets retain their stated provenance.\n`,
  );
  previewImports.push(
    `const T_${spec.slug.replaceAll("-", "_")}=lazy(()=>import('../../../templates/${spec.slug}/app/view').then(m=>({default:m.TemplateView})));`,
  );
  previewCases.push(
    `case '${spec.slug}':return <div className="template-root template-${spec.slug}"><T_${spec.slug.replaceAll("-", "_")} route={route} basePath={basePath} assetBase="/assets"/></div>;`,
  );
  execFileSync("tar", [
    "--exclude=node_modules",
    "--exclude=.next",
    "--exclude=*.tsbuildinfo",
    "-czf",
    path.resolve(out + "/downloads/" + spec.slug + ".tar.gz"),
    "-C",
    path.resolve("templates"),
    spec.slug,
  ]);
}
fs.mkdirSync(out + "/assets", { recursive: true });
for (const asset of fs.readdirSync("assets"))
  fs.copyFileSync("assets/" + asset, out + "/assets/" + asset);
fs.writeFileSync(
  "apps/catalogue/components/template-preview.tsx",
  `"use client";import {lazy,Suspense} from 'react';${previewImports.join("\n")}export function TemplatePreview({slug,route,basePath}:{slug:string;route:string;basePath:string}){function render(){switch(slug){${previewCases.join("\n")}default:return null}}return <Suspense fallback={<p className="p-8">Loading template…</p>}>{render()}</Suspense>}`.replaceAll(
    "../../../templates/",
    "../../../templates/",
  ),
);
// Components live three levels below the repository root.
fs.writeFileSync(
  "apps/catalogue/generated/template-themes.css",
  Object.entries(themes)
    .map(([slug, css]) => `.template-${slug}{${css}}`)
    .join("\n") +
    "\n" +
    fs.readFileSync("templates/styles.css", "utf8"),
);
fs.writeFileSync(
  out + "/llms.txt",
  `# Jez UI\n\n91 source-owned React components, 79 blocks, ${templateSpecs.length} templates.\n\n${items.map((i) => `- [${i.title}](/${i.kind === "block" ? "blocks" : "components"}/${i.slug}): ${i.group}`).join("\n")}\n`,
);
console.log(
  `Generated ${items.length} registry entries, ${templateSpecs.length} standalone templates and downloads.`,
);
