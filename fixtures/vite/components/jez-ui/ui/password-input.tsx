"use client";
import * as React from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "./input";
import { cn } from "./utils";
export function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
  const [visible, setVisible] = React.useState(false);
  const reduce = useReducedMotion();
  return (
    <div className={cn("group relative w-full", className)}>
      <LockKeyhole
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
      />
      <Input
        aria-label="Password"
        autoComplete="current-password"
        {...props}
        type={visible ? "text" : "password"}
        className="px-10"
      />
      <button
        type="button"
        disabled={props.disabled}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-1 top-1 grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={String(visible)}
            initial={{
              opacity: 0,
              rotate: reduce ? 0 : -35,
              scale: reduce ? 1 : 0.7,
            }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{
              opacity: 0,
              rotate: reduce ? 0 : 35,
              scale: reduce ? 1 : 0.7,
            }}
            transition={{ duration: reduce ? 0 : 0.12 }}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
