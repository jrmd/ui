"use client";
import * as React from "react";
import { NavigationMenu as N } from "radix-ui";
import {
  ChevronDown,
  ArrowUpRight,
  Box,
  LayoutTemplate,
  PanelsTopLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../ui/utils";
const defaults = [
  {
    label: "Components",
    description: "Small details. Complete interactions.",
    href: "/components",
    icon: Box,
  },
  {
    label: "Blocks",
    description: "Ready-to-build sections for your next project.",
    href: "/blocks",
    icon: PanelsTopLeft,
  },
  {
    label: "Templates",
    description: "A considered starting point, end to end.",
    href: "/templates",
    icon: LayoutTemplate,
  },
];
export function MegaNavigation({
  className,
  brand = "Forma",
  home = "/",
  items = defaults,
}: {
  className?: string;
  brand?: string;
  home?: string;
  items?: {
    label: string;
    description: string;
    href: string;
    icon?: typeof Box;
  }[];
}) {
  const [mobile, setMobile] = React.useState(false);
  return (
    <header
      className={cn(
        "relative z-20 rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div className="flex h-18 items-center justify-between gap-5 px-5 sm:px-7">
        <a
          href={home}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          {brand}
          <span className="text-primary">.</span>
        </a>
        <N.Root style={{ position: "static" }} className="hidden md:block">
          <N.List className="flex items-center gap-7">
            <N.Item>
              <N.Trigger className="group flex items-center gap-1.5 py-5 text-sm">
                Explore
                <ChevronDown
                  size={14}
                  className="transition-transform group-data-[state=open]:rotate-180"
                />
              </N.Trigger>
              <N.Content className="grid gap-2 p-4 md:grid-cols-3">
                {items.map((item) => {
                  const Icon = item.icon ?? Box;
                  return (
                    <N.Link asChild key={item.href}>
                      <a
                        href={item.href}
                        className="group rounded-lg p-5 transition-colors hover:bg-muted focus:bg-muted"
                      >
                        <Icon
                          size={23}
                          strokeWidth={1.5}
                          className="mb-6 text-primary"
                        />
                        <span className="flex items-center justify-between text-sm font-medium">
                          {item.label}
                          <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </a>
                    </N.Link>
                  );
                })}
              </N.Content>
            </N.Item>
            {items.slice(1).map((item) => (
              <N.Item key={item.href}>
                <N.Link
                  className="text-sm text-muted-foreground hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </N.Link>
              </N.Item>
            ))}
          </N.List>
          <N.Viewport className="jez-popover absolute inset-x-0 top-full overflow-hidden rounded-xl border border-border bg-background shadow-xl" />
        </N.Root>
        <a
          href={items[0]?.href}
          className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground sm:flex"
        >
          Get started
          <ArrowUpRight size={14} />
        </a>
        <button
          type="button"
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => setMobile((v) => !v)}
          className="rounded-md p-2 hover:bg-muted md:hidden"
        >
          {mobile ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobile && (
        <nav
          aria-label="Mobile navigation"
          className="grid gap-1 border-t border-border p-3 md:hidden"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg p-3 text-sm hover:bg-muted"
            >
              <span className="block font-medium">{item.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.description}
              </span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
