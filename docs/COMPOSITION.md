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

## Block migration status

All 92 registered blocks now have a compiled composition example in `examples/blocks`. The catalogue's **Composition** preview runs that exact example; **Compose your own** shows its source. The preset preview remains available beside it.

There are two kinds of parts. Styled primitives such as titles, content containers, rows and actions accept your children directly. Functional sections such as KanbanBoardComposer, ChatWorkspaceMessages and TerrainHeroControls read the nearest block root's state and supply their default contents. Both support replacement content; rendered elements forward native props and refs. Conditional status parts can render nothing and therefore expose children rather than a DOM ref.

Keep functional sections under their corresponding root. Reorder, omit or wrap them without duplicating their state. Set data and action callbacks on the root; override a section's children for a different layout. Link parts support asChild where applicable. Custom forms must retain meaningful names, labels and any required fields.

```tsx
<KanbanBoard value={tasks} onValueChange={setTasks}>
  <KanbanBoardFooter />
  <KanbanBoardComposer className="max-w-none" />
  <KanbanBoardColumns />
  <KanbanBoardStatus />
</KanbanBoard>
```

The three sidebar variants expose Root, Panel, Header, Body, Footer, Content and Trigger parts built on the focus-managed Sidebar primitives. Their original component names preserve the existing main-content shortcut. ArticleSidebarRoot, ApplicationShellRoot and ProductDemoHeroRoot likewise provide full child composition while the original components retain their established article/page/preview children.

```tsx
<ProductDemoHeroRoot>
  <ProductDemoHeroIntro />
  <ProductDemoHeroPreview>
    <YourApplication />
  </ProductDemoHeroPreview>
  <ProductDemoHeroCaption>Try the controls above.</ProductDemoHeroCaption>
</ProductDemoHeroRoot>
```

FeatureGridItem takes a numeric `value`; FeatureGridPanel with the same value displays when selected. The root owns selection through value/defaultValue/onValueChange, including when panels and controls are reordered. FeatureGridHeader names the heading area; the older FeatureGridContent export retains that layout for compatibility.

PricingTableBillingToggle and PricingTablePrice share the root's billing state, discount and formatter. TaskListItem identifies a root task with taskId; TaskListCheckbox, TaskListTitle and TaskListStatus read that task and update the caller's controlled collection. Layout parts accept native attributes, refs and className.

MediaAsideDescription and MediaAsideAction preserve the preset spacing and typography. MediaAsideAction supports asChild for a router link. CTA Section exposes Content, Title, Description and Action; its Action uses Button's variants and asChild support.

```tsx
import {
  MediaAside,
  MediaAsideContent,
  MediaAsideTitle,
  MediaAsideMedia,
  MediaAsideDescription,
  MediaAsideAction,
} from "@/components/jez-ui/blocks/media-aside";

<MediaAside id="story" className="rounded-none">
  <MediaAsideContent>
    <MediaAsideTitle>
      A <em>different</em> perspective
    </MediaAsideTitle>
    <MediaAsideDescription>Stories from our workshop.</MediaAsideDescription>
    <MediaAsideAction asChild>
      <Link href="/story">Read the story</Link>
    </MediaAsideAction>
  </MediaAsideContent>
  <MediaAsideMedia src="/our-photo.jpg" alt="Our workshop" />
</MediaAside>;
```

Parts supply their normal typography and spacing. Native props and refs target the element the part renders. className uses tailwind-merge: responsive variants remain independent, so override `md:p-12` with `md:p-4`, or use an explicit important utility when overriding every breakpoint. Inline style targets the root and merges with existing root styles.

Existing exceptions keep their established meaning: ProductDemoHero children replace its product preview (use its exported layout parts for other arrangements), and sidebar children are the main content while the sidebar prop replaces navigation. Provider roots such as Dialog and Select expose DOM attributes on their rendered parts.

### Caller-owned state and actions

TaskList, KanbanBoard, ProfileSettings, TeamManagement, BillingSettings and ChatWorkspace accept value, defaultValue and onValueChange. Their state is local to the instance unless controlled. The registry modules no longer read or write localStorage. Put persistence in the calling application. Default datasets remain illustrative presets.

CalendarSchedule and FeatureGrid expose value/defaultValue/onValueChange. Calendar events carry id, date and content. NotificationCentre exposes readIds/defaultReadIds/onReadIdsChange. WorkspaceNavigation supports value/defaultValue/onValueChange for the current view; OnboardingWizard exposes step/defaultStep/onStepChange and an async onComplete callback with the collected name, workspace and mode. Existing action callbacks remain available.

