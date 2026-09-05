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
import { AnalyticsOverview } from "@registry/blocks/analytics-overview";
import { SearchableRecordsScreen } from "@registry/blocks/searchable-records-screen";
import { ProfileSettings } from "@registry/blocks/profile-settings";
import { DateRangePicker } from "@registry/ui/date-range-picker";
import { DataTable } from "@registry/ui/data-table";
import { BarChart } from "@registry/ui/bar-chart";
import { Button } from "@registry/ui/button";
const reports = [
  {
    name: "Weekly performance",
    date: "2026-09-05",
    sessions: 8204,
    revenue: 12430,
  },
  {
    name: "August overview",
    date: "2026-08-31",
    sessions: 18204,
    revenue: 24860,
  },
  {
    name: "Acquisition channels",
    date: "2026-08-20",
    sessions: 6400,
    revenue: 8200,
  },
];
export function TemplateView({ route = "", basePath = "" }: TemplateProps) {
  const [range, setRange] = React.useState({
    from: "2026-08-01",
    to: "2026-09-30",
  });
  const filtered = reports.filter(
    (r) =>
      (!range.from || r.date >= range.from) &&
      (!range.to || r.date <= range.to),
  );
  function csv() {
    const text =
      "Report,Date,Sessions,Revenue\n" +
      filtered
        .map((r) => [r.name, r.date, r.sessions, r.revenue].join(","))
        .join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "metric-report.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Workspace
      brand="Metric"
      basePath={basePath}
      nav={["reports", "customers", "settings"]}
    >
      <PageTitle
        title={
          route === "customers"
            ? "Customers"
            : route === "settings"
              ? "Settings"
              : route.startsWith("reports/")
                ? "Weekly performance"
                : route === "reports"
                  ? "Reports"
                  : "Business overview"
        }
        text="September 2026 · Illustrative business data"
      />
      {route === "customers" ? (
        <SearchableRecordsScreen />
      ) : route === "settings" ? (
        <ProfileSettings />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-border bg-muted/20 p-4">
            <DateRangePicker value={range} onValueChange={setRange} />
            <Button variant="outline" onClick={csv}>
              Export CSV ↓
            </Button>
          </div>
          {route.startsWith("reports/") ? (
            <>
              <BarChart
                data={filtered.map((r) => ({ name: r.name, value: r.revenue }))}
                label="Revenue by report"
              />
              <p className="mt-8 text-sm text-muted-foreground">
                Filtered report data. Values are illustrative.
              </p>
            </>
          ) : route === "reports" ? (
            <DataTable
              data={filtered}
              label="Reports"
              columns={[
                {
                  accessorKey: "name",
                  header: "Report",
                  cell: (c) => (
                    <a
                      className="underline"
                      href={basePath + "/reports/weekly"}
                    >
                      {String(c.getValue())}
                    </a>
                  ),
                },
                { accessorKey: "date", header: "Date" },
                { accessorKey: "sessions", header: "Sessions" },
                { accessorKey: "revenue", header: "Revenue" },
              ]}
            />
          ) : (
            <>
              <AnalyticsOverview />
              <div className="mt-7">
                <h2 className="mb-4 text-sm font-semibold">Recent reports</h2>
                <DataTable
                  data={filtered}
                  label="Reports in selected range"
                  columns={[
                    { accessorKey: "name", header: "Report" },
                    { accessorKey: "sessions", header: "Sessions" },
                    { accessorKey: "revenue", header: "Revenue" },
                  ]}
                />
              </div>
            </>
          )}
        </>
      )}
    </Workspace>
  );
}
