"use client";
import {
  InsetSidebarRoot,
  InsetSidebarPanel,
  InsetSidebarHeader,
  InsetSidebarBody,
  InsetSidebarFooter,
  InsetSidebarContent,
  InsetSidebarTrigger,
} from "../../registry/blocks/inset-sidebar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../registry/ui/sidebar";
export default function Example() {
  return (
    <InsetSidebarRoot>
      <InsetSidebarPanel>
        <InsetSidebarHeader>Our studio</InsetSidebarHeader>
        <InsetSidebarBody>
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
        </InsetSidebarBody>
        <InsetSidebarFooter>Studio settings</InsetSidebarFooter>
      </InsetSidebarPanel>
      <InsetSidebarContent>
        <header className="flex items-center gap-3 border-b border-border p-4">
          <InsetSidebarTrigger />
          Your workspace
        </header>
        <main className="p-6">Your own page content.</main>
      </InsetSidebarContent>
    </InsetSidebarRoot>
  );
}
