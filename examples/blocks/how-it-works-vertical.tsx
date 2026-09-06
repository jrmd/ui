"use client";

import {
  HowItWorksVertical,
  HowItWorksVerticalHeaderContent,
  HowItWorksVerticalSteps,
} from "../../registry/blocks/how-it-works-vertical";

export default function HowItWorksVerticalExample() {
  return (
    <HowItWorksVertical>
      <HowItWorksVerticalHeaderContent />
      <HowItWorksVerticalSteps />
    </HowItWorksVertical>
  );
}
