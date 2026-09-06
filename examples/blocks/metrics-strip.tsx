"use client";
import {
  MetricsStrip,
  MetricsStripItem,
  MetricsStripLabel,
  MetricsStripValue,
} from "../../registry/blocks/metrics-strip";
export default function Example() {
  return (
    <MetricsStrip>
      <MetricsStripItem>
        <MetricsStripLabel>Projects shipped</MetricsStripLabel>
        <MetricsStripValue>42</MetricsStripValue>
      </MetricsStripItem>
      <MetricsStripItem>
        <MetricsStripLabel>Team members</MetricsStripLabel>
        <MetricsStripValue>12</MetricsStripValue>
      </MetricsStripItem>
    </MetricsStrip>
  );
}
