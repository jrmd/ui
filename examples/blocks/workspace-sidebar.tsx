"use client";
import {
  WorkspaceSidebarRoot,
  WorkspaceSidebarPanel,
  WorkspaceSidebarHeader,
  WorkspaceSidebarBody,
  WorkspaceSidebarFooter,
  WorkspaceSidebarContent,
  WorkspaceSidebarTrigger,
} from "../../registry/blocks/workspace-sidebar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../registry/ui/sidebar";
export default function Example() {
  return (
    <WorkspaceSidebarRoot>
      <WorkspaceSidebarPanel>
        <WorkspaceSidebarHeader>Our studio</WorkspaceSidebarHeader>
        <WorkspaceSidebarBody>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {["Work", "Archive"].map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <a href={"#" + label.toLowerCase()}>
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </WorkspaceSidebarBody>
        <WorkspaceSidebarFooter>Studio settings</WorkspaceSidebarFooter>
      </WorkspaceSidebarPanel>
      <WorkspaceSidebarContent>
        <header className="flex items-center gap-3 border-b border-border p-4">
          <WorkspaceSidebarTrigger />
          Your workspace
        </header>
        <main className="p-6">Your own page content.</main>
      </WorkspaceSidebarContent>
    </WorkspaceSidebarRoot>
  );
}
