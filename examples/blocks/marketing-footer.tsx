"use client";
import {
  MarketingFooter,
  MarketingFooterBrand,
  MarketingFooterLinks,
  MarketingFooterNote,
} from "../../registry/blocks/marketing-footer";

export default function Example() {
  return (
    <MarketingFooter>
      <MarketingFooterBrand />
      <MarketingFooterLinks />
      <MarketingFooterNote />
    </MarketingFooter>
  );
}
