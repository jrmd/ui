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
    <header className="pb-7 pt-2">
      <h1 className="font-display text-2xl tracking-tight sm:text-3xl">
        {title}
      </h1>
      {text && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{text}</p>
      )}
    </header>
  );
}
import { ChatWorkspace } from "@registry/blocks/chat-workspace";
import { ProfileSettings } from "@registry/blocks/profile-settings";
export function TemplateView({ route = "", basePath = "" }: TemplateProps) {
  return (
    <Workspace
      brand="Margin"
      basePath={basePath}
      nav={["conversation/demo", "library", "settings"]}
    >
      {route === "settings" ? (
        <>
          <PageTitle title="Preferences" />
          <ProfileSettings />
        </>
      ) : route === "library" ? (
        <>
          <PageTitle
            title="Your prompt library"
            text="Saved prompts for the blank-page moments."
          />
          <div className="grid gap-5">
            {[
              "Find a clearer way to explain an idea",
              "Break a big project into small steps",
              "Think through a difficult tradeoff",
            ].map((t) => (
              <a
                key={t}
                className="border-b border-border py-6 font-display text-2xl"
                href={basePath + "/conversation/demo"}
              >
                {t} →
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-3xl py-3">
          <ChatWorkspace conversationId={route ? "demo" : "new"} />
        </div>
      )}
    </Workspace>
  );
}
