"use client";
import {
  OnboardingWizard,
  OnboardingWizardSteps,
  OnboardingWizardStepContent,
} from "../../registry/blocks/onboarding-wizard";

export default function Example() {
  return (
    <OnboardingWizard>
      <OnboardingWizardSteps />
      <OnboardingWizardStepContent />
    </OnboardingWizard>
  );
}
