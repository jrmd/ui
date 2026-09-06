"use client";
import * as React from "react";
import { SidebarLayout } from "./sidebar-layout";
export function InsetSidebar(
  props: Omit<React.ComponentProps<typeof SidebarLayout>, "variant">,
) {
  return <SidebarLayout variant="inset" {...props} />;
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
export function InsetSidebarRoot({
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
export function InsetSidebarPanel(props: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar variant="inset" collapsible="icon" {...props} />;
}
export function InsetSidebarHeader(
  props: React.ComponentProps<typeof SidebarHeader>,
) {
  return <SidebarHeader {...props} />;
}
export function InsetSidebarBody(
  props: React.ComponentProps<typeof SidebarContent>,
) {
  return <SidebarContent {...props} />;
}
export function InsetSidebarFooter(
  props: React.ComponentProps<typeof SidebarFooter>,
) {
  return <SidebarFooter {...props} />;
}
export function InsetSidebarContent(
  props: React.ComponentProps<typeof SidebarInset>,
) {
  return <SidebarInset {...props} />;
}
export function InsetSidebarTrigger(
  props: React.ComponentProps<typeof SidebarTrigger>,
) {
  return <SidebarTrigger {...props} />;
}
