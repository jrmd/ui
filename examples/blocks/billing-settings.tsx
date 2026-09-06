"use client";
import {
  BillingSettings,
  BillingSettingsError,
  BillingSettingsIntro,
  BillingSettingsPlans,
  BillingSettingsUsage,
  BillingSettingsActions,
  BillingSettingsStatus,
} from "../../registry/blocks/billing-settings";

export default function Example() {
  return (
    <BillingSettings>
      <BillingSettingsError />
      <BillingSettingsIntro />
      <BillingSettingsPlans />
      <BillingSettingsUsage />
      <BillingSettingsActions />
      <BillingSettingsStatus />
    </BillingSettings>
  );
}
