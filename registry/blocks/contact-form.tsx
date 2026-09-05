"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { ArrowUpRight } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
export type ContactFormOptions = {
  className?: string;
  onSubmit?: (data: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void>;
  heading?: React.ReactNode;
};
export type ContactFormProps = Omit<
  React.ComponentProps<"form">,
  keyof ContactFormOptions
> &
  ContactFormOptions;

export function ContactForm({
  heading = <>What are you working on?</>,
  className,
  onSubmit,
  children,
  ...rootProps
}: ContactFormProps) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return (
    <form
      {...rootProps}
      className={cn(
        "grid w-full gap-7 rounded-2xl border border-border bg-background p-6 sm:p-9",
        className,
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setBusy(true);
        try {
          await onSubmit?.({
            name: String(f.get("name")),
            email: String(f.get("email")),
            message: String(f.get("message")),
          });
          setStatus(
            onSubmit
              ? "Message sent. Thank you."
              : "Your enquiry is ready. This demo does not send messages.",
          );
        } catch {
          setStatus("Message could not be sent. Please try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <ContactFormContent>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Start a conversation
            </p>
            <ContactFormTitle>{heading}</ContactFormTitle>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tell us about the project, the challenge, or the idea you can’t
              stop thinking about.
            </p>
          </ContactFormContent>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Your name">
              <Input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                placeholder="Alex Morgan"
              />
            </FormField>
            <FormField label="Email address">
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="alex@studio.com"
              />
            </FormField>
          </div>
          <FormField
            label="About your project"
            hint="A rough outline is a good place to start."
          >
            <Textarea
              name="message"
              required
              minLength={10}
              placeholder="We’re building…"
              className="min-h-40"
            />
          </FormField>
          <Button type="submit" loading={busy} className="justify-self-start">
            Send enquiry <ArrowUpRight size={16} />
          </Button>
          {status && (
            <p role="status" className="text-sm">
              {status}
            </p>
          )}
        </>
      )}
    </form>
  );
}

export function ContactFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="contact-form-content"
      className={cn("border-b border-border pb-6", className)}
      {...props}
    />
  );
}
export function ContactFormTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="contact-form-title"
      className={cn("font-display text-3xl", className)}
      {...props}
    />
  );
}
