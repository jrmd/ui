import { notFound } from "next/navigation";
import { TemplatePreview } from "../../../../../components/template-preview";
import templates from "../../../../../generated/templates.json";
export function generateStaticParams() {
  return templates.flatMap((t) =>
    t.routes.map((r) => ({ slug: t.slug, path: r ? r.split("/") : [] })),
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; path?: string[] }>;
}) {
  const { slug, path } = await params;
  const route = path?.join("/") ?? "";
  if (!templates.find((t) => t.slug === slug)?.routes.includes(route))
    notFound();
  return (
    <TemplatePreview
      slug={slug}
      route={route}
      basePath={`/templates/${slug}/preview`}
    />
  );
}
