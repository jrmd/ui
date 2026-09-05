"use client";
import * as React from "react";
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
export function StudioFooter({
  className,
  brand = "Good company.",
  title = "Have something in mind?",
  href = "mailto:hello@example.com",
  actionLabel = "Let’s talk",
  groups,
  children,
  ...rootProps
}: StudioFooterProps) {
  return (
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
          <StudioFooterTitle>{title}</StudioFooterTitle>
          <a
            href={href}
            className="mt-7 inline-flex items-center gap-4 border-b border-current pb-2 text-2xl hover:opacity-80"
          >
            {actionLabel}
            <ArrowUpRight aria-hidden size={28} />
          </a>
          <StudioFooterContent>
            <p className="text-2xl">{brand}</p>
            <FooterLinks groups={groups} />
          </StudioFooterContent>
        </>
      )}
    </footer>
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
