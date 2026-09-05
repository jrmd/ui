"use client";
import * as React from "react";
import { Check, LoaderCircle, Pause, Play } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { WorkspaceHeading } from "./workspace-parts";
const steps = [
  {
    title: "Read the project brief",
    detail: "Find the audience, constraints, and desired outcome.",
  },
  {
    title: "Explore the options",
    detail: "Compare three directions against the brief.",
  },
  {
    title: "Draft the recommendation",
    detail: "Turn the strongest direction into a clear next step.",
  },
  {
    title: "Ready for your review",
    detail: "A complete draft, with decisions explained.",
  },
];
export function AgentRun({ className }: { className?: string }) {
  const [step, setStep] = React.useState(0),
    [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    if (!running || step >= steps.length) return;
    const timer = setTimeout(() => {
      setStep((s) => s + 1);
      if (step === steps.length - 1) setRunning(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, [running, step]);
  return (
    <section className={cn("mx-auto w-full max-w-xl", className)}>
      <WorkspaceHeading
        title="A plan in progress."
        description="Follow the work as it happens. This run is a deterministic simulation."
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (step === steps.length) setStep(0);
              setRunning((r) => !r);
            }}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}{" "}
            {running
              ? "Pause"
              : step === steps.length
                ? "Run again"
                : "Start run"}
          </Button>
        }
      />
      <ol className="grid gap-1">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4 py-4">
            <div
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full",
                i < step
                  ? "bg-accent text-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {i < step ? (
                <Check size={16} />
              ) : i === step && running ? (
                <LoaderCircle
                  size={16}
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <span className="text-xs">{i + 1}</span>
              )}
            </div>
            <div className={cn(i > step && "opacity-45")}>
              <h3 className="text-sm font-medium">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {s.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p
        role="status"
        className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground"
      >
        {step === steps.length
          ? "Run complete. Ready for a human review."
          : running
            ? `Working on step ${step + 1} of ${steps.length}.`
            : "Ready when you are. You control the pace."}
      </p>
    </section>
  );
}
