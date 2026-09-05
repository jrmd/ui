# Current composition inventory

91 components and 80 blocks. Canonical entry files and exported callable parts after the composition migration. Native attributes and refs belong on rendered parts; provider roots keep their underlying primitive interfaces. Atomic controls, data renderers, and motion/effect surfaces retain direct interfaces where additional parts would not help. See [composition guide](COMPOSITION.md) for state ownership, examples, and migration details.

## Components

| Entry | Exported callable parts / helpers |
| --- | --- |
| [Button](../registry/ui/button.tsx) | Direct interface; see entry source |
| [Icon Button](../registry/ui/icon-button.tsx) | Direct interface; see entry source |
| [Badge](../registry/ui/badge.tsx) | Direct interface; see entry source |
| [Avatar](../registry/ui/avatar.tsx) | `AvatarImage`, `AvatarFallback` |
| [Card](../registry/ui/card.tsx) | `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| [Separator](../registry/ui/separator.tsx) | Direct interface; see entry source |
| [Skeleton](../registry/ui/skeleton.tsx) | Direct interface; see entry source |
| [Spinner](../registry/ui/spinner.tsx) | Direct interface; see entry source |
| [Input](../registry/ui/input.tsx) | Direct interface; see entry source |
| [Textarea](../registry/ui/textarea.tsx) | Direct interface; see entry source |
| [Label](../registry/ui/label.tsx) | Direct interface; see entry source |
| [Checkbox](../registry/ui/checkbox.tsx) | Direct interface; see entry source |
| [Radio Group](../registry/ui/radio-group.tsx) | `RadioGroupItem` |
| [Switch](../registry/ui/switch.tsx) | Direct interface; see entry source |
| [Select](../registry/ui/select.tsx) | `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator` |
| [Slider](../registry/ui/slider.tsx) | Direct interface; see entry source |
| [Toggle Group](../registry/ui/toggle-group.tsx) | `ToggleGroupItem` |
| [Tabs](../registry/ui/tabs.tsx) | `TabsList`, `TabsTrigger`, `TabsContent` |
| [Accordion](../registry/ui/accordion.tsx) | `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| [Collapsible](../registry/ui/collapsible.tsx) | `CollapsibleTrigger`, `CollapsibleContent` |
| [Dialog](../registry/ui/dialog.tsx) | `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` |
| [Alert Dialog](../registry/ui/alert-dialog.tsx) | `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogCancel`, `AlertDialogAction` |
| [Sheet](../registry/ui/sheet.tsx) | `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` |
| [Popover](../registry/ui/popover.tsx) | `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription` |
| [Tooltip](../registry/ui/tooltip.tsx) | `TooltipContent` |
| [Dropdown Menu](../registry/ui/dropdown-menu.tsx) | `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuShortcut` |
| [Context Menu](../registry/ui/context-menu.tsx) | `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuShortcut` |
| [Navigation Menu](../registry/ui/navigation-menu.tsx) | `NavigationMenuList`, `NavigationMenuLink`, `NavigationMenuTrigger`, `NavigationMenuContent` |
| [Breadcrumb](../registry/ui/breadcrumb.tsx) | `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` |
| [Toast](../registry/ui/toast.tsx) | `ToastRoot`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction` |
| [Sidebar](../registry/ui/sidebar.tsx) | `useSidebar`, `SidebarProvider`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuBadge`, `SidebarInset`, `SidebarTrigger` |
| [Combobox](../registry/ui/combobox.tsx) | Direct interface; see entry source |
| [Command Palette](../registry/ui/command-palette.tsx) | Direct interface; see entry source |
| [Calendar](../registry/ui/calendar.tsx) | `dateKey` |
| [Date Picker](../registry/ui/date-picker.tsx) | Direct interface; see entry source |
| [Date Range Picker](../registry/ui/date-range-picker.tsx) | Direct interface; see entry source |
| [Time Picker](../registry/ui/time-picker.tsx) | Direct interface; see entry source |
| [File Upload](../registry/ui/file-upload.tsx) | Direct interface; see entry source |
| [OTP Input](../registry/ui/otp-input.tsx) | Direct interface; see entry source |
| [Password Input](../registry/ui/password-input.tsx) | Direct interface; see entry source |
| [Search Input](../registry/ui/search-input.tsx) | Direct interface; see entry source |
| [Tag Input](../registry/ui/tag-input.tsx) | Direct interface; see entry source |
| [Form Field](../registry/ui/form-field.tsx) | `Field`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldContent`, `FieldRow` |
| [Pagination](../registry/ui/pagination.tsx) | `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` |
| [Data Table](../registry/ui/data-table.tsx) | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `DataTableToolbar`, `DataTablePagination` |
| [Tree View](../registry/ui/tree-view.tsx) | Direct interface; see entry source |
| [Resizable Panels](../registry/ui/resizable-panels.tsx) | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |
| [Stepper](../registry/ui/stepper.tsx) | `StepperItem`, `StepperIndicator`, `StepperTitle`, `StepperDescription` |
| [Empty State](../registry/ui/empty-state.tsx) | `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions` |
| [Alert](../registry/ui/alert.tsx) | `AlertTitle`, `AlertDescription`, `AlertAction` |
| [Progress](../registry/ui/progress.tsx) | Direct interface; see entry source |
| [Text Reveal](../registry/ui/text-reveal.tsx) | Direct interface; see entry source |
| [Split Text](../registry/ui/split-text.tsx) | Direct interface; see entry source |
| [Rotating Text](../registry/ui/rotating-text.tsx) | Direct interface; see entry source |
| [Scramble Text](../registry/ui/scramble-text.tsx) | Direct interface; see entry source |
| [Number Ticker](../registry/ui/number-ticker.tsx) | Direct interface; see entry source |
| [Animated Counter](../registry/ui/animated-counter.tsx) | Direct interface; see entry source |
| [Marquee](../registry/ui/marquee.tsx) | Direct interface; see entry source |
| [Scroll Reveal](../registry/ui/scroll-reveal.tsx) | Direct interface; see entry source |
| [Stagger Group](../registry/ui/stagger-group.tsx) | Direct interface; see entry source |
| [Magnetic Button](../registry/ui/magnetic-button.tsx) | Direct interface; see entry source |
| [Tilt Card](../registry/ui/tilt-card.tsx) | Direct interface; see entry source |
| [Spotlight Card](../registry/ui/spotlight-card.tsx) | Direct interface; see entry source |
| [Animated Tabs Indicator](../registry/ui/animated-tabs-indicator.tsx) | Direct interface; see entry source |
| [Shared Layout Transition](../registry/ui/shared-layout-transition.tsx) | Direct interface; see entry source |
| [Scroll Progress](../registry/ui/scroll-progress.tsx) | Direct interface; see entry source |
| [Grain Overlay](../registry/ui/grain-overlay.tsx) | Direct interface; see entry source |
| [Dot Grid](../registry/ui/dot-grid.tsx) | Direct interface; see entry source |
| [Animated Grid](../registry/ui/animated-grid.tsx) | Direct interface; see entry source |
| [Gradient Mesh](../registry/ui/gradient-mesh.tsx) | Direct interface; see entry source |
| [Aurora Background](../registry/ui/aurora-background.tsx) | Direct interface; see entry source |
| [Spotlight Background](../registry/ui/spotlight-background.tsx) | Direct interface; see entry source |
| [Border Beam](../registry/ui/border-beam.tsx) | Direct interface; see entry source |
| [Ripple Field](../registry/ui/ripple-field.tsx) | Direct interface; see entry source |
| [Cursor Trail](../registry/ui/cursor-trail.tsx) | Direct interface; see entry source |
| [WebGL Particle Field](../registry/ui/webgl-particle-field.tsx) | Direct interface; see entry source |
| [WebGL Ribbon Field](../registry/ui/webgl-ribbon-field.tsx) | Direct interface; see entry source |
| [WebGL Liquid Surface](../registry/ui/webgl-liquid-surface.tsx) | Direct interface; see entry source |
| [WebGL Orb](../registry/ui/webgl-orb.tsx) | Direct interface; see entry source |
| [WebGL Terrain](../registry/ui/webgl-terrain.tsx) | Direct interface; see entry source |
| [WebGL Image Distortion](../registry/ui/webgl-image-distortion.tsx) | Direct interface; see entry source |
| [Area Chart](../registry/ui/area-chart.tsx) | Direct interface; see entry source |
| [Line Chart](../registry/ui/line-chart.tsx) | Direct interface; see entry source |
| [Bar Chart](../registry/ui/bar-chart.tsx) | Direct interface; see entry source |
| [Stacked Bar Chart](../registry/ui/stacked-bar-chart.tsx) | Direct interface; see entry source |
| [Donut Chart](../registry/ui/donut-chart.tsx) | Direct interface; see entry source |
| [Radial Gauge](../registry/ui/radial-gauge.tsx) | Direct interface; see entry source |
| [Heatmap](../registry/ui/heatmap.tsx) | Direct interface; see entry source |
| [Sparkline](../registry/ui/sparkline.tsx) | Direct interface; see entry source |
| [Live Line Chart](../registry/ui/live-line-chart.tsx) | Direct interface; see entry source |
| [Scatter Chart](../registry/ui/scatter-chart.tsx) | Direct interface; see entry source |
## Blocks

| Entry | Exported callable parts / helpers |
| --- | --- |
| [Media Aside](../registry/blocks/media-aside.tsx) | `MediaAsideContent`, `MediaAsideTitle`, `MediaAsideMedia` |
| [Journal Bento](../registry/blocks/journal-bento.tsx) | `JournalBentoTitle`, `JournalBentoContent`, `JournalBentoItem` |
| [Article Sidebar](../registry/blocks/article-sidebar.tsx) | `ArticleSidebarTitle`, `ArticleSidebarContent`, `ArticleSidebarItemTitle` |
| [Editorial Footer](../registry/blocks/editorial-footer.tsx) | `EditorialFooterContent`, `EditorialFooterTitle`, `EditorialFooterDescription` |
| [Studio Footer](../registry/blocks/studio-footer.tsx) | `StudioFooterTitle`, `StudioFooterContent` |
| [Newsletter Footer](../registry/blocks/newsletter-footer.tsx) | `NewsletterFooterContent`, `NewsletterFooterHeader` |
| [Plan Comparison](../registry/blocks/plan-comparison.tsx) | `PlanComparisonHeader`, `PlanComparisonTitle`, `PlanComparisonDescription`, `PlanComparisonContent`, `PlanComparisonItemTitle`, `PlanComparisonItem` |
| [Feature Comparison](../registry/blocks/feature-comparison.tsx) | `FeatureComparisonTitle`, `FeatureComparisonDescription`, `FeatureComparisonContent` |
| [Usage Pricing](../registry/blocks/usage-pricing.tsx) | `UsagePricingContent`, `UsagePricingTitle`, `UsagePricingItemTitle`, `UsagePricingItem` |
| [Editorial Hero](../registry/blocks/editorial-hero.tsx) | `EditorialHeroTitle`, `EditorialHeroContent` |
| [Product Demo Hero](../registry/blocks/product-demo-hero.tsx) | `ProductDemoHeroContent`, `ProductDemoHeroTitle`, `ProductDemoHeroDescription` |
| [WebGL Hero](../registry/blocks/webgl-hero.tsx) | `WebglHeroContent`, `WebglHeroTitle`, `WebglHeroHeader` |
| [Logo Wall](../registry/blocks/logo-wall.tsx) | `LogoWallDescription`, `LogoWallHeader` |
| [Feature Grid](../registry/blocks/feature-grid.tsx) | `FeatureGridContent`, `FeatureGridTitle`, `FeatureGridItemTitle`, `FeatureGridItem` |
| [Alternating Feature Story](../registry/blocks/alternating-feature-story.tsx) | `AlternatingFeatureStoryContent`, `AlternatingFeatureStoryTitle`, `AlternatingFeatureStoryItemTitle`, `AlternatingFeatureStoryItem` |
| [Product Comparison](../registry/blocks/product-comparison.tsx) | `ProductComparisonTitle`, `ProductComparisonList` |
| [Metrics Strip](../registry/blocks/metrics-strip.tsx) | Direct interface; see entry source |
| [Testimonial Grid](../registry/blocks/testimonial-grid.tsx) | `TestimonialGridTitle`, `TestimonialGridDescription`, `TestimonialGridContent` |
| [Testimonial Carousel](../registry/blocks/testimonial-carousel.tsx) | `TestimonialCarouselHeader`, `TestimonialCarouselContent`, `TestimonialCarouselItem` |
| [Pricing Table](../registry/blocks/pricing-table.tsx) | `PricingTableHeader`, `PricingTableTitle`, `PricingTableContent`, `PricingTableItemTitle`, `PricingTableDescription`, `PricingTableItem` |
| [Pricing Comparison](../registry/blocks/pricing-comparison.tsx) | `PricingComparisonList` |
| [FAQ](../registry/blocks/faq.tsx) | `FaqTitle` |
| [Newsletter Signup](../registry/blocks/newsletter-signup.tsx) | `NewsletterSignupContent`, `NewsletterSignupTitle`, `NewsletterSignupDescription` |
| [Contact Form](../registry/blocks/contact-form.tsx) | `ContactFormContent`, `ContactFormTitle` |
| [CTA Section](../registry/blocks/cta-section.tsx) | `CtaSectionTitle` |
| [Marketing Navigation](../registry/blocks/marketing-navigation.tsx) | Direct interface; see entry source |
| [Mega Navigation](../registry/blocks/mega-navigation.tsx) | `MegaNavigationHeader`, `MegaNavigationItem` |
| [Floating Navigation](../registry/blocks/floating-navigation.tsx) | `FloatingNavigationItem` |
| [Terrain Hero](../registry/blocks/terrain-hero.tsx) | `TerrainHeroHeader`, `TerrainHeroContent`, `TerrainHeroTitle` |
| [Terrain Relief Hero](../registry/blocks/terrain-relief-hero.tsx) | `TerrainReliefHeroHeader`, `TerrainReliefHeroContent`, `TerrainReliefHeroTitle` |
| [Marketing Footer](../registry/blocks/marketing-footer.tsx) | `MarketingFooterNavigation` |
| [Particle Hero](../registry/blocks/particle-hero.tsx) | `ParticleHeroContent`, `ParticleHeroTitle`, `ParticleHeroHeader` |
| [Liquid Hero](../registry/blocks/liquid-hero.tsx) | `LiquidHeroContent`, `LiquidHeroTitle` |
| [Orb Hero](../registry/blocks/orb-hero.tsx) | `OrbHeroHeader`, `OrbHeroContent`, `OrbHeroTitle` |
| [Silk Hero](../registry/blocks/silk-hero.tsx) | `SilkHeroHeader`, `SilkHeroContent`, `SilkHeroTitle` |
| [Eclipse Hero](../registry/blocks/eclipse-hero.tsx) | `EclipseHeroContent`, `EclipseHeroTitle` |
| [Tunnel Hero](../registry/blocks/tunnel-hero.tsx) | `TunnelHeroContent`, `TunnelHeroTitle` |
| [Constellation Hero](../registry/blocks/constellation-hero.tsx) | `ConstellationHeroContent`, `ConstellationHeroTitle` |
| [Distortion Hero](../registry/blocks/distortion-hero.tsx) | `DistortionHeroHeader`, `DistortionHeroContent`, `DistortionHeroTitle` |
| [Media Hero](../registry/blocks/media-hero.tsx) | `MediaHeroContent`, `MediaHeroTitle` |
| [Typographic Hero](../registry/blocks/typographic-hero.tsx) | `TypographicHeroHeader`, `TypographicHeroContent`, `TypographicHeroTitle` |
| [Shape Hero](../registry/blocks/shape-hero.tsx) | `ShapeHeroContent`, `ShapeHeroTitle` |
| [Studio Hero](../registry/blocks/studio-hero.tsx) | `StudioHeroContent`, `StudioHeroTitle` |
| [Journal Hero](../registry/blocks/journal-hero.tsx) | `JournalHeroHeader`, `JournalHeroContent`, `JournalHeroTitle` |
| [Poster Hero](../registry/blocks/poster-hero.tsx) | `PosterHeroContent`, `PosterHeroTitle` |
| [Portfolio Hero](../registry/blocks/portfolio-hero.tsx) | `PortfolioHeroHeader`, `PortfolioHeroContent`, `PortfolioHeroTitle` |
| [Collage Hero](../registry/blocks/collage-hero.tsx) | `CollageHeroContent`, `CollageHeroTitle` |
| [Editorial Navigation](../registry/blocks/editorial-navigation.tsx) | `EditorialNavigationHeader`, `EditorialNavigationItem` |
| [Commerce Navigation](../registry/blocks/commerce-navigation.tsx) | `CommerceNavigationDescription`, `CommerceNavigationContent` |
| [Studio Navigation](../registry/blocks/studio-navigation.tsx) | `StudioNavigationContent`, `StudioNavigationItem` |
| [Immersive Login](../registry/blocks/immersive-login.tsx) | `ImmersiveLoginContent`, `ImmersiveLoginTitle` |
| [Ribbon Login](../registry/blocks/ribbon-login.tsx) | `RibbonLoginHeader`, `RibbonLoginContent`, `RibbonLoginTitle` |
| [Editorial Login](../registry/blocks/editorial-login.tsx) | `EditorialLoginHeader`, `EditorialLoginContent`, `EditorialLoginTitle` |
| [Application Shell](../registry/blocks/application-shell.tsx) | `ApplicationShellAside`, `ApplicationShellContent`, `ApplicationShellItem` |
| [Workspace Navigation](../registry/blocks/workspace-navigation.tsx) | `WorkspaceNavigationHeader`, `WorkspaceNavigationContent`, `WorkspaceNavigationItem` |
| [Analytics Overview](../registry/blocks/analytics-overview.tsx) | `AnalyticsOverviewContent`, `AnalyticsOverviewItemTitle`, `AnalyticsOverviewItem` |
| [Activity Feed](../registry/blocks/activity-feed.tsx) | `ActivityFeedHeader`, `ActivityFeedTitle`, `ActivityFeedItem` |
| [Searchable Records Screen](../registry/blocks/searchable-records-screen.tsx) | `SearchableRecordsScreenContent`, `SearchableRecordsScreenTitle` |
| [Record Detail Panel](../registry/blocks/record-detail-panel.tsx) | `RecordDetailPanelHeader`, `RecordDetailPanelTitle`, `RecordDetailPanelList`, `RecordDetailPanelDescription` |
| [Kanban Board](../registry/blocks/kanban-board.tsx) | `KanbanBoardForm`, `KanbanBoardContent`, `KanbanBoardItemTitle`, `KanbanBoardHeader`, `KanbanBoardDescription`, `KanbanBoardItem` |
| [Task List](../registry/blocks/task-list.tsx) | `TaskListItem` |
| [Calendar Schedule](../registry/blocks/calendar-schedule.tsx) | `CalendarScheduleContent`, `CalendarScheduleItemTitle`, `CalendarScheduleItem` |
| [Onboarding Wizard](../registry/blocks/onboarding-wizard.tsx) | `OnboardingWizardAside`, `OnboardingWizardContent`, `OnboardingWizardTitle`, `OnboardingWizardItem` |
| [Sign In Form](../registry/blocks/sign-in-form.tsx) | `SignInFormContent`, `SignInFormTitle` |
| [Sign Up Form](../registry/blocks/sign-up-form.tsx) | `SignUpFormContent`, `SignUpFormTitle` |
| [Password Reset Form](../registry/blocks/password-reset-form.tsx) | `PasswordResetFormContent`, `PasswordResetFormTitle` |
| [Profile Settings](../registry/blocks/profile-settings.tsx) | `ProfileSettingsContent`, `ProfileSettingsTitle` |
| [Team Management](../registry/blocks/team-management.tsx) | `TeamManagementTitle`, `TeamManagementForm`, `TeamManagementItem` |
| [Billing Settings](../registry/blocks/billing-settings.tsx) | `BillingSettingsTitle`, `BillingSettingsContent`, `BillingSettingsHeader`, `BillingSettingsItem` |
| [Notification Centre](../registry/blocks/notification-centre.tsx) | `NotificationCentreHeader`, `NotificationCentreTitle`, `NotificationCentreContent`, `NotificationCentreItem` |
| [Command Search](../registry/blocks/command-search.tsx) | Direct interface; see entry source |
| [Chat Workspace](../registry/blocks/chat-workspace.tsx) | `ChatWorkspaceHeader`, `ChatWorkspaceContent`, `ChatWorkspaceTitle`, `ChatWorkspaceForm`, `ChatWorkspaceDescription`, `ChatWorkspaceItem` |
| [Workspace Sidebar](../registry/blocks/workspace-sidebar.tsx) | Direct interface; see entry source |
| [Rail Sidebar](../registry/blocks/rail-sidebar.tsx) | Direct interface; see entry source |
| [Inset Sidebar](../registry/blocks/inset-sidebar.tsx) | Direct interface; see entry source |
| [User Switcher](../registry/blocks/user-switcher.tsx) | Direct interface; see entry source |
| [Organization Switcher](../registry/blocks/organization-switcher.tsx) | Direct interface; see entry source |
| [SSO Login](../registry/blocks/sso-login.tsx) | `SSOLoginContent`, `SSOLoginTitle` |
| [Split Login](../registry/blocks/split-login.tsx) | `SplitLoginContent`, `SplitLoginTitle` |
| [Workspace Login](../registry/blocks/workspace-login.tsx) | `WorkspaceLoginContent`, `WorkspaceLoginTitle`, `WorkspaceLoginDescription` |

## Validation

- `pnpm verify`: registry schemas, dependency closures, source parity, TypeScript and ESLint pass.
- `pnpm test:composition`: 10 consumer tests, including all 80 block roots, pass with system Chromium.
- Catalogue production build: 416 routes generated successfully.
- The selected catalogue/composition/customization/content-block tests cover all 171 entries at desktop and mobile widths, plus interactive composition.
- Real shadcn CLI installations of all 171 entries passed TypeScript and production builds in Vite and Next.js. Generic installation fixtures are regenerated on demand; this change keeps the dedicated consumer fixture.
- Desktop and mobile custom compositions were visually inspected, including dark mode; the narrow-grid comparison overflow was repaired.

The mechanical design detector reported advisory literal palette and small typography values in the existing artwork/presets. These were not treated as reasons to redesign the collection during an interface migration.
