"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function TestimonialCarousel({ className }: { className?: string }) {
  const quotes = [
    "A little less searching. A lot more making.",
    "Everything we need, with room to breathe.",
    "The whole team can see what comes next.",
  ];
  const [index, setIndex] = React.useState(0);
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sample customer stories"
      className={cn("py-10", className)}
    >
      <p className="mb-5 text-xs text-muted-foreground">Illustrative quotes</p>
      <blockquote
        aria-live="polite"
        className="max-w-2xl font-display text-3xl"
      >
        “{quotes[index]}”
      </blockquote>
      <div className="mt-7 flex items-center gap-3">
        <Button
          variant="outline"
          aria-label="Previous quote"
          onClick={() => setIndex((index + 2) % 3)}
        >
          ←
        </Button>
        <span className="text-sm">{index + 1} / 3</span>
        <Button
          variant="outline"
          aria-label="Next quote"
          onClick={() => setIndex((index + 1) % 3)}
        >
          →
        </Button>
      </div>
    </section>
  );
}
