import { notFound } from "next/navigation";
import { Shell } from "../../../components/shell";
import { TemplateTile } from "../../../components/tiles";
import templates from "../../../generated/templates.json";
export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = templates.find((t) => t.slug === slug);
  if (!t) notFound();
  return (
    <Shell>
      <main className="template-launch">
        <div>
          <TemplateTile {...t} />
          <div className="template-links">
            <a href={`/templates/${slug}/preview`}>Explore live template ↗</a>
            <a href={`/downloads/${slug}.tar.gz`} download>
              Download source ↓
            </a>
          </div>
        </div>
        <aside>
          <h1>{t.name}</h1>
          <p className="mt-4">{t.description}</p>
          <h2 className="mt-8 text-xl">A complete starting point.</h2>
          <ul>
            {t.routes.map((r) => (
              <li key={r}>
                <a
                  className="underline"
                  href={`/templates/${slug}/preview${r ? "/" + r : ""}`}
                >
                  {r ? "/" + r : "Home"} ↗
                </a>
              </li>
            ))}
          </ul>
          <p>
            Next.js · React 19 · Tailwind 4<br />
            Local assets and editable source.
            <br />
            No API keys required.
          </p>
          <p className="mt-5">
            Frontend demo with documented backend integration points. Original
            source distribution terms are pending.
          </p>
        </aside>
      </main>
    </Shell>
  );
}
