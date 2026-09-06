import { FeatureCarousel } from "../../../registry/blocks/feature-carousel";
import { ExpandableFeatures } from "../../../registry/blocks/expandable-features";
import { FeatureTabs } from "../../../registry/blocks/feature-tabs";
import { FeatureMosaic } from "../../../registry/blocks/feature-mosaic";
import { FeatureSpotlight } from "../../../registry/blocks/feature-spotlight";
import { ProductBento } from "../../../registry/blocks/product-bento";
import { IntegrationBento } from "../../../registry/blocks/integration-bento";
import { HowItWorksHorizontal } from "../../../registry/blocks/how-it-works-horizontal";
import { HowItWorksVertical } from "../../../registry/blocks/how-it-works-vertical";
import { CenteredAuth } from "../../../registry/blocks/centered-auth";
import { SplitAuth } from "../../../registry/blocks/split-auth";
import { InsetAuth } from "../../../registry/blocks/inset-auth";
import * as React from "react";
import { MediaAside } from "../../../registry/blocks/media-aside";
import { JournalBento } from "../../../registry/blocks/journal-bento";
import { ArticleSidebar } from "../../../registry/blocks/article-sidebar";
import { EditorialFooter } from "../../../registry/blocks/editorial-footer";
import { StudioFooter } from "../../../registry/blocks/studio-footer";
import { NewsletterFooter } from "../../../registry/blocks/newsletter-footer";
import { PlanComparison } from "../../../registry/blocks/plan-comparison";
import { FeatureComparison } from "../../../registry/blocks/feature-comparison";
import { UsagePricing } from "../../../registry/blocks/usage-pricing";
import { EditorialHero } from "../../../registry/blocks/editorial-hero";
import { ProductDemoHero } from "../../../registry/blocks/product-demo-hero";
import { WebglHero } from "../../../registry/blocks/webgl-hero";
import { LogoWall } from "../../../registry/blocks/logo-wall";
import { FeatureGrid } from "../../../registry/blocks/feature-grid";
import { AlternatingFeatureStory } from "../../../registry/blocks/alternating-feature-story";
import { ProductComparison } from "../../../registry/blocks/product-comparison";
import { MetricsStrip } from "../../../registry/blocks/metrics-strip";
import { TestimonialGrid } from "../../../registry/blocks/testimonial-grid";
import { TestimonialCarousel } from "../../../registry/blocks/testimonial-carousel";
import { PricingTable } from "../../../registry/blocks/pricing-table";
import { PricingComparison } from "../../../registry/blocks/pricing-comparison";
import { Faq } from "../../../registry/blocks/faq";
import { NewsletterSignup } from "../../../registry/blocks/newsletter-signup";
import { ContactForm } from "../../../registry/blocks/contact-form";
import { CtaSection } from "../../../registry/blocks/cta-section";
import { MarketingNavigation } from "../../../registry/blocks/marketing-navigation";
import { MegaNavigation } from "../../../registry/blocks/mega-navigation";
import { FloatingNavigation } from "../../../registry/blocks/floating-navigation";
import { TerrainHero } from "../../../registry/blocks/terrain-hero";
import { TerrainReliefHero } from "../../../registry/blocks/terrain-relief-hero";
import { MarketingFooter } from "../../../registry/blocks/marketing-footer";
import { ParticleHero } from "../../../registry/blocks/particle-hero";
import { LiquidHero } from "../../../registry/blocks/liquid-hero";
import { OrbHero } from "../../../registry/blocks/orb-hero";
import { SilkHero } from "../../../registry/blocks/silk-hero";
import { EclipseHero } from "../../../registry/blocks/eclipse-hero";
import { TunnelHero } from "../../../registry/blocks/tunnel-hero";
import { ConstellationHero } from "../../../registry/blocks/constellation-hero";
import { DistortionHero } from "../../../registry/blocks/distortion-hero";
import { MediaHero } from "../../../registry/blocks/media-hero";
import { TypographicHero } from "../../../registry/blocks/typographic-hero";
import { ShapeHero } from "../../../registry/blocks/shape-hero";
import { StudioHero } from "../../../registry/blocks/studio-hero";
import { JournalHero } from "../../../registry/blocks/journal-hero";
import { PosterHero } from "../../../registry/blocks/poster-hero";
import { PortfolioHero } from "../../../registry/blocks/portfolio-hero";
import { CollageHero } from "../../../registry/blocks/collage-hero";
import { EditorialNavigation } from "../../../registry/blocks/editorial-navigation";
import { CommerceNavigation } from "../../../registry/blocks/commerce-navigation";
import { StudioNavigation } from "../../../registry/blocks/studio-navigation";
import { ImmersiveLogin } from "../../../registry/blocks/immersive-login";
import { RibbonLogin } from "../../../registry/blocks/ribbon-login";
import { EditorialLogin } from "../../../registry/blocks/editorial-login";
import { ApplicationShell } from "../../../registry/blocks/application-shell";
import { WorkspaceNavigation } from "../../../registry/blocks/workspace-navigation";
import { AnalyticsOverview } from "../../../registry/blocks/analytics-overview";
import { ActivityFeed } from "../../../registry/blocks/activity-feed";
import { SearchableRecordsScreen } from "../../../registry/blocks/searchable-records-screen";
import { RecordDetailPanel } from "../../../registry/blocks/record-detail-panel";
import { KanbanBoard } from "../../../registry/blocks/kanban-board";
import { TaskList } from "../../../registry/blocks/task-list";
import { CalendarSchedule } from "../../../registry/blocks/calendar-schedule";
import { OnboardingWizard } from "../../../registry/blocks/onboarding-wizard";
import { SignInForm } from "../../../registry/blocks/sign-in-form";
import { SignUpForm } from "../../../registry/blocks/sign-up-form";
import { PasswordResetForm } from "../../../registry/blocks/password-reset-form";
import { ProfileSettings } from "../../../registry/blocks/profile-settings";
import { TeamManagement } from "../../../registry/blocks/team-management";
import { BillingSettings } from "../../../registry/blocks/billing-settings";
import { NotificationCentre } from "../../../registry/blocks/notification-centre";
import { CommandSearch } from "../../../registry/blocks/command-search";
import { ChatWorkspace } from "../../../registry/blocks/chat-workspace";
import { WorkspaceSidebar } from "../../../registry/blocks/workspace-sidebar";
import { RailSidebar } from "../../../registry/blocks/rail-sidebar";
import { InsetSidebar } from "../../../registry/blocks/inset-sidebar";
import { UserSwitcher } from "../../../registry/blocks/user-switcher";
import { OrganizationSwitcher } from "../../../registry/blocks/organization-switcher";
import { SSOLogin } from "../../../registry/blocks/sso-login";
import { SplitLogin } from "../../../registry/blocks/split-login";
import { WorkspaceLogin } from "../../../registry/blocks/workspace-login";
export function BlockConsumers() {
  return (
    <main className="grid gap-4 p-4">
      <MediaAside
        id="media-aside"
        data-testid="media-aside"
        aria-label="Owned media-aside"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned media-aside</span>
      </MediaAside>
      <JournalBento
        id="journal-bento"
        data-testid="journal-bento"
        aria-label="Owned journal-bento"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned journal-bento</span>
      </JournalBento>
      <ArticleSidebar
        id="article-sidebar"
        data-testid="article-sidebar"
        aria-label="Owned article-sidebar"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned article-sidebar</span>
      </ArticleSidebar>
      <EditorialFooter
        id="editorial-footer"
        data-testid="editorial-footer"
        aria-label="Owned editorial-footer"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned editorial-footer</span>
      </EditorialFooter>
      <StudioFooter
        id="studio-footer"
        data-testid="studio-footer"
        aria-label="Owned studio-footer"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned studio-footer</span>
      </StudioFooter>
      <NewsletterFooter
        id="newsletter-footer"
        data-testid="newsletter-footer"
        aria-label="Owned newsletter-footer"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned newsletter-footer</span>
      </NewsletterFooter>
      <PlanComparison
        id="plan-comparison"
        data-testid="plan-comparison"
        aria-label="Owned plan-comparison"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned plan-comparison</span>
      </PlanComparison>
      <FeatureComparison
        id="feature-comparison"
        data-testid="feature-comparison"
        aria-label="Owned feature-comparison"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-comparison</span>
      </FeatureComparison>
      <UsagePricing
        id="usage-pricing"
        data-testid="usage-pricing"
        aria-label="Owned usage-pricing"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned usage-pricing</span>
      </UsagePricing>
      <EditorialHero
        id="editorial-hero"
        data-testid="editorial-hero"
        aria-label="Owned editorial-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned editorial-hero</span>
      </EditorialHero>
      <ProductDemoHero
        id="product-demo-hero"
        data-testid="product-demo-hero"
        aria-label="Owned product-demo-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned product-demo-hero</span>
      </ProductDemoHero>
      <WebglHero
        id="webgl-hero"
        data-testid="webgl-hero"
        aria-label="Owned webgl-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned webgl-hero</span>
      </WebglHero>
      <LogoWall
        id="logo-wall"
        data-testid="logo-wall"
        aria-label="Owned logo-wall"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned logo-wall</span>
      </LogoWall>
      <FeatureGrid
        id="feature-grid"
        data-testid="feature-grid"
        aria-label="Owned feature-grid"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-grid</span>
      </FeatureGrid>
      <AlternatingFeatureStory
        id="alternating-feature-story"
        data-testid="alternating-feature-story"
        aria-label="Owned alternating-feature-story"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned alternating-feature-story</span>
      </AlternatingFeatureStory>
      <ProductComparison
        id="product-comparison"
        data-testid="product-comparison"
        aria-label="Owned product-comparison"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned product-comparison</span>
      </ProductComparison>
      <MetricsStrip
        id="metrics-strip"
        data-testid="metrics-strip"
        aria-label="Owned metrics-strip"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <div>
          <dt>Label</dt>
          <dd>
            <span>Owned metrics-strip</span>
          </dd>
        </div>
      </MetricsStrip>
      <TestimonialGrid
        id="testimonial-grid"
        data-testid="testimonial-grid"
        aria-label="Owned testimonial-grid"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned testimonial-grid</span>
      </TestimonialGrid>
      <TestimonialCarousel
        id="testimonial-carousel"
        data-testid="testimonial-carousel"
        aria-label="Owned testimonial-carousel"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned testimonial-carousel</span>
      </TestimonialCarousel>
      <PricingTable
        id="pricing-table"
        data-testid="pricing-table"
        aria-label="Owned pricing-table"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned pricing-table</span>
      </PricingTable>
      <PricingComparison
        id="pricing-comparison"
        data-testid="pricing-comparison"
        aria-label="Owned pricing-comparison"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned pricing-comparison</span>
      </PricingComparison>
      <Faq
        id="faq"
        data-testid="faq"
        aria-label="Owned faq"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned faq</span>
      </Faq>
      <NewsletterSignup
        id="newsletter-signup"
        data-testid="newsletter-signup"
        aria-label="Owned newsletter-signup"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned newsletter-signup</span>
      </NewsletterSignup>
      <ContactForm
        id="contact-form"
        data-testid="contact-form"
        aria-label="Owned contact-form"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned contact-form</span>
      </ContactForm>
      <CtaSection
        id="cta-section"
        data-testid="cta-section"
        aria-label="Owned cta-section"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned cta-section</span>
      </CtaSection>
      <MarketingNavigation
        id="marketing-navigation"
        data-testid="marketing-navigation"
        aria-label="Owned marketing-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned marketing-navigation</span>
      </MarketingNavigation>
      <MegaNavigation
        id="mega-navigation"
        data-testid="mega-navigation"
        aria-label="Owned mega-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned mega-navigation</span>
      </MegaNavigation>
      <FloatingNavigation
        id="floating-navigation"
        data-testid="floating-navigation"
        aria-label="Owned floating-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned floating-navigation</span>
      </FloatingNavigation>
      <TerrainHero
        id="terrain-hero"
        data-testid="terrain-hero"
        aria-label="Owned terrain-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned terrain-hero</span>
      </TerrainHero>
      <TerrainReliefHero
        id="terrain-relief-hero"
        data-testid="terrain-relief-hero"
        aria-label="Owned terrain-relief-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned terrain-relief-hero</span>
      </TerrainReliefHero>
      <MarketingFooter
        id="marketing-footer"
        data-testid="marketing-footer"
        aria-label="Owned marketing-footer"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned marketing-footer</span>
      </MarketingFooter>
      <ParticleHero
        id="particle-hero"
        data-testid="particle-hero"
        aria-label="Owned particle-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned particle-hero</span>
      </ParticleHero>
      <LiquidHero
        id="liquid-hero"
        data-testid="liquid-hero"
        aria-label="Owned liquid-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned liquid-hero</span>
      </LiquidHero>
      <OrbHero
        id="orb-hero"
        data-testid="orb-hero"
        aria-label="Owned orb-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned orb-hero</span>
      </OrbHero>
      <SilkHero
        id="silk-hero"
        data-testid="silk-hero"
        aria-label="Owned silk-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned silk-hero</span>
      </SilkHero>
      <EclipseHero
        id="eclipse-hero"
        data-testid="eclipse-hero"
        aria-label="Owned eclipse-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned eclipse-hero</span>
      </EclipseHero>
      <TunnelHero
        id="tunnel-hero"
        data-testid="tunnel-hero"
        aria-label="Owned tunnel-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned tunnel-hero</span>
      </TunnelHero>
      <ConstellationHero
        id="constellation-hero"
        data-testid="constellation-hero"
        aria-label="Owned constellation-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned constellation-hero</span>
      </ConstellationHero>
      <DistortionHero
        id="distortion-hero"
        data-testid="distortion-hero"
        aria-label="Owned distortion-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned distortion-hero</span>
      </DistortionHero>
      <MediaHero
        id="media-hero"
        data-testid="media-hero"
        aria-label="Owned media-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned media-hero</span>
      </MediaHero>
      <TypographicHero
        id="typographic-hero"
        data-testid="typographic-hero"
        aria-label="Owned typographic-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned typographic-hero</span>
      </TypographicHero>
      <ShapeHero
        id="shape-hero"
        data-testid="shape-hero"
        aria-label="Owned shape-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned shape-hero</span>
      </ShapeHero>
      <StudioHero
        id="studio-hero"
        data-testid="studio-hero"
        aria-label="Owned studio-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned studio-hero</span>
      </StudioHero>
      <JournalHero
        id="journal-hero"
        data-testid="journal-hero"
        aria-label="Owned journal-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned journal-hero</span>
      </JournalHero>
      <PosterHero
        id="poster-hero"
        data-testid="poster-hero"
        aria-label="Owned poster-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned poster-hero</span>
      </PosterHero>
      <PortfolioHero
        id="portfolio-hero"
        data-testid="portfolio-hero"
        aria-label="Owned portfolio-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned portfolio-hero</span>
      </PortfolioHero>
      <CollageHero
        id="collage-hero"
        data-testid="collage-hero"
        aria-label="Owned collage-hero"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned collage-hero</span>
      </CollageHero>
      <EditorialNavigation
        id="editorial-navigation"
        data-testid="editorial-navigation"
        aria-label="Owned editorial-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned editorial-navigation</span>
      </EditorialNavigation>
      <CommerceNavigation
        id="commerce-navigation"
        data-testid="commerce-navigation"
        aria-label="Owned commerce-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned commerce-navigation</span>
      </CommerceNavigation>
      <StudioNavigation
        id="studio-navigation"
        data-testid="studio-navigation"
        aria-label="Owned studio-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned studio-navigation</span>
      </StudioNavigation>
      <ImmersiveLogin
        id="immersive-login"
        data-testid="immersive-login"
        aria-label="Owned immersive-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned immersive-login</span>
      </ImmersiveLogin>
      <RibbonLogin
        id="ribbon-login"
        data-testid="ribbon-login"
        aria-label="Owned ribbon-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned ribbon-login</span>
      </RibbonLogin>
      <EditorialLogin
        id="editorial-login"
        data-testid="editorial-login"
        aria-label="Owned editorial-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned editorial-login</span>
      </EditorialLogin>
      <ApplicationShell
        id="application-shell"
        data-testid="application-shell"
        aria-label="Owned application-shell"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned application-shell</span>
      </ApplicationShell>
      <WorkspaceNavigation
        id="workspace-navigation"
        data-testid="workspace-navigation"
        aria-label="Owned workspace-navigation"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned workspace-navigation</span>
      </WorkspaceNavigation>
      <AnalyticsOverview
        id="analytics-overview"
        data-testid="analytics-overview"
        aria-label="Owned analytics-overview"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned analytics-overview</span>
      </AnalyticsOverview>
      <ActivityFeed
        id="activity-feed"
        data-testid="activity-feed"
        aria-label="Owned activity-feed"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned activity-feed</span>
      </ActivityFeed>
      <SearchableRecordsScreen
        id="searchable-records-screen"
        data-testid="searchable-records-screen"
        aria-label="Owned searchable-records-screen"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned searchable-records-screen</span>
      </SearchableRecordsScreen>
      <RecordDetailPanel
        id="record-detail-panel"
        data-testid="record-detail-panel"
        aria-label="Owned record-detail-panel"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned record-detail-panel</span>
      </RecordDetailPanel>
      <KanbanBoard
        id="kanban-board"
        data-testid="kanban-board"
        aria-label="Owned kanban-board"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned kanban-board</span>
      </KanbanBoard>
      <TaskList
        id="task-list"
        data-testid="task-list"
        aria-label="Owned task-list"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <li>
          <span>Owned task-list</span>
        </li>
      </TaskList>
      <CalendarSchedule
        id="calendar-schedule"
        data-testid="calendar-schedule"
        aria-label="Owned calendar-schedule"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned calendar-schedule</span>
      </CalendarSchedule>
      <OnboardingWizard
        id="onboarding-wizard"
        data-testid="onboarding-wizard"
        aria-label="Owned onboarding-wizard"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned onboarding-wizard</span>
      </OnboardingWizard>
      <SignInForm
        id="sign-in-form"
        data-testid="sign-in-form"
        aria-label="Owned sign-in-form"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned sign-in-form</span>
      </SignInForm>
      <SignUpForm
        id="sign-up-form"
        data-testid="sign-up-form"
        aria-label="Owned sign-up-form"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned sign-up-form</span>
      </SignUpForm>
      <PasswordResetForm
        id="password-reset-form"
        data-testid="password-reset-form"
        aria-label="Owned password-reset-form"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned password-reset-form</span>
      </PasswordResetForm>
      <ProfileSettings
        id="profile-settings"
        data-testid="profile-settings"
        aria-label="Owned profile-settings"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned profile-settings</span>
      </ProfileSettings>
      <TeamManagement
        id="team-management"
        data-testid="team-management"
        aria-label="Owned team-management"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned team-management</span>
      </TeamManagement>
      <BillingSettings
        id="billing-settings"
        data-testid="billing-settings"
        aria-label="Owned billing-settings"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned billing-settings</span>
      </BillingSettings>
      <NotificationCentre
        id="notification-centre"
        data-testid="notification-centre"
        aria-label="Owned notification-centre"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned notification-centre</span>
      </NotificationCentre>
      <CommandSearch
        id="command-search"
        data-testid="command-search"
        aria-label="Owned command-search"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned command-search</span>
      </CommandSearch>
      <ChatWorkspace
        id="chat-workspace"
        data-testid="chat-workspace"
        aria-label="Owned chat-workspace"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned chat-workspace</span>
      </ChatWorkspace>
      <WorkspaceSidebar
        id="workspace-sidebar"
        data-testid="workspace-sidebar"
        aria-label="Owned workspace-sidebar"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned workspace-sidebar</span>
      </WorkspaceSidebar>
      <RailSidebar
        id="rail-sidebar"
        data-testid="rail-sidebar"
        aria-label="Owned rail-sidebar"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned rail-sidebar</span>
      </RailSidebar>
      <InsetSidebar
        id="inset-sidebar"
        data-testid="inset-sidebar"
        aria-label="Owned inset-sidebar"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned inset-sidebar</span>
      </InsetSidebar>
      <UserSwitcher
        id="user-switcher"
        data-testid="user-switcher"
        aria-label="Owned user-switcher"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned user-switcher</span>
      </UserSwitcher>
      <OrganizationSwitcher
        id="organization-switcher"
        data-testid="organization-switcher"
        aria-label="Owned organization-switcher"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned organization-switcher</span>
      </OrganizationSwitcher>
      <SSOLogin
        id="sso-login"
        data-testid="sso-login"
        aria-label="Owned sso-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned sso-login</span>
      </SSOLogin>
      <SplitLogin
        id="split-login"
        data-testid="split-login"
        aria-label="Owned split-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned split-login</span>
      </SplitLogin>
      <WorkspaceLogin
        id="workspace-login"
        data-testid="workspace-login"
        aria-label="Owned workspace-login"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned workspace-login</span>
      </WorkspaceLogin>
      <FeatureCarousel
        id="feature-carousel"
        data-testid="feature-carousel"
        aria-label="Owned feature-carousel"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-carousel</span>
      </FeatureCarousel>
      <ExpandableFeatures
        id="expandable-features"
        data-testid="expandable-features"
        aria-label="Owned expandable-features"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned expandable-features</span>
      </ExpandableFeatures>
      <FeatureTabs
        id="feature-tabs"
        data-testid="feature-tabs"
        aria-label="Owned feature-tabs"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-tabs</span>
      </FeatureTabs>
      <FeatureMosaic
        id="feature-mosaic"
        data-testid="feature-mosaic"
        aria-label="Owned feature-mosaic"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-mosaic</span>
      </FeatureMosaic>
      <FeatureSpotlight
        id="feature-spotlight"
        data-testid="feature-spotlight"
        aria-label="Owned feature-spotlight"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned feature-spotlight</span>
      </FeatureSpotlight>
      <ProductBento
        id="product-bento"
        data-testid="product-bento"
        aria-label="Owned product-bento"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned product-bento</span>
      </ProductBento>
      <IntegrationBento
        id="integration-bento"
        data-testid="integration-bento"
        aria-label="Owned integration-bento"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned integration-bento</span>
      </IntegrationBento>
      <HowItWorksHorizontal
        id="how-it-works-horizontal"
        data-testid="how-it-works-horizontal"
        aria-label="Owned how-it-works-horizontal"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned how-it-works-horizontal</span>
      </HowItWorksHorizontal>
      <HowItWorksVertical
        id="how-it-works-vertical"
        data-testid="how-it-works-vertical"
        aria-label="Owned how-it-works-vertical"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned how-it-works-vertical</span>
      </HowItWorksVertical>
      <CenteredAuth
        id="centered-auth"
        data-testid="centered-auth"
        aria-label="Owned centered-auth"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned centered-auth</span>
      </CenteredAuth>
      <SplitAuth
        id="split-auth"
        data-testid="split-auth"
        aria-label="Owned split-auth"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned split-auth</span>
      </SplitAuth>
      <InsetAuth
        id="inset-auth"
        data-testid="inset-auth"
        aria-label="Owned inset-auth"
        className="p-2!"
        style={{ outlineOffset: 7 }}
        ref={(node) => {
          if (node) node.dataset.refConnected = "true";
        }}
      >
        <span>Owned inset-auth</span>
      </InsetAuth>
    </main>
  );
}
