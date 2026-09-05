"use client";
import * as React from "react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Calendar } from "../ui/calendar";
export type CalendarScheduleOptions = {
  className?: string;
  events?: typeof CalendarScheduleDefaultEvents;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export type CalendarScheduleProps = Omit<
  React.ComponentProps<"div">,
  keyof CalendarScheduleOptions
> &
  CalendarScheduleOptions;
const CalendarScheduleDefaultEvents = [
  { id: "review", date: "2026-09-08", content: "09:30 · Design review" },
  { id: "focus", date: "2026-09-08", content: "11:00 · Focus time" },
  { id: "catch-up", date: "2026-09-08", content: "14:00 · Project catch-up" },
];
export function CalendarSchedule({
  value: suppliedValue,
  defaultValue = "2026-09-08",
  onValueChange,
  events = CalendarScheduleDefaultEvents,
  className,
  children,
  ...rootProps
}: CalendarScheduleProps) {
  const [date, setDate] = useControllable<string>(
    suppliedValue,
    defaultValue,
    onValueChange,
  );
  return (
    <div
      {...rootProps}
      className={cn(
        "flex flex-wrap gap-8 rounded-xl border border-border p-5",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <Calendar value={date} onValueChange={setDate} />
          <CalendarScheduleContent>
            <p className="mb-1 text-xs text-muted-foreground">Your schedule</p>
            <CalendarScheduleItemTitle>
              {new Date(date + "T12:00:00").toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </CalendarScheduleItemTitle>
            {events.some((event) => event.date === date) ? (
              <ol className="grid gap-4">
                {events
                  .filter((event) => event.date === date)
                  .map((e) => (
                    <CalendarScheduleItem key={e.id}>
                      {e.content}
                    </CalendarScheduleItem>
                  ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nothing scheduled for this day.
              </p>
            )}
          </CalendarScheduleContent>
        </>
      )}
    </div>
  );
}

export function CalendarScheduleContent({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="calendar-schedule-content"
      className={cn("min-w-48 flex-1", className)}
      {...props}
    />
  );
}
export function CalendarScheduleItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="calendar-schedule-itemtitle"
      className={cn("mb-5 text-lg font-semibold", className)}
      {...props}
    />
  );
}

export function CalendarScheduleItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="calendar-schedule-item"
      className={cn(
        "rounded-r-lg border-l-2 border-primary bg-primary/5 p-4 text-sm",
        className,
      )}
      {...props}
    />
  );
}
