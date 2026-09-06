"use client";
import * as React from "react";
import { SidebarLayout } from "./sidebar-layout";
export function WorkspaceSidebar(
  props: Omit<React.ComponentProps<typeof SidebarLayout>, "variant">,
) {
  return <SidebarLayout variant="workspace" {...props} />;
}

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "../ui/sidebar";
import { cn } from "../ui/utils";
export function WorkspaceSidebarRoot({
  className,
  ...props
}: React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider
      defaultOpen={true}
      className={cn(
        "min-h-[620px] overflow-hidden rounded-xl border border-border",
        className,
      )}
      {...props}
    />
  );
}
export function WorkspaceSidebarPanel(
  props: React.ComponentProps<typeof Sidebar>,
) {
  return <Sidebar variant="sidebar" collapsible="icon" {...props} />;
}
export function WorkspaceSidebarHeader(
  props: React.ComponentProps<typeof SidebarHeader>,
) {
  return <SidebarHeader {...props} />;
}
export function WorkspaceSidebarBody(
  props: React.ComponentProps<typeof SidebarContent>,
) {
  return <SidebarContent {...props} />;
}
export function WorkspaceSidebarFooter(
  props: React.ComponentProps<typeof SidebarFooter>,
) {
  return <SidebarFooter {...props} />;
}
export function WorkspaceSidebarContent(
  props: React.ComponentProps<typeof SidebarInset>,
) {
  return <SidebarInset {...props} />;
}
export function WorkspaceSidebarTrigger(
  props: React.ComponentProps<typeof SidebarTrigger>,
) {
  return <SidebarTrigger {...props} />;
}
