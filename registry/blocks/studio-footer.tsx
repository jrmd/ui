"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { ArrowUpRight } from "lucide-react";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export function StudioFooter({
  className,
  brand = "Good company.",
  title = "Have something in mind?",
  href = "mailto:hello@example.com",
  actionLabel = "Let’s talk",
  groups,
}: {
  className?: string;
  brand?: string;
  title?: string;
  href?: string;
  actionLabel?: string;
  groups?: FooterLinkGroup[];
}) {
  return (
    <footer
      className={cn(
        "rounded-xl bg-[#26362c] p-7 text-[#e7eddf] md:p-12",
        className,
      )}
    >
      <h2 className="max-w-xl text-4xl leading-tight tracking-tight md:text-6xl">
        {title}
      </h2>
      <a
        href={href}
        className="mt-7 inline-flex items-center gap-4 border-b border-current pb-2 text-2xl hover:opacity-80"
      >
        {actionLabel}
        <ArrowUpRight aria-hidden size={28} />
      </a>
      <div className="mt-16 grid gap-10 border-t border-[#aabca3]/40 pt-8 md:grid-cols-2">
        <p className="text-2xl">{brand}</p>
        <FooterLinks groups={groups} />
      </div>
    </footer>
  );
}
