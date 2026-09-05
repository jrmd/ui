"use client";
import * as React from "react";
import { CheckCheck, Download, AtSign, CircleCheck } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function NotificationCentre({ className }: { className?: string }) {
  const [read, setRead] = React.useState<string[]>([]);
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const items = [
    {
      title: "Your export is ready",
      detail: "September report · CSV",
      time: "2m",
      icon: Download,
    },
    {
      title: "Sam mentioned you in a comment",
      detail: "“Can you take a look at the updated brief?”",
      time: "18m",
      icon: AtSign,
    },
    {
      title: "A project is ready for review",
      detail: "Field notes · Homepage exploration",
      time: "1h",
      icon: CircleCheck,
    },
  ];
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <h2 className="text-lg font-semibold">
          Inbox{" "}
          <span className="ml-1 text-sm text-muted-foreground">
            {items.length - read.length}
          </span>
        </h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRead(items.map((i) => i.title))}
        >
          <CheckCheck size={15} />
          Mark all read
        </Button>
      </div>
      <div className="flex gap-5 border-b border-border px-5">
        {[false, true].map((v) => (
          <button
            key={String(v)}
            onClick={() => setUnreadOnly(v)}
            className={cn(
              "border-b-2 pb-3 text-sm",
              unreadOnly === v
                ? "border-primary font-medium"
                : "border-transparent text-muted-foreground",
            )}
          >
            {v ? "Unread" : "All activity"}
          </button>
        ))}
      </div>
      {items
        .filter((i) => !unreadOnly || !read.includes(i.title))
        .map((i) => (
          <button
            key={i.title}
            onClick={() =>
              setRead((r) => (r.includes(i.title) ? r : [...r, i.title]))
            }
            className={cn(
              "flex w-full items-start gap-3 border-b border-border/60 p-5 text-left transition-colors last:border-0 hover:bg-muted/40",
              !read.includes(i.title) && "bg-primary/3",
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
              {!read.includes(i.title) && (
                <span className="size-1.5 rounded-full bg-primary" />
              )}
              <span className="sr-only">
                {read.includes(i.title) ? "Read" : "Unread"}
              </span>
            </span>
          </button>
        ))}
      {unreadOnly && read.length === items.length && (
        <p className="p-10 text-center text-sm text-muted-foreground">
          You’re all caught up.
        </p>
      )}
    </section>
  );
}
