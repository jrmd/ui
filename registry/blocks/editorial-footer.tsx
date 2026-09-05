"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export type EditorialFooterOptions = {
  className?: string;
  brand?: string;
  description?: string;
  groups?: FooterLinkGroup[];
};
export type EditorialFooterProps = Omit<
  React.ComponentProps<"footer">,
  keyof EditorialFooterOptions
> &
  EditorialFooterOptions;
export function EditorialFooter({
  className,
  brand = "The Sunday Edit.",
  description = "Notes on design, culture, and paying closer attention.",
  groups,
  children,
  ...rootProps
}: EditorialFooterProps) {
  return (
    <footer
      {...rootProps}
      className={cn("border-t border-border py-10", className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <EditorialFooterContent>
            <div>
              <EditorialFooterTitle>{brand}</EditorialFooterTitle>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <FooterLinks groups={groups} />
          </EditorialFooterContent>
          <EditorialFooterDescription>
            An illustrative publication · Made with Jez UI
          </EditorialFooterDescription>
        </>
      )}
    </footer>
  );
}

export function EditorialFooterContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editorial-footer-content"
      className={cn("grid gap-10 md:grid-cols-2", className)}
      {...props}
    />
  );
}
export function EditorialFooterTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="editorial-footer-title"
      className={cn("max-w-sm font-serif text-5xl leading-tight", className)}
      {...props}
    />
  );
}
export function EditorialFooterDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="editorial-footer-description"
      className={cn(
        "mt-12 border-t border-border pt-5 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
