"use client";
import * as React from "react";
import { MarketingNavigation } from "@registry/blocks/marketing-navigation";
import { MarketingFooter } from "@registry/blocks/marketing-footer";
import { ApplicationShell } from "@registry/blocks/application-shell";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
function name(p: string) {
  return p
    .split("/")[0]
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
function Marketing({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  const items = nav.map((p) => ({ label: name(p), href: basePath + "/" + p }));
  return (
    <div className="template-marketing mx-auto max-w-7xl px-5 md:px-10">
      <MarketingNavigation brand={brand} home={basePath + "/"} items={items} />
      {children}
      <MarketingFooter brand={brand} items={items} />
    </div>
  );
}
function Workspace({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell
      brand={brand}
      items={[
        { label: "Overview", href: basePath + "/" },
        ...nav.map((p) => ({ label: name(p), href: basePath + "/" + p })),
      ]}
    >
      {children}
    </ApplicationShell>
  );
}
function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <header className="py-10 md:py-12">
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>}
    </header>
  );
}
import { ProductDemoHero } from "@registry/blocks/product-demo-hero";
import { FeatureGrid } from "@registry/blocks/feature-grid";
import { AlternatingFeatureStory } from "@registry/blocks/alternating-feature-story";
import { PricingTable } from "@registry/blocks/pricing-table";
import { PricingComparison } from "@registry/blocks/pricing-comparison";
import { Faq } from "@registry/blocks/faq";
import { ContactForm } from "@registry/blocks/contact-form";
import { SignInForm } from "@registry/blocks/sign-in-form";
import { CtaSection } from "@registry/blocks/cta-section";
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const link = (p: string) => basePath + "/" + p;
  return (
    <Marketing
      brand="Forma"
      basePath={basePath}
      nav={["features", "pricing", "contact", "sign-in"]}
    >
      <main>
        {route === "features" ? (
          <>
            <PageTitle
              title="Everything the project needs."
              text="Keep the scope, the decisions, and the next step in the same place."
            />
            <AlternatingFeatureStory />
            <FeatureGrid />
            <CtaSection href={link("contact")} />
          </>
        ) : route === "pricing" ? (
          <>
            <PricingTable href={link("contact")} />
            <PricingComparison />
            <Faq />
          </>
        ) : route === "contact" ? (
          <>
            <PageTitle
              title="Tell us about your team."
              text="Tell us about your team and what you’re hoping to build."
            />
            <ContactForm />
          </>
        ) : route === "sign-in" ? (
          <div className="grid min-h-[65vh] place-items-center py-16">
            <SignInForm />
          </div>
        ) : (
          <>
            <ProductDemoHero href={link("features")} />
            <FeatureGrid />
            <AlternatingFeatureStory />
            <CtaSection href={link("contact")} />
          </>
        )}
      </main>
    </Marketing>
  );
}
