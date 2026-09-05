"use client";
import * as React from "react";
import {
  ArrowUpRight,
  Check,
  FileText,
  MessageSquare,
  GitBranch,
} from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
const defaultFeatures = [
  {
    title: "Keep the decision with the work.",
    text: "Briefs, comments, and the latest decision belong beside the task. Pick up where the conversation left off.",
    icon: MessageSquare,
  },
  {
    title: "Give every task an owner.",
    text: "See who’s moving things forward, what’s waiting for review, and where someone needs a hand.",
    icon: GitBranch,
  },
  {
    title: "Leave a useful paper trail.",
    text: "A short project brief gives everyone the same starting point. Keep the scope and release criteria close.",
    icon: FileText,
  },
];
export type FeatureGridOptions = {
  className?: string;
  features?: typeof defaultFeatures;
  renderPreview?: (
    feature: (typeof defaultFeatures)[number],
    index: number,
  ) => React.ReactNode;
  comments?: typeof FeatureGridDefaultComments;
  handoffs?: typeof FeatureGridDefaultHandoffs;
  releaseCriteria?: typeof FeatureGridDefaultReleaseCriteria;
  heading?: React.ReactNode;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};
export type FeatureGridProps = Omit<
  React.ComponentProps<"section">,
  keyof FeatureGridOptions
> &
  FeatureGridOptions;
const FeatureGridDefaultComments = [
  [
    "JL",
    "Jo",
    "Could we keep recent projects above the search results? That covers most switches.",
  ],
  [
    "SK",
    "Sam",
    "Yes. I’ll show the last five, with the current project pinned at the top.",
  ],
];
const FeatureGridDefaultHandoffs = [
  ["Design review", "Jo Lee", "Complete"],
  ["Implementation", "Sam Kim", "In progress"],
  ["Release notes", "Alex Morgan", "Up next"],
];
const FeatureGridDefaultReleaseCriteria = [
  "Recent projects are one click away",
  "Every action works from the keyboard",
  "Empty and loading states are reviewed",
];
export function FeatureGrid({
  value: suppliedValue,
  defaultValue = 0,
  onValueChange,
  features = defaultFeatures,
  renderPreview,
  comments = FeatureGridDefaultComments,
  handoffs = FeatureGridDefaultHandoffs,
  releaseCriteria = FeatureGridDefaultReleaseCriteria,
  heading = (
    <>
      The context is part
      <br />
      of the project.
    </>
  ),
  className,
  children,
  ...rootProps
}: FeatureGridProps) {
  const [active, setActive] = useControllable<number>(
    suppliedValue,
    defaultValue,
    onValueChange,
  );
  const activeIndex = Math.min(Math.max(active, 0), features.length - 1);
  return (
    <section
      {...rootProps}
      className={cn("border-y border-border py-12 md:py-20", className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <FeatureGridContent>
            <FeatureGridTitle>{heading}</FeatureGridTitle>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:justify-self-end">
              Work doesn’t happen in a list alone. Give your team the decisions,
              ownership, and detail they need to finish it.
            </p>
          </FeatureGridContent>
          <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-16">
            <div className="grid content-start">
              {features.map((f, i) => (
                <FeatureGridItem
                  key={f.title}
                  type="button"
                  aria-pressed={activeIndex === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    activeIndex === i
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <f.icon
                      size={17}
                      className={activeIndex === i ? "text-primary" : ""}
                    />
                    <span className="flex-1 text-base font-medium">
                      {f.title}
                    </span>
                    <ArrowUpRight size={15} />
                  </span>
                  <span className="mt-3 block max-w-md pl-[29px] text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </span>
                </FeatureGridItem>
              ))}
            </div>
            <div
              className="flex min-h-[330px] flex-col justify-center rounded-xl bg-muted/60 p-6 md:p-9"
              aria-live="polite"
            >
              {!features.length ? null : renderPreview ? (
                renderPreview(features[activeIndex], activeIndex)
              ) : features !== defaultFeatures ? (
                <div>
                  <FeatureGridItemTitle>
                    {features[activeIndex].title}
                  </FeatureGridItemTitle>
                  <p>{features[activeIndex].text}</p>
                </div>
              ) : activeIndex === 0 ? (
                <div>
                  <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                    <span className="text-xs font-medium">
                      Project switcher
                    </span>
                    <span className="text-xs text-muted-foreground">
                      2 comments
                    </span>
                  </div>
                  {comments.map(([initials, name, text]) => (
                    <div key={name} className="mb-6 flex gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-[10px]">
                        {initials}
                      </span>
                      <div>
                        <p className="text-xs font-medium">{name}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-primary">
                    <Check size={14} /> Decision recorded in the project brief
                  </div>
                </div>
              ) : activeIndex === 1 ? (
                <div>
                  <FeatureGridItemTitle>
                    A handoff without the meeting.
                  </FeatureGridItemTitle>
                  {handoffs.map(([step, owner, status], i) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 border-t border-border py-5"
                    >
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-full text-xs",
                          i === 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-background",
                        )}
                      >
                        {i === 0 ? (
                          <Check size={14} />
                        ) : (
                          owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        )}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {owner}
                        </p>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText size={15} /> Project brief · Updated by Alex
                  </div>
                  <h3 className="mb-5 mt-6 text-2xl">Workspace launch</h3>
                  <p className="text-sm leading-relaxed">
                    Make it easier to move between projects without losing your
                    place.
                  </p>
                  <h4 className="mb-3 mt-6 text-xs font-medium">
                    Ready to release when
                  </h4>
                  <ul className="grid gap-3 text-xs text-muted-foreground">
                    {releaseCriteria.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check size={13} className="text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function FeatureGridContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="feature-grid-content"
      className={cn("mb-10 grid gap-4 md:grid-cols-2", className)}
      {...props}
    />
  );
}
export function FeatureGridTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="feature-grid-title"
      className={cn("max-w-md text-3xl leading-tight md:text-4xl", className)}
      {...props}
    />
  );
}
export function FeatureGridItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="feature-grid-itemtitle"
      className={cn("mb-6 text-lg", className)}
      {...props}
    />
  );
}

export function FeatureGridItem({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="feature-grid-item"
      className={cn(
        "border-b border-border py-6 text-left first:pt-0 last:border-0",
        className,
      )}
      {...props}
    />
  );
}
