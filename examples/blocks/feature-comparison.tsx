"use client";
import {
  FeatureComparison,
  FeatureComparisonHeading,
  FeatureComparisonLead,
  FeatureComparisonMatrix,
  FeatureComparisonStatus,
} from "../../registry/blocks/feature-comparison";

export default function Example() {
  return (
    <FeatureComparison>
      <FeatureComparisonHeading />
      <FeatureComparisonLead />
      <FeatureComparisonMatrix />
      <FeatureComparisonStatus />
    </FeatureComparison>
  );
}
