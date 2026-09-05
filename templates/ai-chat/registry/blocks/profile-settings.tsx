"use client";
import * as React from "react";
import { useAsyncAction } from "../ui/use-async-action";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
import { useControllable } from "../ui/use-controllable";
const initial = { name: "Alex Morgan", email: "alex@example.com" };
export type ProfileSettingsOptions = {
  className?: string;
  value?: typeof initial;
  defaultValue?: typeof initial;
  onValueChange?: (value: typeof initial) => void;
  heading?: React.ReactNode;
  onSave?: (value: typeof initial) => void | Promise<void>;
};
export type ProfileSettingsProps = Omit<
  React.ComponentProps<"form">,
  keyof ProfileSettingsOptions
> &
  ProfileSettingsOptions;

export function ProfileSettings({
  heading = <>Personal details</>,
  className,
  value: controlledValue,
  defaultValue = initial,
  onValueChange,
  onSave,
  children,
  ...rootProps
}: ProfileSettingsProps) {
  const action = useAsyncAction();
  const [profile, setProfile] = useControllable<typeof initial>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const reset = () => setProfile(defaultValue);
  const [saved, setSaved] = React.useState(false);
  return (
    <form
      {...rootProps}
      className={cn(
        "grid max-w-xl gap-5 rounded-xl border border-border p-6",
        className,
      )}
      onSubmit={(e) => {
        rootProps.onSubmit?.(e);
        if (e.defaultPrevented) return;

        e.preventDefault();
        void action.run(async () => {
          await onSave?.(profile);
          setSaved(true);
        });
      }}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {action.error && <p role="alert">{action.error}</p>}
          <ProfileSettingsContent>
            <ProfileSettingsTitle>{heading}</ProfileSettingsTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              How you appear to the people you work with.
            </p>
          </ProfileSettingsContent>
          <div className="flex items-center gap-4 pb-2">
            <span className="grid size-14 place-items-center rounded-full bg-primary/10 font-display text-xl text-primary">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <p className="text-sm font-medium">{profile.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your initials are used as your avatar.
              </p>
            </div>
          </div>
          <FormField label="Name">
            <Input
              required
              value={profile.name}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
                setSaved(false);
              }}
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              required
              value={profile.email}
              onChange={(e) => {
                setProfile({ ...profile, email: e.target.value });
                setSaved(false);
              }}
            />
          </FormField>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={action.pending}
              loading={action.pending}
            >
              Save profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                reset();
                setSaved(false);
              }}
            >
              Reset changes
            </Button>
          </div>
          {saved && (
            <p role="status" className="text-sm">
              {onSave ? "Changes saved." : "Changes kept in this preview."}
            </p>
          )}
        </>
      )}
    </form>
  );
}

export function ProfileSettingsContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-settings-content"
      className={cn("border-b border-border pb-5", className)}
      {...props}
    />
  );
}
export function ProfileSettingsTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="profile-settings-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
