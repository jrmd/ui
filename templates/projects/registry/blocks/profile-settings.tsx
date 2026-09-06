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

function useProfileSettingsModel({
  heading = "Personal details",
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
  return {
    heading,
    className,
    controlledValue,
    defaultValue,
    onValueChange,
    onSave,
    children,
    rootProps,
    action,
    profile,
    setProfile,
    reset,
    saved,
    setSaved,
  };
}
const ProfileSettingsCompositionContext = React.createContext<ReturnType<
  typeof useProfileSettingsModel
> | null>(null);
function useProfileSettingsComposition() {
  const context = React.useContext(ProfileSettingsCompositionContext);
  if (!context)
    throw new Error("ProfileSettings parts must be inside ProfileSettings.");
  return context;
}
export function ProfileSettings(props: ProfileSettingsProps) {
  const model = useProfileSettingsModel(props);
  const { className, onSave, rootProps, action, profile, setSaved, children } =
    model;
  return (
    <ProfileSettingsCompositionContext.Provider value={model}>
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
            <ProfileSettingsError />
            <ProfileSettingsIntro />
            <ProfileSettingsAvatar />
            <ProfileSettingsNameField />
            <ProfileSettingsEmailField />
            <ProfileSettingsActions />
            <ProfileSettingsStatus />
          </>
        )}
      </form>
    </ProfileSettingsCompositionContext.Provider>
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

export function ProfileSettingsError({ children }: React.PropsWithChildren) {
  const { action } = useProfileSettingsComposition();
  return children === undefined
    ? action.error && <p role="alert">{action.error}</p>
    : children;
}
export function ProfileSettingsIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ProfileSettingsContent>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useProfileSettingsComposition();
  return (
    <ProfileSettingsContent {...props}>
      {children === undefined ? (
        <>
          <ProfileSettingsTitle>{heading}</ProfileSettingsTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            How you appear to the people you work with.
          </p>
        </>
      ) : (
        children
      )}
    </ProfileSettingsContent>
  );
}
export function ProfileSettingsAvatar({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { profile } = useProfileSettingsComposition();
  return (
    <div
      {...props}
      className={cn("flex items-center gap-4 pb-2", props.className)}
    >
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function ProfileSettingsNameField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const { profile, setProfile, setSaved } = useProfileSettingsComposition();
  return (
    <FormField label="Name" {...props}>
      {children === undefined ? (
        <Input
          required
          value={profile.name}
          onChange={(e) => {
            setProfile({ ...profile, name: e.target.value });
            setSaved(false);
          }}
        />
      ) : (
        children
      )}
    </FormField>
  );
}
export function ProfileSettingsEmailField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const { profile, setProfile, setSaved } = useProfileSettingsComposition();
  return (
    <FormField label="Email" {...props}>
      {children === undefined ? (
        <Input
          type="email"
          required
          value={profile.email}
          onChange={(e) => {
            setProfile({ ...profile, email: e.target.value });
            setSaved(false);
          }}
        />
      ) : (
        children
      )}
    </FormField>
  );
}
export function ProfileSettingsActions({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { action, reset, setSaved } = useProfileSettingsComposition();
  return (
    <div {...props} className={cn("flex gap-2", props.className)}>
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function ProfileSettingsStatus({ children }: React.PropsWithChildren) {
  const { onSave, saved } = useProfileSettingsComposition();
  return children === undefined
    ? saved && (
        <p role="status" className="text-sm">
          {onSave ? "Changes saved." : "Changes kept in this preview."}
        </p>
      )
    : children;
}
