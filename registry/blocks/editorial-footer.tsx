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
function useEditorialFooterModel({
  className,
  brand = "The Sunday Edit.",
  description = "Notes on design, culture, and paying closer attention.",
  groups,
  children,
  ...rootProps
}: EditorialFooterProps) {
  return { className, brand, description, groups, children, rootProps };
}
const EditorialFooterCompositionContext = React.createContext<ReturnType<
  typeof useEditorialFooterModel
> | null>(null);
function useEditorialFooterComposition() {
  const context = React.useContext(EditorialFooterCompositionContext);
  if (!context)
    throw new Error("EditorialFooter parts must be inside EditorialFooter.");
  return context;
}
export function EditorialFooter(props: EditorialFooterProps) {
  const model = useEditorialFooterModel(props);
  const { className, rootProps, children } = model;
  return (
    <EditorialFooterCompositionContext.Provider value={model}>
      <footer
        {...rootProps}
        className={cn("border-t border-border py-10", className)}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <EditorialFooterColumns />
            <EditorialFooterNote />
          </>
        )}
      </footer>
    </EditorialFooterCompositionContext.Provider>
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

export function EditorialFooterColumns({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialFooterContent>> & {
  children?: React.ReactNode;
}) {
  const { brand, description, groups } = useEditorialFooterComposition();
  return (
    <EditorialFooterContent {...props}>
      {children === undefined ? (
        <>
          <div>
            <EditorialFooterTitle>{brand}</EditorialFooterTitle>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <FooterLinks groups={groups} />
        </>
      ) : (
        children
      )}
    </EditorialFooterContent>
  );
}
export function EditorialFooterNote({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialFooterDescription>> & {
  children?: React.ReactNode;
}) {
  const {} = useEditorialFooterComposition();
  return (
    <EditorialFooterDescription {...props}>
      {children === undefined
        ? "An illustrative publication · Made with Jez UI"
        : children}
    </EditorialFooterDescription>
  );
}
