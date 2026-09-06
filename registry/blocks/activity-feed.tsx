"use client";
import * as React from "react";
import { Check, MessageSquare, Paperclip } from "lucide-react";
import { cn } from "../ui/utils";
export type ActivityFeedOptions = {
  className?: string;
  items?: typeof ActivityFeedDefaultItems;
  heading?: React.ReactNode;
};
export type ActivityFeedProps = Omit<
  React.ComponentProps<"section">,
  keyof ActivityFeedOptions
> &
  ActivityFeedOptions;
const ActivityFeedDefaultItems = [
  {
    name: "Alex Morgan",
    initials: "AM",
    action: "shared a new homepage direction",
    time: "10 minutes ago",
    icon: Paperclip,
    detail: "Homepage exploration.fig · 2.4 MB",
  },
  {
    name: "Sam Patel",
    initials: "SP",
    action: "completed the accessibility review",
    time: "45 minutes ago",
    icon: Check,
    detail: "Keyboard navigation and focus states are ready for review.",
  },
  {
    name: "Robin Lee",
    initials: "RL",
    action: "left a note on the project brief",
    time: "2 hours ago",
    icon: MessageSquare,
    detail: "“The simpler direction gives the work much more room.”",
  },
];
function useActivityFeedModel({
  items = ActivityFeedDefaultItems,
  heading = "Activity",
  className,
  children,
  ...rootProps
}: ActivityFeedProps) {
  return { items, heading, className, children, rootProps };
}
const ActivityFeedCompositionContext = React.createContext<ReturnType<
  typeof useActivityFeedModel
> | null>(null);
function useActivityFeedComposition() {
  const context = React.useContext(ActivityFeedCompositionContext);
  if (!context)
    throw new Error("ActivityFeed parts must be inside ActivityFeed.");
  return context;
}
export function ActivityFeed(props: ActivityFeedProps) {
  const model = useActivityFeedModel(props);
  const { className, rootProps, children } = model;
  return (
    <ActivityFeedCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <ActivityFeedHeading />
            <ActivityFeedEntries />
          </>
        )}
      </section>
    </ActivityFeedCompositionContext.Provider>
  );
}

export function ActivityFeedHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="activity-feed-header"
      className={cn("mb-6 flex items-center justify-between", className)}
      {...props}
    />
  );
}
export function ActivityFeedTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="activity-feed-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

export function ActivityFeedItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="activity-feed-item"
      className={cn("relative flex gap-3 pb-7 last:pb-0", className)}
      {...props}
    />
  );
}

export function ActivityFeedHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ActivityFeedHeader>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useActivityFeedComposition();
  return (
    <ActivityFeedHeader {...props}>
      {children === undefined ? (
        <>
          <ActivityFeedTitle>{heading}</ActivityFeedTitle>
          <span className="text-xs text-muted-foreground">Today</span>
        </>
      ) : (
        children
      )}
    </ActivityFeedHeader>
  );
}
export function ActivityFeedEntries({
  children,
  ...props
}: Partial<React.ComponentProps<"ol">> & { children?: React.ReactNode }) {
  const { items } = useActivityFeedComposition();
  return (
    <ol {...props}>
      {children === undefined
        ? items.map((item, i) => (
            <ActivityFeedItem key={item.name}>
              {i < items.length - 1 && (
                <span className="absolute bottom-0 left-4 top-9 w-px bg-border" />
              )}
              <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-border bg-muted text-xs font-medium">
                {item.initials}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-sm leading-relaxed">
                  <strong className="font-medium">{item.name}</strong>{" "}
                  <span className="text-muted-foreground">{item.action}.</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.time}
                </p>
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-border/70 bg-muted/20 p-3 text-sm leading-relaxed">
                  <item.icon
                    className="mt-0.5 shrink-0 text-muted-foreground"
                    size={15}
                  />
                  {item.detail}
                </div>
              </div>
            </ActivityFeedItem>
          ))
        : children}
    </ol>
  );
}
