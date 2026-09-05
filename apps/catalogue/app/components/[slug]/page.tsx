import { notFound } from "next/navigation";
import { ItemPage } from "../../../components/item-page";
import items from "../../../generated/catalogue.json";
export function generateStaticParams() {
  return items
    .filter((i) => i.kind === "component")
    .map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: items.find((i) => i.slug === slug)?.title };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!items.some((i) => i.slug === slug && i.kind === "component")) notFound();
  return <ItemPage slug={slug} />;
}
