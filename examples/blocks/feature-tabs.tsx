"use client";
import {
  FeatureTabs,
  FeatureTabsHeader,
  FeatureTabsList,
  FeatureTabsPanels,
} from "../../registry/blocks/feature-tabs";
export default function Example() {
  return (
    <FeatureTabs>
      <FeatureTabsHeader />
      <FeatureTabsList />
      <FeatureTabsPanels />
    </FeatureTabs>
  );
}
