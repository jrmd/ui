import { ArrowUpRight } from "lucide-react";
export function ComponentTile({
  slug,
  title,
  group,
  kind = "component",
}: {
  slug: string;
  title: string;
  group: string;
  kind?: string;
}) {
  return (
    <a
      href={`/${kind === "block" ? "blocks" : "components"}/${slug}`}
      className="catalogue-tile"
    >
      <div className="tile-art">
        <img
          src={`/thumbnails/${slug}.jpg`}
          alt=""
          loading="lazy"
          width={680}
          height={430}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="tile-caption">
        <span>{title}</span>
        <span className="flex items-center gap-2">
          <small>{group}</small>
          <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );
}
export function TemplateTile({
  slug,
  name,
  title,
  color,
}: {
  slug: string;
  name: string;
  title: string;
  color: string;
}) {
  return (
    <a href={"/templates/" + slug} className="catalogue-tile">
      <div
        className="template-art"
        style={{ background: `color-mix(in srgb,${color} 25%,#eeece7)` }}
      >
        <img
          src={`/thumbnails/template-${slug}.jpg`}
          alt=""
          loading="lazy"
          width={1280}
          height={850}
          className="w-full rounded-t-md"
        />
      </div>
      <div className="tile-caption">
        <span>
          {name} <small> / {title}</small>
        </span>
        <ArrowUpRight size={15} />
      </div>
    </a>
  );
}
