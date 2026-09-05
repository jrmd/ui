# Components with styled defaults

Install a component once; its named parts are included in the same file. No extra registry item is needed for CardHeader or DialogContent. Native props pass through each part and `className` merges overrides. The [complete audit](COMPONENT_API_AUDIT.md) records the decision for all 91 components.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/jez-ui/ui/card";
import { Button } from "@/components/jez-ui/ui/button";

<Card>
  <CardHeader>
    <CardTitle>Your workspace</CardTitle>
    <CardDescription>A shared home for your projects.</CardDescription>
  </CardHeader>
  <CardContent>Invite your team when you are ready.</CardContent>
  <CardFooter>
    <Button>Invite teammates</Button>
  </CardFooter>
</Card>;
```

CardAction sits beside the title and description. FieldGroup spaces several FormField instances, while FieldRow aligns a switch or checkbox with its label. Use the lower-level Field parts for more unusual structures.

Tabs, Accordion, Select, menus and overlays accept children. For example, assemble DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription and DialogFooter inside Dialog. Use `asChild` on triggers and link-capable parts to preserve your button or router component. Supply a title and accessible label for every composed overlay/control.

Convenience APIs such as `Tabs items={...}`, `Select options={...}` and `Dialog trigger={...}` remain available. Avoid mixing a shortcut with custom child parts: the shortcut owns that layout. Tooltip composition requires TooltipProvider; its `content` shortcut includes a provider automatically.

ResizablePanelGroup accepts adjacent ResizablePanel and ResizableHandle children, with `defaultSize` and `minSize` expressed as percentages. Use direct panel/handle children so the group can associate each divider with its neighbours. Set `direction="vertical"` for stacked panes. The original left/right ResizablePanels shortcut remains available.

ToastProvider, ToastRoot, ToastViewport, ToastTitle, ToastDescription, ToastAction and ToastClose support app-controlled notifications. The original Toast shortcut remains a standalone interactive example.

# Compose blocks from your own content

Heroes accept `title`, `description`, and `actionLabel` where used. Every hero's remaining text lives in its named `copy` slots: brand, eyebrow, captions, footer notes, and animation labels. Its exported `*Copy` object lists defaults. Empty strings hide text; omitted values retain the design. The catalogue customiser exposes these slots and exports matching JSX.

```tsx
<DistortionHero
  title="Nothing stays the same."
  description="An independent design practice."
  actionLabel="Our work"
  href="/work"
  artworkText="NORTH"
  copy={{ brand: "NORTH / DESIGN OFFICE", meta: "EST. 2026" }}
/>
```

`artworkText` updates the distortion texture and reduced-motion fallback. `imageSrc` and `imageAlt` replace hero media; Collage Hero also exposes `secondaryImageSrc` and `secondaryImageAlt`. Product Demo Hero accepts children (or `preview`) to replace the complete sample project interface with your own product.

## Sidebar primitives

Install `sidebar` through the registry. All parts below come from `@/components/jez-ui/ui/sidebar`. They forward DOM props and refs. `SidebarMenuButton` and `SidebarMenuSubButton` support `asChild` for your router's links. Use any number of groups and items; menus are ordinary lists with nested submenus.

```tsx
<SidebarProvider className="h-svh min-h-0">
  <Sidebar>
    <SidebarHeader>Your workspace switcher</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild isActive={project.id === activeId}>
                <Link href={`/projects/${project.id}`}>
                  <FolderIcon />
                  <span>{project.name}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/projects/${project.id}/settings`}>
                      Settings
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Your user menu</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {children}
  </SidebarInset>
</SidebarProvider>
```

Control state through `open`/`onOpenChange`, or start with `defaultOpen`. `Sidebar` supports `icon`, `offcanvas`, and `none` collapse modes, plus sidebar, inset, and floating styles. Mobile uses a focus-managed dialog. Header and footer remain outside the scrollable content region. Set `--sidebar-width` and `--sidebar-icon-width` on the provider to change dimensions.

The Workspace, Rail, and Inset Sidebar blocks remain useful presets. Supply a `sidebar` node containing these parts to replace their navigation; their ordinary children remain the main content. Their source is a starting recipe, not a closed list of hard-coded menu items.
