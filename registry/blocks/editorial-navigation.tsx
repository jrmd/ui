"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
const defaults = [
  { label: "Stories", href: "/templates/editorial/preview" },
  { label: "Design", href: "/templates/editorial/preview/category/design" },
  { label: "People", href: "/templates/editorial/preview/author/rowan" },
  { label: "Archive", href: "/templates/editorial/preview/search" },
];
export type EditorialNavigationOptions = {
  className?: string;
  items?: { label: string; href: string }[];
  brand?: string;
  home?: string;
};
export type EditorialNavigationProps = Omit<
  React.ComponentProps<"header">,
  keyof EditorialNavigationOptions
> &
  EditorialNavigationOptions;
function useEditorialNavigationModel({
  className,
  items = defaults,
  brand = "Still.",
  home = "/templates/editorial/preview",
  children,
  ...rootProps
}: EditorialNavigationProps) {
  const [open, setOpen] = React.useState(false);
  return { className, items, brand, home, children, rootProps, open, setOpen };
}
const EditorialNavigationCompositionContext = React.createContext<ReturnType<
  typeof useEditorialNavigationModel
> | null>(null);
function useEditorialNavigationComposition() {
  const context = React.useContext(EditorialNavigationCompositionContext);
  if (!context)
    throw new Error(
      "EditorialNavigation parts must be inside EditorialNavigation.",
    );
  return context;
}
export function EditorialNavigation(props: EditorialNavigationProps) {
  const model = useEditorialNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <EditorialNavigationCompositionContext.Provider value={model}>
      <header
        {...rootProps}
        className={cn("border-y border-border bg-background", className)}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <EditorialNavigationMasthead />
            <EditorialNavigationLinks />
          </>
        )}
      </header>
    </EditorialNavigationCompositionContext.Provider>
  );
}

export function EditorialNavigationHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editorial-navigation-header"
      className={cn(
        "flex items-center justify-between gap-6 px-6 py-6",
        className,
      )}
      {...props}
    />
  );
}

export function EditorialNavigationItem({
  className,
  asChild,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="editorial-navigation-item"
      className={cn(
        "flex items-center gap-4 border-b border-border py-4 text-sm last:border-0 hover:text-primary md:mr-8 md:border-0",
        className,
      )}
      {...props}
    />
  );
}

export function EditorialNavigationMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialNavigationHeader>> & {
  children?: React.ReactNode;
}) {
  const { brand, home, open, setOpen } = useEditorialNavigationComposition();
  return (
    <EditorialNavigationHeader {...props}>
      {children === undefined ? (
        <>
          <a href={home} className="font-serif text-4xl tracking-tight">
            {brand}
          </a>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Ideas worth spending time with.
          </span>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
          <a
            href="/templates/editorial/preview/search"
            className="hidden items-center gap-2 text-xs md:flex"
          >
            Explore the journal
            <ArrowUpRight size={15} />
          </a>
        </>
      ) : (
        children
      )}
    </EditorialNavigationHeader>
  );
}
export function EditorialNavigationLinks({
  children,
  ...props
}: Partial<React.ComponentProps<"nav">> & { children?: React.ReactNode }) {
  const { items, open } = useEditorialNavigationComposition();
  return (
    <nav
      aria-label="Journal navigation"
      {...props}
      className={cn(
        cn("border-t border-border px-6", open ? "grid" : "hidden md:flex"),
        props.className,
      )}
    >
      {children === undefined
        ? items.map((item, i) => (
            <EditorialNavigationItem key={item.href} href={item.href}>
              <span className="font-mono text-[10px] text-muted-foreground">
                0{i + 1}
              </span>
              {item.label}
            </EditorialNavigationItem>
          ))
        : children}
    </nav>
  );
}
