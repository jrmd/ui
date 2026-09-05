# Composition and customization audit

Implementation follow-up: the collection-wide migration is recorded in [COMPOSITION.md](COMPOSITION.md) and [COMPOSITION_INVENTORY.md](COMPOSITION_INVENTORY.md). The findings below are the pre-migration baseline; they are retained as audit history.

Date: 2026-09-05. Scope: the current 91 registered components and 79 registered blocks. Baseline: Card. This report supersedes any assumption that the earlier component audit also established block composability.

## Verdict

The Card pattern is established in foundations but is not a collection-wide contract. **19 of 79 blocks expose only className; none of the 79 block entry points declares a native id prop.** This is an interface inventory and source review, not browser, accessibility, or performance certification. No runtime files were changed.

The inventory below uses TypeScript's resolved public parameter types, including aliases and intersections, and enumerates named exports from each entry file. These are discovery signals, not automatic pass/fail scores: a Radix provider need not accept DOM props, an atomic control need not have named parts, and accepting children alone does not prove composition works.

## Target contract

- Structural parts follow Card: useful default styling, arbitrary children, native props and refs on the actual element, and cn(defaults, className).
- Export parts only where callers need to replace, omit, reorder, or style something independently. Keep atomic controls direct and simple.
- Presets compose the same public parts. Retain existing shortcut APIs and default examples; document precedence when children replace a preset layout.
- Accept ReactNode for visible content. Provide action/media slots where a caller needs a router Link, framework image, extra button, or custom form.
- Data-driven modules keep useful data APIs. Expose state and callbacks where applications need ownership, stable record IDs, and explicit empty/loading/error states.
- Demo data, persistence, fake responses, and reset controls belong in preview adapters. Reusable modules receive data and actions from the caller.
- Every accepted prop has observable behavior. Root attributes, styling targets, heading semantics, and ref targets are documented.

## Prioritized findings

### P1 — Closed blocks require source edits for ordinary content

Evidence: FeatureGrid (registry/blocks/feature-grid.tsx:28), TaskList (registry/blocks/task-list.tsx:7), and the 19 class-only rows below. PricingTable (registry/blocks/pricing-table.tsx:42) adds only href: plans, currency, discount, headings and feature lists remain internal. FeatureComparison accepts title/onSelect but fixes its plans and feature matrix internally.

Impact: consumers cannot supply their own features, products, tasks or pricing through the interface. A root style override does not solve this.

Recommendation: introduce family-specific parts and data interfaces. Start with feature sections, testimonials, FAQ and pricing; expose heading/content/actions plus item-level parts. Pricing amounts and billing labels must come from caller data rather than a built-in GBP discount calculation.

### P1 — Application blocks own demonstration state

Evidence: TaskList and KanbanBoard import useDemoState with the same tasks key. ProfileSettings, TeamManagement, BillingSettings and ChatWorkspace also directly import this helper. registry/blocks/demo-state.ts:8 reads jez-demo keys from localStorage and persists changes.

Impact: these blocks cannot display and update real application state through their current public interfaces; task instances also reuse a shared persisted demo dataset.

Recommendation: data/value, defaultValue and onChange interfaces appropriate to each workflow, with async action callbacks and explicit pending/error states. Move localStorage and sample data into catalogue adapters, preserving interactive demos there. Do not build a generic application-state framework.

### P2 — Block root attributes are unavailable

Evidence: all 79 resolved entry-point types omit id, including MediaAside (registry/blocks/media-aside.tsx:4) and HeroProps (registry/blocks/hero-parts.tsx:22). Their implementations select named props and do not spread native root attributes.

Impact: section anchors, accessible relationships, refs, root event handlers and style variables require wrappers or source edits.

Recommendation: inherit the actual root element props, omit conflicting content prop names, and forward them. Reserve provider exceptions for modules with no DOM root. Preserve internal handlers through deliberate event composition.

### P2 — Content customization is not structural composition

Evidence: MediaAside allows string title/description/actionLabel but fixes image, heading, body and anchor markup. LoginFields fixes provider buttons, field order, labels and footer text (registry/blocks/login-fields.tsx). WorkspaceHeading accepts title/description strings with no per-part styles (registry/blocks/workspace-parts.tsx:4).

Impact: rich titles, alternate providers, router links, framework images, and additional actions require editing the implementation.

