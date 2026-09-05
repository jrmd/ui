"use client";
import * as React from "react";
import {
  ArrowRight,
  Check,
  Layers,
  Users,
  UserRound,
  ArrowLeft,
} from "lucide-react";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export function OnboardingWizard({ className }: { className?: string }) {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [workspace, setWorkspace] = React.useState("");
  const [mode, setMode] = React.useState("Team");
  return (
    <section
      className={cn(
        "grid overflow-hidden rounded-2xl border border-border md:grid-cols-[220px_minmax(0,1fr)]",
        className,
      )}
    >
      <aside className="border-b border-border bg-muted/40 p-6 md:border-r md:border-b-0">
        <Layers size={25} />
        <p className="mb-7 mt-5 text-sm font-semibold">Make yourself at home</p>
        <ol className="flex gap-4 md:grid md:gap-6">
          {["Your details", "Your workspace", "Ready to go"].map((label, i) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm"
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border text-xs",
                  i <= step
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:inline",
                  i !== step && "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </aside>
      <div className="p-6 sm:p-9">
        <p className="mb-2 text-xs text-muted-foreground">
          Step {step + 1} of 3
        </p>
        <h2 className="font-display text-2xl">
          {step === 0
            ? "First, a proper introduction."
            : step === 1
              ? "A space for your best work."
              : `You’re all set, ${name.split(" ")[0]}.`}
        </h2>
        <p className="mb-7 mt-2 text-sm text-muted-foreground">
          {step === 0
            ? "Let’s put a name to the work."
            : step === 1
              ? "Name your workspace and choose how you’ll use it."
              : "Here’s the workspace you’ve put together."}
        </p>
        {step < 2 ? (
          <form
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              setStep((s) => s + 1);
            }}
          >
            {step === 0 ? (
              <label className="grid gap-2 text-sm font-medium">
                Your name
                <Input
                  required
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            ) : (
              <>
                <label className="grid gap-2 text-sm font-medium">
                  Workspace name
                  <Input
                    required
                    placeholder="Acme Studio"
                    value={workspace}
                    onChange={(e) => setWorkspace(e.target.value)}
                  />
                </label>
                <fieldset>
                  <legend className="mb-3 text-sm font-medium">
                    Who’s joining you?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {["Personal", "Team"].map((value, i) => (
                      <label
                        key={value}
                        className={cn(
                          "relative cursor-pointer rounded-xl border p-4 transition-colors",
                          mode === value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/40",
                        )}
                      >
                        <input
                          className="sr-only peer"
                          type="radio"
                          name="mode"
                          value={value}
                          checked={mode === value}
                          onChange={() => setMode(value)}
                        />
                        {i ? <Users size={20} /> : <UserRound size={20} />}
                        <span className="mt-3 block text-sm font-medium peer-focus-visible:underline">
                          {value}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {i
                            ? "Shared projects & handoffs"
                            : "A space of your own"}
                        </span>
                        {mode === value && (
                          <Check className="absolute right-3 top-3" size={14} />
                        )}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
            <div className="mt-2 flex justify-between border-t border-border pt-5">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft size={15} />
                  Back
                </Button>
              ) : (
                <span />
              )}
              <Button type="submit">
                Continue
                <ArrowRight size={15} />
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-5">
              <span className="grid size-12 place-items-center rounded-xl bg-primary font-display text-xl text-primary-foreground">
                {workspace.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-medium">{workspace}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode} workspace · {name}
                </p>
              </div>
              <Check className="ml-auto" size={20} />
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Your choices are ready in this preview.
            </p>
            <Button variant="outline" onClick={() => setStep(0)}>
              Edit setup
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
