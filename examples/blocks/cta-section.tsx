"use client";
import {
  CtaSection,
  CtaSectionContent,
  CtaSectionTitle,
  CtaSectionDescription,
  CtaSectionAction,
} from "../../registry/blocks/cta-section";

export default function CtaSectionExample() {
  return (
    <CtaSection>
      <CtaSectionContent>
        <CtaSectionTitle>Make something together.</CtaSectionTitle>
        <CtaSectionDescription>
          Bring your next idea to the workshop.
        </CtaSectionDescription>
      </CtaSectionContent>
      <CtaSectionAction asChild variant="outline">
        <a href="#contact">Visit the workshop</a>
      </CtaSectionAction>
    </CtaSection>
  );
}