Recommendation: MediaAside media/content/title/description/actions parts; login layout slots around a replaceable form; shared workspace heading/title/description/actions parts. Keep the preset as a convenient composition of those parts.

### P2 — Shared hero props promise unsupported behavior

Evidence: EditorialHero (registry/blocks/editorial-hero.tsx:8) declares HeroProps but consumes only actionLabel/title/description/href/className. The inherited imageSrc, preview, artwork and other fields are accepted without rendering them.

Impact: valid TypeScript can silently do nothing. Consumers cannot trust autocomplete to describe customization.

Recommendation: factor a small common content type and explicitly add only supported media/effect fields per hero. Offer meaningful public layout parts while retaining each hero's visual identity. Add a migration note for removing previously accepted no-op props.

### P2 — Composite input styles and refs have ambiguous targets

Evidence: SearchInput (registry/ui/search-input.tsx:26) and PasswordInput (registry/ui/password-input.tsx:15) apply className to a wrapper while assigning a fixed className to Input. SearchInput sets its internal ref before spreading props, so a caller ref overrides the ref used by its clear-and-focus action.

Impact: an input background/height override styles the wrapper; supplying a ref prevents the internal clear action from using that input ref.

Recommendation: explicit wrapper/input style targets or named parts, and composed internal/external refs. Preserve current wrapper className semantics during migration rather than silently changing them.

### P2 — Table primitives do not customize the DataTable preset

Evidence: registry/ui/data-table.tsx exports Table parts, but DataTable renders its own toolbar, raw table and pagination. It fixes pageSize to 6 and uses index-based selection; it exposes no getRowId, controlled sorting/pagination, toolbar or empty-state slot.

Impact: custom columns work, but server pagination, stable selection across reordered data, custom toolbars and per-part styling require source edits or rebuilding the behavior.

Recommendation: retain TanStack behavior behind a small table context/instance seam; compose the preset using public table, toolbar and pagination parts. Accept stable identity and controlled state options needed by real callers.

### P2 — Decorative effects hide their palette behind implementation styles

Evidence: AuroraBackground (registry/ui/aurora-background.tsx:25) fixes gradient colors in an internal inline style; GradientMesh (registry/ui/gradient-mesh.tsx:16) fixes its background inline and exposes no style or palette prop.

Impact: root Tailwind overrides cannot reliably recolor the actual effect.

Recommendation: expose a small palette/CSS-variable interface and forward style to the appropriate surface. Keep authored default artwork intact.

## Existing strengths

Card supplies independent styled parts and native props. EmptyState already combines optional shortcut content with exported styled parts. Sidebar supports public composition and state ownership. Dialog/menu foundations use Radix semantics. DataTable accepts custom column renderers. Hero copy slots, sidebar replacement nodes and login callbacks are useful existing seams to preserve.

## Verification and limits

TypeScript compiler inspection covered all 170 registered entry points and their named exports. Findings above were checked against source. Existing composition tests exercise hero copy and selected foundation interactions, but do not establish a contract for every block. tests/customization.spec.ts still expects 67 blocks while scripts/verify.mjs expects 79: update catalogue count assertions during migration.

The Impeccable detector returned advisory palette/type-ramp findings (exit 2). Source inspection confirms fixed effect palettes; literal effect colors are not inherently a design defect because DESIGN.md permits authored artwork. Small demo labels alone do not establish a contrast or responsive failure. No numeric accessibility/performance score is assigned without relevant runtime measurements. No browser tests were run for this documentation-only audit.

## Migration order and acceptance

1. Establish the contract in docs/COMPOSITION.md and add a real consumer fixture exercising alternate content, omitted/reordered parts, root attributes, style overrides and refs.
2. Convert static content and pricing families, maintaining current preset examples with their own data.
3. Convert navigation and login layouts; verify router actions, form submission and keyboard behavior.
4. Extract application demo state into preview adapters; verify two independent instances and caller-controlled updates.
5. Close the composite-input, DataTable and effect customization gaps; narrow hero types to supported fields.
6. Regenerate registry artifacts and documentation. Run pnpm verify, installation fixtures and focused composition browser tests. Inspect changed presets and custom compositions at desktop/mobile sizes and in light/dark themes; check reduced-motion versions for changed effects.

