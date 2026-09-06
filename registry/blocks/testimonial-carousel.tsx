"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
export type CustomerStory = {
  quote: string;
  name: string;
  role: string;
  company: string;
  color: string;
  href?: string;
};
const stories: CustomerStory[] = [
  {
    quote: "The best part? Getting back to the work we actually love.",
    name: "Rowan Ellis",
    role: "Design director",
    company: "FIELDWORK",
    color: "#dce4ce",
  },
  {
    quote:
      "One shared place for all the small things that make a big difference.",
    name: "Jamie Chen",
    role: "Studio founder",
    company: "COMMON",
    color: "#e8d8cb",
  },
  {
    quote: "We found our rhythm. The tools finally got out of the way.",
    name: "Alex Morgan",
    role: "Creative lead",
    company: "FREQUENCY",
    color: "#d8dced",
  },
];
export type TestimonialCarouselOptions = {
  items?: CustomerStory[];
  className?: string;
};
export type TestimonialCarouselProps = Omit<
  React.ComponentProps<"section">,
  keyof TestimonialCarouselOptions
> &
  TestimonialCarouselOptions;
function useTestimonialCarouselModel({
  items = stories,
  className,
  children,
  ...rootProps
}: TestimonialCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const start = React.useRef<number | null>(null);
  const active = Math.min(index, Math.max(0, items.length - 1));
  const move = (delta: number) =>
    setIndex((active + delta + items.length) % items.length);
  if (!items.length) return null;
  return {
    items,
    className,
    children,
    rootProps,
    index,
    setIndex,
    start,
    active,
    move,
  };
}
const TestimonialCarouselCompositionContext = React.createContext<ReturnType<
  typeof useTestimonialCarouselModel
> | null>(null);
function useTestimonialCarouselComposition() {
  const context = React.useContext(TestimonialCarouselCompositionContext);
  if (!context)
    throw new Error(
      "TestimonialCarousel parts must be inside TestimonialCarousel.",
    );
  return context;
}
export function TestimonialCarousel(props: TestimonialCarouselProps) {
  const model = useTestimonialCarouselModel(props);
  if (!model) return null;
  const { className, rootProps, children } = model;
  return (
    <TestimonialCarouselCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        aria-roledescription={rootProps["aria-roledescription"] ?? "carousel"}
        aria-label={rootProps["aria-label"] ?? "Customer stories"}
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-background",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <TestimonialCarouselHeading />
            <TestimonialCarouselSlides />
            <TestimonialCarouselControls />
          </>
        )}
      </section>
    </TestimonialCarouselCompositionContext.Provider>
  );
}

export function TestimonialCarouselHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-carousel-header"
      className={cn(
        "flex items-center justify-between border-b border-border px-6 py-5",
        className,
      )}
      {...props}
    />
  );
}
export function TestimonialCarouselContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-carousel-content"
      className={cn("overflow-hidden touch-pan-y", className)}
      {...props}
    />
  );
}

export function TestimonialCarouselItem({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="testimonial-carousel-item"
      className={cn(
        "grid w-full shrink-0 md:grid-cols-[.7fr_1.3fr]",
        className,
      )}
      {...props}
    />
  );
}

export function TestimonialCarouselHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TestimonialCarouselHeader>> & {
  children?: React.ReactNode;
}) {
  const { items } = useTestimonialCarouselComposition();
  return (
    <TestimonialCarouselHeader {...props}>
      {children === undefined ? (
        <>
          <p className="text-xs font-medium uppercase tracking-widest">
            In good company
          </p>
          <span className="text-xs text-muted-foreground">
            {items === stories
              ? "Illustrative customer stories"
              : "Customer stories"}
          </span>
        </>
      ) : (
        children
      )}
    </TestimonialCarouselHeader>
  );
}
export function TestimonialCarouselSlides({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TestimonialCarouselContent>> & {
  children?: React.ReactNode;
}) {
  const { items, start, active, move } = useTestimonialCarouselComposition();
  const defaultonTouchStart: NonNullable<
    React.ComponentProps<typeof TestimonialCarouselContent>["onTouchStart"]
  > = (e) => {
    start.current = e.touches[0].clientX;
  };
  const defaultonTouchEnd: NonNullable<
    React.ComponentProps<typeof TestimonialCarouselContent>["onTouchEnd"]
  > = (e) => {
    if (start.current !== null) {
      const d = start.current - e.changedTouches[0].clientX;
      if (Math.abs(d) > 45) move(d > 0 ? 1 : -1);
    }
    start.current = null;
  };
  return (
    <TestimonialCarouselContent
      {...props}
      onTouchStart={(event) => {
        props.onTouchStart?.(event);
        if (!event.defaultPrevented) defaultonTouchStart(event);
      }}
      onTouchEnd={(event) => {
        props.onTouchEnd?.(event);
        if (!event.defaultPrevented) defaultonTouchEnd(event);
      }}
    >
      {children === undefined ? (
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {items.map((item, i) => (
            <TestimonialCarouselItem key={item.name} aria-hidden={i !== active}>
              <div
                style={{ background: item.color }}
                className="relative flex min-h-44 items-center justify-center overflow-hidden p-8 text-[#20271f] md:min-h-80"
              >
                <div
                  aria-hidden
                  className="absolute size-52 rounded-full border-[28px] border-current opacity-10"
                />
                <span className="relative font-display text-2xl font-bold tracking-tighter">
                  {item.company}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
                <blockquote className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
                  “{item.quote}”
                </blockquote>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                  {item.href && (
                    <a
                      tabIndex={i === active ? 0 : -1}
                      href={item.href}
                      aria-label={`Read ${item.company} story`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
                </div>
              </div>
            </TestimonialCarouselItem>
          ))}
        </div>
      ) : (
        children
      )}
    </TestimonialCarouselContent>
  );
}
export function TestimonialCarouselControls({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { items, setIndex, active, move } = useTestimonialCarouselComposition();
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-between border-t border-border px-6 py-4",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <div className="flex gap-1">
            {items.map((s, i) => (
              <button
                key={s.name}
                aria-label={`Go to story ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="grid size-8 place-items-center"
              >
                <span
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i === active ? "w-6 bg-foreground" : "w-2 bg-border",
                  )}
                />
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            Story {active + 1} of {items.length}
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Previous quote"
              onClick={() => move(-1)}
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              aria-label="Next quote"
              onClick={() => move(1)}
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
