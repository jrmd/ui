"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "../ui/utils";
import { ArrowUpRight } from "lucide-react";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export type StudioFooterOptions = {
  className?: string;
  brand?: string;
  title?: string;
  href?: string;
  actionLabel?: string;
  groups?: FooterLinkGroup[];
};
export type StudioFooterProps = Omit<
  React.ComponentProps<"footer">,
  keyof StudioFooterOptions
> &
  StudioFooterOptions;
function useStudioFooterModel({
  className,
  brand = "Good company.",
  title = "Have something in mind?",
  href = "mailto:hello@example.com",
  actionLabel = "Let’s talk",
  groups,
  children,
  ...rootProps
}: StudioFooterProps) {
  return {
    className,
    brand,
    title,
    href,
    actionLabel,
    groups,
    children,
    rootProps,
  };
}
const StudioFooterCompositionContext = React.createContext<ReturnType<
  typeof useStudioFooterModel
> | null>(null);
function useStudioFooterComposition() {
  const context = React.useContext(StudioFooterCompositionContext);
  if (!context)
    throw new Error("StudioFooter parts must be inside StudioFooter.");
  return context;
}
export function StudioFooter(props: StudioFooterProps) {
  const model = useStudioFooterModel(props);
  const { className, rootProps, children } = model;
  return (
    <StudioFooterCompositionContext.Provider value={model}>
      <footer
        {...rootProps}
        className={cn(
          "rounded-xl bg-[#26362c] p-7 text-[#e7eddf] md:p-12",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <StudioFooterHeading />
            <StudioFooterContact />
            <StudioFooterColumns />
          </>
        )}
      </footer>
    </StudioFooterCompositionContext.Provider>
  );
}

export function StudioFooterTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="studio-footer-title"
      className={cn(
        "max-w-xl text-4xl leading-tight tracking-tight md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
export function StudioFooterContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="studio-footer-content"
      className={cn(
        "mt-16 grid gap-10 border-t border-[#aabca3]/40 pt-8 md:grid-cols-2",
        className,
      )}
      {...props}
    />
  );
}

export function StudioFooterHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof StudioFooterTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useStudioFooterComposition();
  return (
    <StudioFooterTitle {...props}>
      {children === undefined ? title : children}
    </StudioFooterTitle>
  );
}
export function StudioFooterContact({
  children,
  asChild,
  ...props
}: Partial<React.ComponentProps<"a">> & { children?: React.ReactNode } & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";
  const { href, actionLabel } = useStudioFooterComposition();
  return (
    <Comp
      href={href}
      {...props}
      className={cn(
        "mt-7 inline-flex items-center gap-4 border-b border-current pb-2 text-2xl hover:opacity-80",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          {actionLabel}
          <ArrowUpRight aria-hidden size={28} />
        </>
      ) : (
        children
      )}
    </Comp>
  );
}
export function StudioFooterColumns({
  children,
  ...props
}: Partial<React.ComponentProps<typeof StudioFooterContent>> & {
  children?: React.ReactNode;
}) {
  const { brand, groups } = useStudioFooterComposition();
  return (
    <StudioFooterContent {...props}>
      {children === undefined ? (
        <>
          <p className="text-2xl">{brand}</p>
          <FooterLinks groups={groups} />
        </>
      ) : (
        children
      )}
    </StudioFooterContent>
  );
}
