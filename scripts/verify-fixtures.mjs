import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd(),
  pkg = JSON.parse(fs.readFileSync("package.json", "utf8")),
  items = JSON.parse(fs.readFileSync("packages/catalogue/items.json", "utf8"));
const base = process.env.JEZ_PUBLIC_URL ?? "http://localhost:3000";
for (const kind of ["vite", "next"]) {
  const dir = path.join(root, "fixtures", kind);
  fs.mkdirSync(dir, { recursive: true });
  const deps = {
    react: pkg.dependencies.react,
    "react-dom": pkg.dependencies["react-dom"],
    tailwindcss: pkg.dependencies.tailwindcss,
    clsx: pkg.dependencies.clsx,
    "tailwind-merge": pkg.dependencies["tailwind-merge"],
  };
  const dev = {
    typescript: pkg.devDependencies.typescript,
    "@types/react": pkg.devDependencies["@types/react"],
    "@types/react-dom": pkg.devDependencies["@types/react-dom"],
    "@types/node": pkg.devDependencies["@types/node"],
    "@types/three": pkg.devDependencies["@types/three"],
  };
  if (kind === "next") {
    deps.next = pkg.dependencies.next;
    deps["@tailwindcss/postcss"] = pkg.dependencies["@tailwindcss/postcss"];
  } else {
    dev.vite = pkg.devDependencies.vite;
    dev["@vitejs/plugin-react"] = pkg.devDependencies["@vitejs/plugin-react"];
    dev["@tailwindcss/vite"] = pkg.devDependencies["@tailwindcss/vite"];
  }
  fs.writeFileSync(
    dir + "/package.json",
    JSON.stringify(
      {
        name: "jez-fixture-" + kind,
        private: true,
        scripts: {
          build: kind === "next" ? "next build" : "tsc --noEmit && vite build",
        },
        dependencies: deps,
        devDependencies: dev,
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
          lib: ["DOM", "DOM.Iterable", "ES2022"],
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          esModuleInterop: true,
          resolveJsonModule: true,
          baseUrl: ".",
          paths: { "@/*": ["./*"] },
        },
        include: ["**/*.ts", "**/*.tsx"],
        exclude: ["node_modules"],
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    dir + "/components.json",
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: kind === "next",
        tsx: true,
        tailwind: {
          config: "",
          css: "globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(dir + "/globals.css", '@import "tailwindcss";\n');
  fs.rmSync(dir + "/components", { recursive: true, force: true });
  fs.mkdirSync(dir + "/usage", { recursive: true });
  const documented = JSON.parse(
    fs.readFileSync("apps/catalogue/generated/catalogue.json", "utf8"),
  );
  for (const item of documented)
    fs.writeFileSync(dir + "/usage/" + item.slug + ".tsx", item.usage);
  const imports = items
    .map(
      (i) =>
        `import {${i.symbol}} from './components/jez-ui/${i.kind === "block" ? "blocks" : "ui"}/${i.slug}';`,
    )
    .join("\n");
  fs.writeFileSync(
    dir + "/all-components.tsx",
    `"use client";${imports}\nexport const installed=[${items.map((i) => i.symbol).join(",")}];\n`,
  );
  if (kind === "vite") {
    fs.writeFileSync(
      dir + "/vite.config.ts",
      `import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwind from '@tailwindcss/vite';export default defineConfig({plugins:[react(),tailwind()]});`,
    );
    fs.writeFileSync(
      dir + "/index.html",
      '<html lang="en"><head><title>Jez UI installation fixture</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    );
    fs.writeFileSync(
      dir + "/main.tsx",
      `import {createRoot} from 'react-dom/client';import './globals.css';import {installed} from './all-components';createRoot(document.getElementById('root')!).render(<main>{installed.length} installed components and blocks</main>);`,
    );
  } else {
    fs.mkdirSync(dir + "/app", { recursive: true });
    fs.writeFileSync(
      dir + "/app/layout.tsx",
      `import '../globals.css';export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}`,
    );
    fs.writeFileSync(
      dir + "/app/page.tsx",
      `"use client";import {installed} from '../all-components';export default function Page(){return <main>{installed.length} installed components and blocks</main>}`,
    );
    fs.writeFileSync(
      dir + "/postcss.config.mjs",
      `export default {plugins:{'@tailwindcss/postcss':{}}};`,
    );
    fs.writeFileSync(
      dir + "/next.config.ts",
      `export default {experimental:{cpus:2}};`,
    );
  }
  execFileSync("pnpm", ["install"], { cwd: dir, stdio: "pipe" });
  console.log(`${kind}: installing ${items.length} items with the real shadcn CLI`);
  try {
    execFileSync(
      path.join(root, "node_modules/.bin/shadcn"),
      [
        "add",
        ...items.map((i) => `${base}/r/${i.slug}.json`),
        "--yes",
        "--overwrite",
        "--cwd",
        dir,
      ],
      { cwd: dir, stdio: "pipe", maxBuffer: 20 * 1024 * 1024 },
    );
  } catch (e) {
    console.error(e.stdout?.toString(), e.stderr?.toString());
    throw e;
  }
  execFileSync("pnpm", ["build"], {
    cwd: dir,
    stdio: "pipe",
    maxBuffer: 20 * 1024 * 1024,
  });
  console.log(
    `PASS ${kind}: real CLI install, TypeScript and production build`,
  );
}
