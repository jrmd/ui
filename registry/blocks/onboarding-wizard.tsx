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
import { useControllable } from "../ui/use-controllable";
import { useAsyncAction } from "../ui/use-async-action";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export type OnboardingWizardOptions = {
  onComplete?: (value: {
    name: string;
    workspace: string;
    mode: string;
  }) => void | Promise<void>;
  className?: string;
  steps?: typeof OnboardingWizardDefaultSteps;
  modes?: typeof OnboardingWizardDefaultModes;
  step?: number;
  defaultStep?: number;
  onStepChange?: (value: number) => void;
};
export type OnboardingWizardProps = Omit<
  React.ComponentProps<"section">,
  keyof OnboardingWizardOptions
> &
  OnboardingWizardOptions;
const OnboardingWizardDefaultSteps = [
  "Your details",
  "Your workspace",
  "Ready to go",
];
const OnboardingWizardDefaultModes = ["Personal", "Team"];
function useOnboardingWizardModel({
  onComplete,
  step: suppliedValue,
  defaultStep = 0,
  onStepChange,
  steps = OnboardingWizardDefaultSteps,
  modes = OnboardingWizardDefaultModes,
  className,
  children,
  ...rootProps
}: OnboardingWizardProps) {
  const action = useAsyncAction();
  const [step, setStep] = useControllable<number>(
    suppliedValue,
    defaultStep,
    onStepChange,
  );
  const [name, setName] = React.useState("");
  const [workspace, setWorkspace] = React.useState("");
  const [mode, setMode] = React.useState("Team");
  return {
    onComplete,
    suppliedValue,
    defaultStep,
    onStepChange,
    steps,
    modes,
    className,
    children,
    rootProps,
    action,
    step,
    setStep,
    name,
    setName,
    workspace,
    setWorkspace,
    mode,
    setMode,
  };
}
const OnboardingWizardCompositionContext = React.createContext<ReturnType<
  typeof useOnboardingWizardModel
> | null>(null);
function useOnboardingWizardComposition() {
  const context = React.useContext(OnboardingWizardCompositionContext);
  if (!context)
    throw new Error("OnboardingWizard parts must be inside OnboardingWizard.");
  return context;
}
export function OnboardingWizard(props: OnboardingWizardProps) {
  const model = useOnboardingWizardModel(props);
  const { className, rootProps, children } = model;
  return (
    <OnboardingWizardCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "grid overflow-hidden rounded-2xl border border-border md:grid-cols-[220px_minmax(0,1fr)]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <OnboardingWizardSteps />
            <OnboardingWizardStepContent />
          </>
        )}
      </section>
    </OnboardingWizardCompositionContext.Provider>
  );
}

export function OnboardingWizardAside({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="onboarding-wizard-aside"
      className={cn(
        "border-b border-border bg-muted/40 p-6 md:border-r md:border-b-0",
        className,
      )}
      {...props}
    />
  );
}
export function OnboardingWizardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="onboarding-wizard-content"
      className={cn("p-6 sm:p-9", className)}
      {...props}
    />
  );
}
export function OnboardingWizardTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="onboarding-wizard-title"
      className={cn("font-display text-2xl", className)}
      {...props}
    />
  );
}

export function OnboardingWizardItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="onboarding-wizard-item"
      className={cn("flex items-center gap-3 text-sm", className)}
      {...props}
    />
  );
}

export function OnboardingWizardSteps({
  children,
  ...props
}: Partial<React.ComponentProps<typeof OnboardingWizardAside>> & {
  children?: React.ReactNode;
}) {
  const { steps, step } = useOnboardingWizardComposition();
  return (
    <OnboardingWizardAside {...props}>
      {children === undefined ? (
        <>
          <Layers size={25} />
          <p className="mb-7 mt-5 text-sm font-semibold">
            Make yourself at home
          </p>
          <ol className="flex gap-4 md:grid md:gap-6">
            {steps.map((label, i) => (
              <OnboardingWizardItem
                key={label}
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
              </OnboardingWizardItem>
            ))}
          </ol>
        </>
      ) : (
        children
      )}
    </OnboardingWizardAside>
  );
}
export function OnboardingWizardStepContent({
  children,
  ...props
}: Partial<React.ComponentProps<typeof OnboardingWizardContent>> & {
  children?: React.ReactNode;
}) {
  const {
    onComplete,
    modes,
    action,
    step,
    setStep,
    name,
    setName,
    workspace,
    setWorkspace,
    mode,
    setMode,
  } = useOnboardingWizardComposition();
  return (
    <OnboardingWizardContent {...props}>
      {children === undefined ? (
        <>
          {action.error && <p role="alert">{action.error}</p>}
          <p className="mb-2 text-xs text-muted-foreground">
            Step {step + 1} of 3
          </p>
          <OnboardingWizardTitle>
            {step === 0
              ? "First, a proper introduction."
              : step === 1
                ? "A space for your best work."
                : `You’re all set, ${name.split(" ")[0]}.`}
          </OnboardingWizardTitle>
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
                if (step === 1)
                  void action.run(async () => {
                    await onComplete?.({ name, workspace, mode });
                    setStep(2);
                  });
                else setStep(1);
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
                      {modes.map((value, i) => (
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
                            <Check
                              className="absolute right-3 top-3"
                              size={14}
                            />
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
                <Button
                  type="submit"
                  loading={action.pending}
                  disabled={action.pending}
                >
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
        </>
      ) : (
        children
      )}
    </OnboardingWizardContent>
  );
}
