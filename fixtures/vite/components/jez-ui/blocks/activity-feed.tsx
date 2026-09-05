"use client";
import * as React from "react";
import { Check, MessageSquare, Paperclip } from "lucide-react";
import { cn } from "../ui/utils";
export function ActivityFeed({ className }: { className?: string }) {
  const items = [
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
  return (
    <section className={cn("", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Activity</h2>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
      <ol>
        {items.map((item, i) => (
          <li key={item.name} className="relative flex gap-3 pb-7 last:pb-0">
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
              <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-border/70 bg-muted/20 p-3 text-sm leading-relaxed">
                <item.icon
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  size={15}
                />
                {item.detail}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
