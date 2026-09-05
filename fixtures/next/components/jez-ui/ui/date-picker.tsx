"use client";
import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "./utils";
import { Popover } from "./popover";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { useControllable } from "./use-controllable";
export function DatePicker({
  value,
  defaultValue = "",
  onValueChange,
  label = "Choose date",
  className,
  id: inputId,
  name,
  disabled,
  ...triggerProps
}: Omit<
  React.ComponentProps<typeof Button>,
  "value" | "defaultValue" | "onChange" | "children"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const [date, setDate] = useControllable(value, defaultValue, onValueChange);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {name && (
        <input type="hidden" name={name} value={date} disabled={disabled} />
      )}
      <Popover
        open={open}
        onOpenChange={setOpen}
        className="w-auto p-0"
        trigger={
          <Button
            {...triggerProps}
            id={inputId}
            disabled={disabled}
            variant="outline"
            aria-label={label}
            className={cn("min-w-56 justify-start font-normal", className)}
          >
            <CalendarDays size={16} className="text-muted-foreground" />
            {date
              ? new Date(date + "T12:00:00").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : label}
          </Button>
        }
      >
        <Calendar
          value={date}
          onValueChange={(d) => {
            setDate(d);
            setOpen(false);
          }}
        />
      </Popover>
    </>
  );
}
