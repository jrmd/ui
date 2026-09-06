"use client";
import * as React from "react";
import { SidebarLayout } from "./sidebar-layout";
export function RailSidebar(
  props: Omit<React.ComponentProps<typeof SidebarLayout>, "variant">,
) {
  return <SidebarLayout variant="rail" {...props} />;
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
export function RailSidebarRoot({
  className,
  ...props
}: React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider
      defaultOpen={false}
      className={cn(
        "min-h-[620px] overflow-hidden rounded-xl border border-border",
        className,
      )}
      {...props}
    />
  );
}
export function RailSidebarPanel(props: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar variant="sidebar" collapsible="icon" {...props} />;
}
export function RailSidebarHeader(
  props: React.ComponentProps<typeof SidebarHeader>,
) {
  return <SidebarHeader {...props} />;
}
export function RailSidebarBody(
  props: React.ComponentProps<typeof SidebarContent>,
) {
  return <SidebarContent {...props} />;
}
export function RailSidebarFooter(
  props: React.ComponentProps<typeof SidebarFooter>,
) {
  return <SidebarFooter {...props} />;
}
export function RailSidebarContent(
  props: React.ComponentProps<typeof SidebarInset>,
) {
  return <SidebarInset {...props} />;
}
export function RailSidebarTrigger(
  props: React.ComponentProps<typeof SidebarTrigger>,
) {
  return <SidebarTrigger {...props} />;
}
