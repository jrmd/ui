"use client";
import * as React from "react";
import { Dialog as D } from "radix-ui";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
export function StudioNavigation({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex items-center justify-between rounded-xl bg-[#22251f] p-6 text-[#ebe9dc]",
        className,
      )}
    >
      <a
        href="/templates/agency/preview"
        className="font-display text-2xl font-bold tracking-tighter"
      >
        OTHER®
      </a>
      <div className="flex items-center gap-6">
        <a
          href="/templates/agency/preview/contact"
          className="hidden items-center gap-2 text-xs sm:flex"
        >
          Have something in mind?
          <ArrowUpRight size={15} />
        </a>
        <D.Root>
          <D.Trigger className="flex items-center gap-3 rounded-full border border-white/30 px-4 py-2.5 text-xs">
            Menu
            <Menu size={16} />
          </D.Trigger>
          <D.Portal>
            <D.Overlay className="jez-overlay fixed inset-0 z-40 bg-black/50" />
            <D.Content className="jez-sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#22251f] p-8 text-[#ebe9dc] md:p-12">
              <div className="flex items-center justify-between">
                <D.Title className="font-display text-xl">OTHER®</D.Title>
                <D.Close
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full border border-white/30"
                >
                  <X size={18} />
                </D.Close>
              </div>
              <D.Description className="mt-4 text-xs text-white/50">
                Independent design. A different point of view.
              </D.Description>
              <nav aria-label="Studio navigation" className="my-auto grid">
                {["Work", "Studio", "Contact"].map((name, i) => (
                  <a
                    key={name}
                    href={`/templates/agency/preview/${name.toLowerCase()}`}
                    className="group flex items-center gap-5 border-b border-white/20 py-6 font-display text-4xl tracking-tight md:text-5xl"
                  >
                    <span className="text-xs text-white/40">0{i + 1}</span>
                    <span className="flex-1">{name}</span>
                    <ArrowUpRight className="size-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                ))}
              </nav>
              <p className="text-xs text-white/50">
                Good work starts with a conversation.
              </p>
            </D.Content>
          </D.Portal>
        </D.Root>
      </div>
    </header>
  );
}
