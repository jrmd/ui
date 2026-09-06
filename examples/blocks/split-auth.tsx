"use client";
import * as React from "react";
import {
  SplitAuth,
  SplitAuthAside,
  SplitAuthMain,
} from "../../registry/blocks/split-auth";
export default function Example() {
  const [mode, setMode] = React.useState<
    "sign-in" | "sign-up" | "reset-request" | "reset-password"
  >("sign-in");
  return (
    <SplitAuth
      mode={mode}
      onModeChange={setMode}
      resetFormProps={
        mode === "reset-request"
          ? {
              onSubmit: async () => {
                setMode("reset-password");
              },
            }
          : undefined
      }
      footer={
        mode === "reset-request" ? (
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() => setMode("reset-password")}
          >
            Set new password
          </button>
        ) : undefined
      }
    >
      <SplitAuthAside />
      <SplitAuthMain />
    </SplitAuth>
  );
}
