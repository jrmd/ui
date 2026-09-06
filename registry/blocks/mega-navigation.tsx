"use client";
import * as React from "react";
import { Slot } from "radix-ui";
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
export type MegaNavigationOptions = {
  className?: string;
  brand?: string;
  home?: string;
  items?: {
    label: string;
    description: string;
    href: string;
    icon?: typeof Box;
  }[];
};
export type MegaNavigationProps = Omit<
  React.ComponentProps<"header">,
  keyof MegaNavigationOptions
> &
  MegaNavigationOptions;
function useMegaNavigationModel({
  className,
  brand = "Forma",
  home = "/",
  items = defaults,
  children,
  ...rootProps
}: MegaNavigationProps) {
  const [mobile, setMobile] = React.useState(false);
  return {
    className,
    brand,
    home,
    items,
    children,
    rootProps,
    mobile,
    setMobile,
  };
}
const MegaNavigationCompositionContext = React.createContext<ReturnType<
  typeof useMegaNavigationModel
> | null>(null);
function useMegaNavigationComposition() {
  const context = React.useContext(MegaNavigationCompositionContext);
  if (!context)
    throw new Error("MegaNavigation parts must be inside MegaNavigation.");
  return context;
}
export function MegaNavigation(props: MegaNavigationProps) {
  const model = useMegaNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <MegaNavigationCompositionContext.Provider value={model}>
      <header
        {...rootProps}
        className={cn(
          "relative z-20 rounded-xl border border-border bg-background",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <MegaNavigationToolbar />
            <MegaNavigationMobileMenu />
          </>
        )}
      </header>
    </MegaNavigationCompositionContext.Provider>
  );
}

export function MegaNavigationHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="mega-navigation-header"
      className={cn(
        "flex h-18 items-center justify-between gap-5 px-5 sm:px-7",
        className,
      )}
      {...props}
    />
  );
}

export function MegaNavigationItem({
  className,
  asChild,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="mega-navigation-item"
      className={cn("rounded-lg p-3 text-sm hover:bg-muted", className)}
      {...props}
    />
  );
}

export function MegaNavigationToolbar({
  children,
  ...props
}: Partial<React.ComponentProps<typeof MegaNavigationHeader>> & {
  children?: React.ReactNode;
}) {
  const { brand, home, items, mobile, setMobile } =
    useMegaNavigationComposition();
  return (
    <MegaNavigationHeader {...props}>
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </MegaNavigationHeader>
  );
}
export function MegaNavigationMobileMenu({
  children,
}: React.PropsWithChildren) {
  const { items, mobile } = useMegaNavigationComposition();
  return children === undefined
    ? mobile && (
        <nav
          aria-label="Mobile navigation"
          className="grid gap-1 border-t border-border p-3 md:hidden"
        >
          {items.map((item) => (
            <MegaNavigationItem key={item.href} href={item.href}>
              <span className="block font-medium">{item.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.description}
              </span>
            </MegaNavigationItem>
          ))}
        </nav>
      )
    : children;
}
