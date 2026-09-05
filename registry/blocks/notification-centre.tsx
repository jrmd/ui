"use client";
import * as React from "react";
import { CheckCheck, Download, AtSign, CircleCheck } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type NotificationCentreOptions = {
  className?: string;
  items?: typeof NotificationCentreDefaultItems;
  filters?: typeof NotificationCentreDefaultFilters;
  readIds?: string[];
  defaultReadIds?: string[];
  onReadIdsChange?: (value: string[]) => void;
};
export type NotificationCentreProps = Omit<
  React.ComponentProps<"section">,
  keyof NotificationCentreOptions
> &
  NotificationCentreOptions;
const NotificationCentreDefaultItems = [
  {
    id: "export",
    title: "Your export is ready",
    detail: "September report · CSV",
    time: "2m",
    icon: Download,
  },
  {
    id: "mention",
    title: "Sam mentioned you in a comment",
    detail: "“Can you take a look at the updated brief?”",
    time: "18m",
    icon: AtSign,
  },
  {
    id: "review",
    title: "A project is ready for review",
    detail: "Field notes · Homepage exploration",
    time: "1h",
    icon: CircleCheck,
  },
];
const NotificationCentreDefaultFilters = [false, true];
export function NotificationCentre({
  readIds: suppliedValue,
  defaultReadIds = [],
  onReadIdsChange,
  items = NotificationCentreDefaultItems,
  filters = NotificationCentreDefaultFilters,
  className,
  children,
  ...rootProps
}: NotificationCentreProps) {
  const [read, setRead] = useControllable<string[]>(
    suppliedValue,
    defaultReadIds,
    onReadIdsChange,
  );
  const [unreadOnly, setUnreadOnly] = React.useState(false);

  return (
    <section
      {...rootProps}
      className={cn(
        "overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <NotificationCentreHeader>
            <NotificationCentreTitle>
              Inbox{" "}
              <span className="ml-1 text-sm text-muted-foreground">
                {items.filter((item) => !read.includes(item.id)).length}
              </span>
            </NotificationCentreTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setRead(items.map((i) => i.id))}
            >
              <CheckCheck size={15} />
              Mark all read
            </Button>
          </NotificationCentreHeader>
          <NotificationCentreContent>
            {filters.map((v) => (
              <NotificationCentreItem
                key={String(v)}
                onClick={() => setUnreadOnly(v)}
                className={cn(
                  unreadOnly === v
                    ? "border-primary font-medium"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {v ? "Unread" : "All activity"}
              </NotificationCentreItem>
            ))}
          </NotificationCentreContent>
          {items
            .filter((i) => !unreadOnly || !read.includes(i.id))
            .map((i) => (
              <button
                key={i.id}
                onClick={() =>
                  setRead((r) => (r.includes(i.id) ? r : [...r, i.id]))
                }
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border/60 p-5 text-left transition-colors last:border-0 hover:bg-muted/40",
                  !read.includes(i.id) && "bg-primary/3",
                )}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background">
                  <i.icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{i.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {i.detail}
                  </span>
                </span>
                <span className="grid justify-items-end gap-2 text-xs text-muted-foreground">
                  {i.time}
                  {!read.includes(i.id) && (
                    <span className="size-1.5 rounded-full bg-primary" />
                  )}
                  <span className="sr-only">
                    {read.includes(i.id) ? "Read" : "Unread"}
                  </span>
                </span>
              </button>
            ))}
          {unreadOnly && items.every((item) => read.includes(item.id)) && (
            <p className="p-10 text-center text-sm text-muted-foreground">
              You’re all caught up.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export function NotificationCentreHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-centre-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 p-5",
        className,
      )}
      {...props}
    />
  );
}
export function NotificationCentreTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="notification-centre-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
export function NotificationCentreContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-centre-content"
      className={cn("flex gap-5 border-b border-border px-5", className)}
      {...props}
    />
  );
}

export function NotificationCentreItem({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="notification-centre-item"
      className={cn("border-b-2 pb-3 text-sm", className)}
      {...props}
    />
  );
}