```tsx
<TaskList value={tasks} onValueChange={setTasks} />
<ProfileSettings defaultValue={profile} onSave={saveProfile} />
<ChatWorkspace value={messages} onValueChange={setMessages}
  onSend={(prompt, { messages, signal }) => sendMessage({ prompt, messages, signal })} />
```

ProfileSettings and BillingSettings accept async onSave; TeamManagement accepts async onInvite. Pending submissions are disabled and failures appear as alerts before any local success is committed. Local editing callbacks can also feed an application data layer. ChatWorkspace requires onSend for responses; it passes an AbortSignal, cancels pending responses on stop/unmount/conversation change, and ignores cancelled results. The catalogue supplies its own illustrative response callback.

### Content and internal customization

Feature, testimonial, comparison, activity and navigation presets accept their own datasets. PricingTable accepts plans, an annual price per plan, billing state, a discount, a formatter and renderAction. FeatureComparison uses stable plan IDs and a feature matrix keyed by those IDs. UsagePricing accepts seat pricing functions. Use children and named parts when changing the structure rather than extending a preset with unrelated options. Collection blocks also expose row, quote, label, value or table primitives where those are meaningful.

Login presets accept form to replace the complete form, or formProps to customize LoginFields. LoginFields also accepts native root props and children. This supports custom providers and field order without changing the presentation source.

SearchInput and PasswordInput retain wrapper className for compatibility; inputClassName targets the input. SearchInput's forwarded ref and its clear-and-focus action both target the same input.

DataTable accepts options for TanStack state, stable getRowId, manual pagination and other table behavior. toolbar and footer accept nodes or render functions receiving the table instance; emptyState and loading customize status. Function children receive the same instance for a fully composed table using the exported Table parts. Table accepts containerProps for its scrolling wrapper.

ChartFrame exports ChartCaption and ChartContent. Chart presets accept native figure props and children for a replacement plot. AuroraBackground accepts colors and duration; other effect roots accept style overrides. Hero interfaces now list only supported props instead of accepting unused shared media/effect options.

### Verification

`pnpm test:composition` typechecks and runs the independent Vite consumer fixture. It starts its own server. Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH when using a system browser. Coverage includes all 92 compiled compositions at desktop and mobile widths, every registered block's root attributes and refs, shared section state, form labels and submissions, menus, artwork controls, sidebar focus, input focus, table identity, pricing, async saves and chat callbacks. Catalogue rendering and interaction tests remain separate. Run `pnpm fixtures:verify` to install the registry through the real shadcn CLI into Vite and Next.js projects, compile all 92 composition examples against the installed files, and build both applications.

See [current composition inventory](COMPOSITION_INVENTORY.md) for the exported parts in each entry file.

## Marketing feature families

FeatureCarousel offers `layout="spotlight"` and `layout="rail"`. FeatureCarousel, FeatureTabs and ExpandableFeatures accept `items`, `value`, `defaultValue`, and `onValueChange`. Item values are stable IDs. Supply preview nodes and your own content through the exported parts; carousel rotation is user initiated. FeatureTabs uses arrow keys, Home and End; expandable media panels become disclosures on mobile.

FeatureMosaic, FeatureSpotlight, ProductBento and IntegrationBento provide different feature hierarchies. Use the named grid, tile, copy and preview parts to change a layout. Dataset-based presets accept empty or extended collections; `children={null}` suppresses default contents. FeatureSpotlight only displays its action when you supply `href`.

HowItWorksHorizontal and HowItWorksVertical accept `steps`. Each step can include custom `media`, while the presets show distinct brief, collaboration and decision previews. Horizontal steps stack on mobile; vertical steps alternate copy and media on wide screens. Both use ordered lists so sequence remains meaningful to assistive technology.

## Authentication shells and recovery

CenteredAuth, SplitAuth and InsetAuth share four modes: `sign-in`, `sign-up`, `reset-request`, and `reset-password`. Use `defaultMode` for an initial mode or control navigation with `mode` and `onModeChange`. The zero-prop presets navigate locally. Mode changes clear the previous form state.

`form` replaces the form completely; `formProps` customizes LoginFields; `resetFormProps` customizes PasswordResetForm. Supply `onSubmit` and `onSSO` for sign-in/sign-up integration, and `resetFormProps.onSubmit` for password recovery. The application owns provider calls and reset tokens. The shells do not authenticate users or send mail by themselves. PasswordResetForm also works independently with `mode="request"` or `mode="new-password"`.

All three composition examples demonstrate mode navigation. Their reset-request callback only advances the illustrative UI to the new-password form; it does not validate a recovery token or send email.
