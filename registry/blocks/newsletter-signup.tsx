"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { ArrowUpRight, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export type NewsletterSignupOptions = {
  className?: string;
  onSubmit?: (email: string) => Promise<void>;
  heading?: React.ReactNode;
  description?: React.ReactNode;
};
export type NewsletterSignupProps = Omit<
  React.ComponentProps<"form">,
  keyof NewsletterSignupOptions
> &
  NewsletterSignupOptions;

function useNewsletterSignupModel({
  heading = (
    <>
      Good work starts
      <br />
      with a good read.
    </>
  ),
  description = "A monthly edit of design discoveries, work in progress, and things worth keeping. Written by people who make things.",
  className,
  onSubmit,
  children,
  ...rootProps
}: NewsletterSignupProps) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return {
    heading,
    description,
    className,
    onSubmit,
    children,
    rootProps,
    status,
    setStatus,
    busy,
    setBusy,
  };
}
const NewsletterSignupCompositionContext = React.createContext<ReturnType<
  typeof useNewsletterSignupModel
> | null>(null);
function useNewsletterSignupComposition() {
  const context = React.useContext(NewsletterSignupCompositionContext);
  if (!context)
    throw new Error("NewsletterSignup parts must be inside NewsletterSignup.");
  return context;
}
export function NewsletterSignup(props: NewsletterSignupProps) {
  const model = useNewsletterSignupModel(props);
  const { className, onSubmit, rootProps, setStatus, setBusy, children } =
    model;
  return (
    <NewsletterSignupCompositionContext.Provider value={model}>
      <form
        {...rootProps}
        className={cn(
          "relative grid gap-5 overflow-hidden rounded-2xl border border-border bg-muted/30 p-7 sm:p-10",
          className,
        )}
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const email = String(new FormData(e.currentTarget).get("email"));
          try {
            await onSubmit?.(email);
            setStatus(
              onSubmit
                ? "You’re on the list."
                : "Demo complete. No email was sent.",
            );
          } catch {
            setStatus("Unable to subscribe. Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <NewsletterSignupEyebrow />
            <NewsletterSignupHeading />
            <NewsletterSignupLead />
            <NewsletterSignupFields />
            <NewsletterSignupPrivacy />
            <NewsletterSignupStatus />
          </>
        )}
      </form>
    </NewsletterSignupCompositionContext.Provider>
  );
}

export function NewsletterSignupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="newsletter-signup-content"
      className={cn(
        "flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function NewsletterSignupTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="newsletter-signup-title"
      className={cn(
        "max-w-lg font-display text-3xl leading-tight sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
export function NewsletterSignupDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="newsletter-signup-description"
      className={cn(
        "max-w-md text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function NewsletterSignupEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NewsletterSignupContent>> & {
  children?: React.ReactNode;
}) {
  const {} = useNewsletterSignupComposition();
  return (
    <NewsletterSignupContent {...props}>
      {children === undefined ? (
        <>
          <Mail size={15} />
          The studio dispatch
        </>
      ) : (
        children
      )}
    </NewsletterSignupContent>
  );
}
export function NewsletterSignupHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NewsletterSignupTitle>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useNewsletterSignupComposition();
  return (
    <NewsletterSignupTitle {...props}>
      {children === undefined ? heading : children}
    </NewsletterSignupTitle>
  );
}
export function NewsletterSignupLead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NewsletterSignupDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useNewsletterSignupComposition();
  return (
    <NewsletterSignupDescription {...props}>
      {children === undefined ? description : children}
    </NewsletterSignupDescription>
  );
}
export function NewsletterSignupFields({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { busy } = useNewsletterSignupComposition();
  return (
    <div
      {...props}
      className={cn(
        "mt-2 flex max-w-lg flex-col gap-2 sm:flex-row",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <Input
            type="email"
            name="email"
            required
            aria-label="Email address"
            placeholder="you@example.com"
          />
          <Button type="submit" loading={busy}>
            Subscribe <ArrowUpRight size={16} />
          </Button>
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function NewsletterSignupPrivacy({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  return (
    <p
      {...props}
      className={cn("text-xs text-muted-foreground", props.className)}
    >
      {children === undefined
        ? "One email a month. Unsubscribe whenever you like."
        : children}
    </p>
  );
}
export function NewsletterSignupStatus({ children }: React.PropsWithChildren) {
  const { status } = useNewsletterSignupComposition();
  return children === undefined
    ? status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )
    : children;
}
