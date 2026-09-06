"use client";
import {
  PricingTable,
  PricingTableHeader,
  PricingTableTitle,
  PricingTableLead,
  PricingTableBillingToggle,
  PricingTableContent,
  PricingTableItem,
  PricingTableItemTitle,
  PricingTableItemDescription,
  PricingTablePrice,
  PricingTableFeatures,
} from "../../registry/blocks/pricing-table";

export default function PricingTableExample() {
  return (
    <PricingTable formatPrice={(amount) => `$${amount}`}>
      <PricingTableHeader>
        <div>
          <PricingTableTitle>A plan for your studio.</PricingTableTitle>
          <PricingTableLead>Choose how you want to work.</PricingTableLead>
        </div>
      </PricingTableHeader>
      <PricingTableContent className="md:grid-cols-1">
        <PricingTableItem>
          <PricingTableItemTitle>Independent</PricingTableItemTitle>
          <PricingTableItemDescription>
            For small teams with big ideas.
          </PricingTableItemDescription>
          <PricingTablePrice amount={12} annualAmount={9} />
          <a href="#join">Join the studio</a>
          <PricingTableFeatures>
            <li>Unlimited projects</li>
            <li>Your own domain</li>
          </PricingTableFeatures>
        </PricingTableItem>
      </PricingTableContent>
      <PricingTableBillingToggle className="mt-6">
        Pay annually
      </PricingTableBillingToggle>
    </PricingTable>
  );
}
