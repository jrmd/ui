"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
import { useDemoState } from "./demo-state";
const initial = { name: "Alex Morgan", email: "alex@example.com" };
export function ProfileSettings({ className }: { className?: string }) {
  const [profile, setProfile, reset] = useDemoState("profile", initial);
  const [saved, setSaved] = React.useState(false);
  return (
    <form
      className={cn(
        "grid max-w-xl gap-5 rounded-xl border border-border p-6",
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <div className="border-b border-border pb-5">
        <h2 className="text-lg font-semibold">Personal details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How you appear to the people you work with.
        </p>
      </div>
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
        <Button type="submit">Save profile</Button>
        <Button
          variant="ghost"
          onClick={() => {
            reset();
            setSaved(false);
          }}
        >
          Reset demo
        </Button>
      </div>
      {saved && (
        <p role="status" className="text-sm">
          Saved on this device.
        </p>
      )}
    </form>
  );
}
