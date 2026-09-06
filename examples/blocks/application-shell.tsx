"use client";
import {
  ApplicationShellRoot,
  ApplicationShellNavigation,
  ApplicationShellWorkspace,
} from "../../registry/blocks/application-shell";

export default function Example() {
  return (
    <ApplicationShellRoot>
      <ApplicationShellNavigation />
      <ApplicationShellWorkspace />
    </ApplicationShellRoot>
  );
}
