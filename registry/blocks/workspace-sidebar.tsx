"use client";
import * as React from "react";
import { SidebarLayout } from "./sidebar-layout";
export function WorkspaceSidebar(
  props: Omit<React.ComponentProps<typeof SidebarLayout>, "variant">,
) {
  return <SidebarLayout variant="workspace" {...props} />;
}
