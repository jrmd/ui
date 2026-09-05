"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Calendar } from "../ui/calendar";
export function CalendarSchedule({ className }: { className?: string }) {
  const [date, setDate] = React.useState("2026-09-08");
  return (
    <div
      className={cn(
        "flex flex-wrap gap-8 rounded-xl border border-border p-5",
        className,
      )}
    >
      <Calendar value={date} onValueChange={setDate} />
      <section className="min-w-48 flex-1">
        <p className="mb-1 text-xs text-muted-foreground">Your schedule</p>
        <h3 className="mb-5 text-lg font-semibold">
          {new Date(date + "T12:00:00").toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </h3>
        {date === "2026-09-08" ? (
          <ol className="grid gap-4">
            {[
              "09:30 · Design review",
              "11:00 · Focus time",
              "14:00 · Project catch-up",
            ].map((e) => (
              <li
                key={e}
                className="rounded-r-lg border-l-2 border-primary bg-primary/5 p-4 text-sm"
              >
                {e}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nothing scheduled for this day.
          </p>
        )}
      </section>
    </div>
  );
}
