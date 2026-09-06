"use client";
import {
  PlanComparison,
  PlanComparisonToolbar,
  PlanComparisonBillingNote,
  PlanComparisonPlans,
  PlanComparisonStatus,
} from "../../registry/blocks/plan-comparison";

export default function Example() {
  return (
    <PlanComparison>
      <PlanComparisonToolbar />
      <PlanComparisonBillingNote />
      <PlanComparisonPlans />
      <PlanComparisonStatus />
    </PlanComparison>
  );
}
