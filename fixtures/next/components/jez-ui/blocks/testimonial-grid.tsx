"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function TestimonialGrid({ className }: { className?: string }) {
  return (
    <section className={cn("py-8", className)}>
      <h2 className="text-3xl">Room for your customers’ stories.</h2>
      <p className="mt-2 mb-7 text-sm text-muted-foreground">
        Sample quotes for layout demonstration.
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          "The best part is knowing where everything belongs.",
          "It gave our small team a little more room to think.",
          "A calmer way to get from the first idea to the finished thing.",
        ].map((q, i) => (
          <figure key={q} className="m-0 border-t border-border pt-5">
            <blockquote className="text-xl leading-relaxed">“{q}”</blockquote>
            <figcaption className="mt-5 text-xs text-muted-foreground">
              Sample customer {i + 1} · Illustrative quote
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
