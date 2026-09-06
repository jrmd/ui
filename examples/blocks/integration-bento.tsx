"use client";
import {
  IntegrationBento,
  IntegrationBentoGrid,
  IntegrationBentoHeading,
} from "../../registry/blocks/integration-bento";
export default function IntegrationBentoExample() {
  return (
    <IntegrationBento>
      <IntegrationBentoHeading />
      <IntegrationBentoGrid />
    </IntegrationBento>
  );
}
