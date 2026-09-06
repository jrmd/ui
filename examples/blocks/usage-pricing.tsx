"use client";
import {
  UsagePricing,
  UsagePricingCalculator,
  UsagePricingPlans,
} from "../../registry/blocks/usage-pricing";

export default function Example() {
  return (
    <UsagePricing>
      <UsagePricingCalculator />
      <UsagePricingPlans />
    </UsagePricing>
  );
}
