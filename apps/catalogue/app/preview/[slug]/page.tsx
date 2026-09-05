import { notFound } from "next/navigation";
import { PreviewFrame } from "../../../components/preview-frame";
import items from "../../../generated/catalogue.json";
export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!items.some((i) => i.slug === slug)) notFound();
  return <PreviewFrame slug={slug} />;
}
