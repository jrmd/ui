"use client";
import * as React from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "../ui/utils";
export type CommerceNavigationOptions = {
  className?: string;
  cartCount?: number;
  description?: React.ReactNode;
};
export type CommerceNavigationProps = Omit<
  React.ComponentProps<"header">,
  keyof CommerceNavigationOptions
> &
  CommerceNavigationOptions;

export function CommerceNavigation({
  description = <>Considered objects for everyday living.</>,
  className,
  cartCount = 0,
  children,
  ...rootProps
}: CommerceNavigationProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <header
      {...rootProps}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <CommerceNavigationDescription>
            {description}
          </CommerceNavigationDescription>
          <CommerceNavigationContent>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="w-fit rounded p-2 md:hidden"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
            <nav
              aria-label="Shop navigation"
              className="hidden gap-5 text-xs md:flex"
            >
              <a
                href="/templates/storefront/preview/collection"
                className="hover:underline"
              >
                Shop all
              </a>
              <a
                href="/templates/storefront/preview/product/studio-lamp"
                className="hover:underline"
              >
                Lighting
              </a>
            </nav>
            <a
              href="/templates/storefront/preview"
              className="font-serif text-3xl tracking-tight"
            >
              Objects.
            </a>
            <div className="flex items-center justify-end gap-3">
              <a
                href="/templates/storefront/preview/collection"
                aria-label="Browse products"
                className="grid size-9 place-items-center rounded-full hover:bg-muted"
              >
                <Search size={18} />
              </a>
              <a
                href="/templates/storefront/preview/cart"
                aria-label={`Shopping bag, ${cartCount} items`}
                className="flex items-center gap-1 rounded p-2 hover:bg-muted"
              >
                <ShoppingBag size={18} />
                <span className="text-xs">{cartCount}</span>
              </a>
            </div>
          </CommerceNavigationContent>
          {open && (
            <nav
              aria-label="Mobile shop navigation"
              className="grid gap-4 border-t border-border p-6 text-sm md:hidden"
            >
              <a href="/templates/storefront/preview/collection">Shop all</a>
              <a href="/templates/storefront/preview/product/studio-lamp">
                Lighting
              </a>
            </nav>
          )}
        </>
      )}
    </header>
  );
}

export function CommerceNavigationDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="commerce-navigation-description"
      className={cn(
        "bg-primary px-5 py-2 text-center text-[11px] tracking-wide text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function CommerceNavigationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="commerce-navigation-content"
      className={cn(
        "grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-5 md:p-7",
        className,
      )}
      {...props}
    />
  );
}
