"use client";

import {
  HowItWorksHorizontal,
  HowItWorksHorizontalHeaderContent,
  HowItWorksHorizontalSteps,
} from "../../registry/blocks/how-it-works-horizontal";

export default function HowItWorksHorizontalExample() {
  return (
    <HowItWorksHorizontal>
      <HowItWorksHorizontalHeaderContent />
      <HowItWorksHorizontalSteps />
    </HowItWorksHorizontal>
  );
}
