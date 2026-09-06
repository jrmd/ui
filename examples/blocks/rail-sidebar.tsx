"use client";
import { Archive, Folder, Settings, Square } from "lucide-react";
import {
  RailSidebarRoot,
  RailSidebarPanel,
  RailSidebarHeader,
  RailSidebarBody,
  RailSidebarFooter,
  RailSidebarContent,
  RailSidebarTrigger,
} from "../../registry/blocks/rail-sidebar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../registry/ui/sidebar";
export default function Example() {
  return (
    <RailSidebarRoot>
      <RailSidebarPanel>
        <RailSidebarHeader className="flex-row items-center gap-2">
          <Square className="size-4 shrink-0" aria-hidden="true" />
          <span className="group-data-[state=collapsed]/sidebar:sr-only">
            Our studio
          </span>
        </RailSidebarHeader>
        <RailSidebarBody>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {["Work", "Archive"].map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <a href={"#" + label.toLowerCase()}>
                      {label === "Work" ? (
                        <Folder aria-hidden="true" />
                      ) : (
                        <Archive aria-hidden="true" />
                      )}
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </RailSidebarBody>
        <RailSidebarFooter>
          <SidebarMenuButton asChild>
            <a href="#settings">
              <Settings aria-hidden="true" />
              <span>Studio settings</span>
            </a>
          </SidebarMenuButton>
        </RailSidebarFooter>
      </RailSidebarPanel>
      <RailSidebarContent>
        <header className="flex items-center gap-3 border-b border-border p-4">
          <RailSidebarTrigger />
          Your workspace
        </header>
        <main className="p-6">Your own page content.</main>
      </RailSidebarContent>
    </RailSidebarRoot>
  );
}
