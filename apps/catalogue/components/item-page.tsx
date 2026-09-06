import { CatalogueSidebar } from "./catalogue-sidebar";
import { Shell } from "./shell";
import { Preview, CodeBox, InstallCommand } from "./detail";
import items from "../generated/catalogue.json";
export function ItemPage({ slug }: { slug: string }) {
  const item = items.find((i) => i.slug === slug)!;
  const related = items.filter((i) => i.kind === item.kind);
  return (
    <Shell>
      <div className="detail-layout">
        <CatalogueSidebar
          entries={related.map(({ slug, title, group, kind }) => ({
            slug,
            title,
            group,
            kind,
          }))}
          slug={slug}
          kind={item.kind}
        />
        <main className="detail-main">
          <a
            href={item.kind === "block" ? "/blocks" : "/components"}
            className="mb-6 inline-block text-xs text-muted-foreground"
          >
            ← {item.kind === "block" ? "Blocks" : "Components"}
          </a>
          <h1>{item.title}</h1>
          <p className="detail-description">{item.description}</p>
          <Preview slug={slug} block={item.kind === "block"} />
          <h2>Make it yours.</h2>
          <p className="text-sm text-muted-foreground">
            Install the editable source and its dependencies into your React +
            Tailwind project.
          </p>
          <InstallCommand slug={slug} />
          <h2>Use it</h2>
          <CodeBox code={item.usage} />
          {item.parts.length > 0 && (
            <>
              <h2>Compose your own</h2>
              <p>
                These styled parts are included in the same install. Use
                children to build your layout; add className only when you want
                an override.
              </p>
              {item.composition && <CodeBox code={item.composition} />}
              <CodeBox
                code={`import { ${[item.symbol, ...item.parts].join(", ")} } from "@/components/jez-ui/${item.kind === "block" ? "blocks" : "ui"}/${item.slug}";`}
              />
              <a href="/docs/composition">Read the composition guide →</a>
            </>
          )}
          <h2>Props & types</h2>
          <CodeBox code={item.props} />
          <h2>Source</h2>
          <details>
            <summary className="cursor-pointer text-sm">
              View {item.files.length} source{" "}
              {item.files.length === 1 ? "file" : "files"}
            </summary>
            {item.files.map((file) => (
              <div key={file.path}>
                <h3 className="mt-6 font-mono text-xs">{file.path}</h3>
                <CodeBox code={file.source} />
              </div>
            ))}
          </details>
          <h2>Dependencies</h2>
          <p className="text-sm text-muted-foreground">
            {item.dependencies.length
              ? item.dependencies.join(" · ")
              : "React only. No additional runtime dependencies."}
          </p>
          <h2>Accessibility & behaviour</h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {item.accessibility}
          </p>
          <a href="/docs/accessibility" className="text-sm underline">
            Read the accessibility and performance guide →
          </a>
        </main>
      </div>
    </Shell>
  );
}
