"use client";
import {
  AnalyticsOverview,
  AnalyticsOverviewMetrics,
  AnalyticsOverviewCharts,
} from "../../registry/blocks/analytics-overview";

export default function Example() {
  return (
    <AnalyticsOverview>
      <AnalyticsOverviewMetrics />
      <AnalyticsOverviewCharts />
    </AnalyticsOverview>
  );
}