Acceptance is an ordinary consumer composing real content without editing registry source or writing layout classes for the default arrangement. Each meaningful slot remains independently customizable. Passing the generator alone is insufficient.

## Complete entry-point inventory

Types are current source observations. “Native id” refers to the entry-point type, not all exported parts. “Named exports” lists capitalized exports, including supporting types, and excludes hero Copy defaults. Class-only entries are the highest-priority closed interfaces; other entries still need the family-specific work described above.

### Components

| Entry | Public interface signal | Named exports |
| --- | --- | --- |
| [Button](../registry/ui/button.tsx) | Native id; children; native/primitive props | Button, ButtonProps |
| [Icon Button](../registry/ui/icon-button.tsx) | Native id; children; native/primitive props | IconButton |
| [Badge](../registry/ui/badge.tsx) | Native id; children; native/primitive props | Badge |
| [Avatar](../registry/ui/avatar.tsx) | Native id; children; native/primitive props | Avatar, AvatarImage, AvatarFallback |
| [Card](../registry/ui/card.tsx) | Native id; children; native/primitive props | Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter |
| [Separator](../registry/ui/separator.tsx) | Native id; children; native/primitive props | Separator |
| [Skeleton](../registry/ui/skeleton.tsx) | Native id; children; native/primitive props | Skeleton |
| [Spinner](../registry/ui/spinner.tsx) | Native id; children; native/primitive props | Spinner |
| [Input](../registry/ui/input.tsx) | Native id; children; native/primitive props | Input |
| [Textarea](../registry/ui/textarea.tsx) | Native id; children; native/primitive props | Textarea |
| [Label](../registry/ui/label.tsx) | Native id; children; native/primitive props | Label |
| [Checkbox](../registry/ui/checkbox.tsx) | Native id; children; native/primitive props | Checkbox |
| [Radio Group](../registry/ui/radio-group.tsx) | Native id; children; native/primitive props | RadioGroup, RadioGroupItem |
| [Switch](../registry/ui/switch.tsx) | Native id; children; native/primitive props | Switch |
| [Select](../registry/ui/select.tsx) | Native id; children; open, defaultOpen, onOpenChange, dir, name, autoComplete, disabled, required, form, value, defaultValue, onValueChange, id, aria-describedby, aria-invalid, options, label, placeholder | Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectValue, SelectGroup |
| [Slider](../registry/ui/slider.tsx) | Native id; children; native/primitive props | Slider |
| [Toggle Group](../registry/ui/toggle-group.tsx) | Native id; children; native/primitive props | ToggleGroup, ToggleGroupItem |
| [Tabs](../registry/ui/tabs.tsx) | Native id; children; native/primitive props | Tabs, TabsList, TabsTrigger, TabsContent |
| [Accordion](../registry/ui/accordion.tsx) | Native id; children; native/primitive props | Accordion, AccordionItem, AccordionTrigger, AccordionContent |
| [Collapsible](../registry/ui/collapsible.tsx) | Native id; children; native/primitive props | Collapsible, CollapsibleTrigger, CollapsibleContent |
| [Dialog](../registry/ui/dialog.tsx) | children; open, defaultOpen, onOpenChange, modal, trigger, title, description, closeLabel, cancelLabel, confirmLabel | Dialog, DialogOverlay, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger, DialogPortal, DialogClose |
| [Alert Dialog](../registry/ui/alert-dialog.tsx) | children; open, defaultOpen, onOpenChange, trigger, title, description, onConfirm, cancelLabel, confirmLabel | AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger, AlertDialogPortal |
| [Sheet](../registry/ui/sheet.tsx) | children; open, defaultOpen, onOpenChange, modal, trigger, title, description, closeLabel, cancelLabel, confirmLabel | Sheet, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetTrigger, SheetPortal, SheetClose |
| [Popover](../registry/ui/popover.tsx) | children; open, defaultOpen, onOpenChange, modal, trigger | Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverTrigger, PopoverAnchor, PopoverClose |
| [Tooltip](../registry/ui/tooltip.tsx) | children; open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent, content | Tooltip, TooltipContent, TooltipProvider, TooltipTrigger |
| [Dropdown Menu](../registry/ui/dropdown-menu.tsx) | children; dir, open, defaultOpen, onOpenChange, modal, trigger, items | DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuGroup, DropdownMenuSub, DropdownMenuRadioGroup |
| [Context Menu](../registry/ui/context-menu.tsx) | children; open, onOpenChange, dir, modal, trigger, items | ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuShortcut, ContextMenuTrigger, ContextMenuPortal, ContextMenuGroup, ContextMenuSub, ContextMenuRadioGroup |
| [Navigation Menu](../registry/ui/navigation-menu.tsx) | Native id; children; native/primitive props | NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuItem |
| [Breadcrumb](../registry/ui/breadcrumb.tsx) | Native id; children; native/primitive props | Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator |
| [Toast](../registry/ui/toast.tsx) | title, description, trigger, dismissLabel | ToastRoot, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction, Toast, ToastProvider |
| [Sidebar](../registry/ui/sidebar.tsx) | Native id; children; native/primitive props | SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuBadge, SidebarInset, SidebarTrigger |
| [Combobox](../registry/ui/combobox.tsx) | Native id; native/primitive props | Combobox |
| [Command Palette](../registry/ui/command-palette.tsx) | items | CommandPalette |
| [Calendar](../registry/ui/calendar.tsx) | value, defaultValue, onValueChange, min, max | Calendar |
| [Date Picker](../registry/ui/date-picker.tsx) | Native id; native/primitive props | DatePicker |
| [Date Range Picker](../registry/ui/date-range-picker.tsx) | value, defaultValue, onValueChange, label, fromLabel, toLabel | DateRangePicker, DateRange |
| [Time Picker](../registry/ui/time-picker.tsx) | Native id; children; native/primitive props | TimePicker |
| [File Upload](../registry/ui/file-upload.tsx) | accept, maxBytes, multiple, onFilesChange | FileUpload |
| [OTP Input](../registry/ui/otp-input.tsx) | label, inputLabel, value, defaultValue, onValueChange, length | OtpInput |
| [Password Input](../registry/ui/password-input.tsx) | Native id; children; native/primitive props | PasswordInput |
| [Search Input](../registry/ui/search-input.tsx) | Native id; children; native/primitive props | SearchInput |
| [Tag Input](../registry/ui/tag-input.tsx) | value, defaultValue, onValueChange, label | TagInput |
| [Form Field](../registry/ui/form-field.tsx) | children; label, hint, error | FormField, Field, FieldGroup, FieldSet, FieldLegend, FieldLabel, FieldDescription, FieldError, FieldContent, FieldRow |
| [Pagination](../registry/ui/pagination.tsx) | children; page, defaultPage, onPageChange, totalPages | Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis |
| [Data Table](../registry/ui/data-table.tsx) | data, columns, label, selectable, onSelectionChange | DataTable, Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption |
| [Tree View](../registry/ui/tree-view.tsx) | nodes, onSelect, label, renderLabel | TreeView, TreeNode |
| [Resizable Panels](../registry/ui/resizable-panels.tsx) | left, right | ResizablePanelGroup, ResizablePanel, ResizableHandle, ResizablePanels |
| [Stepper](../registry/ui/stepper.tsx) | Native id; children; native/primitive props | Stepper, StepperItem, StepperIndicator, StepperTitle, StepperDescription |
| [Empty State](../registry/ui/empty-state.tsx) | Native id; children; native/primitive props | EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateActions |
| [Alert](../registry/ui/alert.tsx) | Native id; children; native/primitive props | Alert, AlertTitle, AlertDescription, AlertAction |
| [Progress](../registry/ui/progress.tsx) | value, label, showLabel | Progress |
| [Text Reveal](../registry/ui/text-reveal.tsx) | children | TextReveal |
| [Split Text](../registry/ui/split-text.tsx) | children | SplitText |
| [Rotating Text](../registry/ui/rotating-text.tsx) | words, interval | RotatingText |
| [Scramble Text](../registry/ui/scramble-text.tsx) | children | ScrambleText |
| [Number Ticker](../registry/ui/number-ticker.tsx) | value, decimals | NumberTicker |
| [Animated Counter](../registry/ui/animated-counter.tsx) | target, duration | AnimatedCounter |
| [Marquee](../registry/ui/marquee.tsx) | children; duration | Marquee |
| [Scroll Reveal](../registry/ui/scroll-reveal.tsx) | Native id; children; native/primitive props | ScrollReveal |
| [Stagger Group](../registry/ui/stagger-group.tsx) | children | StaggerGroup |
| [Magnetic Button](../registry/ui/magnetic-button.tsx) | Native id; children; native/primitive props | MagneticButton |
| [Tilt Card](../registry/ui/tilt-card.tsx) | children; maxTilt | TiltCard |
| [Spotlight Card](../registry/ui/spotlight-card.tsx) | children | SpotlightCard |
| [Animated Tabs Indicator](../registry/ui/animated-tabs-indicator.tsx) | items, value, defaultValue, onValueChange | AnimatedTabsIndicator |
| [Shared Layout Transition](../registry/ui/shared-layout-transition.tsx) | items | SharedLayoutTransition |
| [Scroll Progress](../registry/ui/scroll-progress.tsx) | **className only** | ScrollProgress |
| [Grain Overlay](../registry/ui/grain-overlay.tsx) | children | GrainOverlay |
| [Dot Grid](../registry/ui/dot-grid.tsx) | children | DotGrid |
| [Animated Grid](../registry/ui/animated-grid.tsx) | children; paused | AnimatedGrid |
| [Gradient Mesh](../registry/ui/gradient-mesh.tsx) | children | GradientMesh |
| [Aurora Background](../registry/ui/aurora-background.tsx) | children; paused | AuroraBackground |
| [Spotlight Background](../registry/ui/spotlight-background.tsx) | children | SpotlightBackground |
| [Border Beam](../registry/ui/border-beam.tsx) | children; paused | BorderBeam |
| [Ripple Field](../registry/ui/ripple-field.tsx) | children; label | RippleField |
| [Cursor Trail](../registry/ui/cursor-trail.tsx) | children; color, duration | CursorTrail |
| [WebGL Particle Field](../registry/ui/webgl-particle-field.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLParticleField |
| [WebGL Ribbon Field](../registry/ui/webgl-ribbon-field.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLRibbonField |
| [WebGL Liquid Surface](../registry/ui/webgl-liquid-surface.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLLiquidSurface |
| [WebGL Orb](../registry/ui/webgl-orb.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLOrb |
| [WebGL Terrain](../registry/ui/webgl-terrain.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLTerrain |
| [WebGL Image Distortion](../registry/ui/webgl-image-distortion.tsx) | color, speed, paused, label, text, imageSrc, composition | WebGLImageDistortion |
| [Area Chart](../registry/ui/area-chart.tsx) | data, label, color | AreaChart |
| [Line Chart](../registry/ui/line-chart.tsx) | data, label, color | LineChart |
| [Bar Chart](../registry/ui/bar-chart.tsx) | data, label, color | BarChart |
| [Stacked Bar Chart](../registry/ui/stacked-bar-chart.tsx) | data, label, color | StackedBarChart |
| [Donut Chart](../registry/ui/donut-chart.tsx) | data, label, color, colors | DonutChart |
| [Radial Gauge](../registry/ui/radial-gauge.tsx) | value, label | RadialGauge |
| [Heatmap](../registry/ui/heatmap.tsx) | values, label | Heatmap |
| [Sparkline](../registry/ui/sparkline.tsx) | values, label | Sparkline |
| [Live Line Chart](../registry/ui/live-line-chart.tsx) | data, label, color, startLabel, pauseLabel | LiveLineChart |
| [Scatter Chart](../registry/ui/scatter-chart.tsx) | data, label, color | ScatterChart |

### Blocks

| Entry | Public interface signal | Named exports |
| --- | --- | --- |
| [Media Aside](../registry/blocks/media-aside.tsx) | title, description, imageSrc, imageAlt, href, actionLabel, reverse | MediaAside |
| [Journal Bento](../registry/blocks/journal-bento.tsx) | title, items | JournalBento, JournalStory |
| [Article Sidebar](../registry/blocks/article-sidebar.tsx) | children; title, aside, imageSrc, imageAlt | ArticleSidebar |
| [Editorial Footer](../registry/blocks/editorial-footer.tsx) | brand, description, groups | EditorialFooter |
| [Studio Footer](../registry/blocks/studio-footer.tsx) | brand, title, href, actionLabel, groups | StudioFooter |
| [Newsletter Footer](../registry/blocks/newsletter-footer.tsx) | brand, groups, onSubmit | NewsletterFooter |
| [Plan Comparison](../registry/blocks/plan-comparison.tsx) | title, plans, onSelect | PlanComparison, ComparisonPlan |
| [Feature Comparison](../registry/blocks/feature-comparison.tsx) | title, onSelect | FeatureComparison |
| [Usage Pricing](../registry/blocks/usage-pricing.tsx) | title, onSelect | UsagePricing |
| [Editorial Hero](../registry/blocks/editorial-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | EditorialHero |
| [Product Demo Hero](../registry/blocks/product-demo-hero.tsx) | children; copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | ProductDemoHero |
| [WebGL Hero](../registry/blocks/webgl-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | WebglHero |
| [Logo Wall](../registry/blocks/logo-wall.tsx) | names | LogoWall |
| [Feature Grid](../registry/blocks/feature-grid.tsx) | **className only** | FeatureGrid |
| [Alternating Feature Story](../registry/blocks/alternating-feature-story.tsx) | **className only** | AlternatingFeatureStory |
| [Product Comparison](../registry/blocks/product-comparison.tsx) | **className only** | ProductComparison |
| [Metrics Strip](../registry/blocks/metrics-strip.tsx) | items | MetricsStrip |
| [Testimonial Grid](../registry/blocks/testimonial-grid.tsx) | **className only** | TestimonialGrid |
| [Testimonial Carousel](../registry/blocks/testimonial-carousel.tsx) | items | TestimonialCarousel, CustomerStory |
| [Pricing Table](../registry/blocks/pricing-table.tsx) | href | PricingTable |
| [Pricing Comparison](../registry/blocks/pricing-comparison.tsx) | **className only** | PricingComparison |
| [FAQ](../registry/blocks/faq.tsx) | **className only** | Faq |
| [Newsletter Signup](../registry/blocks/newsletter-signup.tsx) | onSubmit | NewsletterSignup |
| [Contact Form](../registry/blocks/contact-form.tsx) | onSubmit | ContactForm |
| [CTA Section](../registry/blocks/cta-section.tsx) | href, title, action | CtaSection |
| [Marketing Navigation](../registry/blocks/marketing-navigation.tsx) | brand, items, home | MarketingNavigation |
| [Mega Navigation](../registry/blocks/mega-navigation.tsx) | brand, home, items | MegaNavigation |
| [Floating Navigation](../registry/blocks/floating-navigation.tsx) | items, currentHref | FloatingNavigation |
| [Terrain Hero](../registry/blocks/terrain-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | TerrainHero |
| [Marketing Footer](../registry/blocks/marketing-footer.tsx) | brand, items | MarketingFooter |
| [Particle Hero](../registry/blocks/particle-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | ParticleHero |
| [Liquid Hero](../registry/blocks/liquid-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | LiquidHero |
| [Orb Hero](../registry/blocks/orb-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | OrbHero |
| [Silk Hero](../registry/blocks/silk-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | SilkHero |
| [Eclipse Hero](../registry/blocks/eclipse-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | EclipseHero |
| [Tunnel Hero](../registry/blocks/tunnel-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | TunnelHero |
| [Constellation Hero](../registry/blocks/constellation-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | ConstellationHero |
| [Distortion Hero](../registry/blocks/distortion-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | DistortionHero |
| [Media Hero](../registry/blocks/media-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | MediaHero |
| [Typographic Hero](../registry/blocks/typographic-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | TypographicHero |
| [Shape Hero](../registry/blocks/shape-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | ShapeHero |
| [Studio Hero](../registry/blocks/studio-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | StudioHero |
| [Journal Hero](../registry/blocks/journal-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | JournalHero |
| [Poster Hero](../registry/blocks/poster-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | PosterHero |
| [Portfolio Hero](../registry/blocks/portfolio-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | PortfolioHero |
| [Collage Hero](../registry/blocks/collage-hero.tsx) | copy, preview, artworkText, href, title, description, actionLabel, secondaryImageSrc, secondaryImageAlt, imageSrc, imageAlt, artwork | CollageHero |
| [Editorial Navigation](../registry/blocks/editorial-navigation.tsx) | items, brand, home | EditorialNavigation |
| [Commerce Navigation](../registry/blocks/commerce-navigation.tsx) | cartCount | CommerceNavigation |
| [Studio Navigation](../registry/blocks/studio-navigation.tsx) | **className only** | StudioNavigation |
| [Immersive Login](../registry/blocks/immersive-login.tsx) | onSubmit, onSSO, title, description, brand, animated | ImmersiveLogin |
| [Ribbon Login](../registry/blocks/ribbon-login.tsx) | onSubmit, onSSO, title, description, brand, animated | RibbonLogin |
| [Editorial Login](../registry/blocks/editorial-login.tsx) | onSubmit, onSSO, title, description, brand, imageSrc, imageAlt | EditorialLogin |
| [Application Shell](../registry/blocks/application-shell.tsx) | children; brand, items, currentPath | ApplicationShell |
| [Workspace Navigation](../registry/blocks/workspace-navigation.tsx) | onViewChange, onCreate | WorkspaceNavigation |
| [Analytics Overview](../registry/blocks/analytics-overview.tsx) | **className only** | AnalyticsOverview |
| [Activity Feed](../registry/blocks/activity-feed.tsx) | **className only** | ActivityFeed |
| [Searchable Records Screen](../registry/blocks/searchable-records-screen.tsx) | **className only** | SearchableRecordsScreen |
| [Record Detail Panel](../registry/blocks/record-detail-panel.tsx) | name | RecordDetailPanel |
| [Kanban Board](../registry/blocks/kanban-board.tsx) | **className only** | KanbanBoard, DemoTask |
| [Task List](../registry/blocks/task-list.tsx) | **className only** | TaskList |
| [Calendar Schedule](../registry/blocks/calendar-schedule.tsx) | **className only** | CalendarSchedule |
| [Onboarding Wizard](../registry/blocks/onboarding-wizard.tsx) | **className only** | OnboardingWizard |
| [Sign In Form](../registry/blocks/sign-in-form.tsx) | onSubmit | SignInForm |
| [Sign Up Form](../registry/blocks/sign-up-form.tsx) | onSubmit | SignUpForm |
| [Password Reset Form](../registry/blocks/password-reset-form.tsx) | onSubmit | PasswordResetForm |
| [Profile Settings](../registry/blocks/profile-settings.tsx) | **className only** | ProfileSettings |
| [Team Management](../registry/blocks/team-management.tsx) | **className only** | TeamManagement |
| [Billing Settings](../registry/blocks/billing-settings.tsx) | **className only** | BillingSettings |
| [Notification Centre](../registry/blocks/notification-centre.tsx) | **className only** | NotificationCentre |
| [Command Search](../registry/blocks/command-search.tsx) | **className only** | CommandSearch |
| [Chat Workspace](../registry/blocks/chat-workspace.tsx) | conversationId | ChatWorkspace |
| [Workspace Sidebar](../registry/blocks/workspace-sidebar.tsx) | children; sidebar, organizations, accounts, onOrganizationChange, onAccountChange, onCreateOrganization, onAddAccount, onSignOut, onNavigate | WorkspaceSidebar |
| [Rail Sidebar](../registry/blocks/rail-sidebar.tsx) | children; sidebar, organizations, accounts, onOrganizationChange, onAccountChange, onCreateOrganization, onAddAccount, onSignOut, onNavigate | RailSidebar |
| [Inset Sidebar](../registry/blocks/inset-sidebar.tsx) | children; sidebar, organizations, accounts, onOrganizationChange, onAccountChange, onCreateOrganization, onAddAccount, onSignOut, onNavigate | InsetSidebar |
| [User Switcher](../registry/blocks/user-switcher.tsx) | items, defaultValue, onValueChange, onAddAccount, onSignOut, settingsHref, compact | UserSwitcher, SwitcherAccount |
| [Organization Switcher](../registry/blocks/organization-switcher.tsx) | items, onValueChange, onCreate, compact | OrganizationSwitcher, Organization |
| [SSO Login](../registry/blocks/sso-login.tsx) | onSubmit, onSSO, title, description, brand | SSOLogin |
| [Split Login](../registry/blocks/split-login.tsx) | onSubmit, onSSO, title, description, brand | SplitLogin |
| [Workspace Login](../registry/blocks/workspace-login.tsx) | onSubmit, onSSO, title, description, brand | WorkspaceLogin |

