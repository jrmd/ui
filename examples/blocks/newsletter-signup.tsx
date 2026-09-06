"use client";
import {
  NewsletterSignup,
  NewsletterSignupEyebrow,
  NewsletterSignupHeading,
  NewsletterSignupLead,
  NewsletterSignupFields,
  NewsletterSignupPrivacy,
  NewsletterSignupStatus,
} from "../../registry/blocks/newsletter-signup";

export default function Example() {
  return (
    <NewsletterSignup>
      <NewsletterSignupEyebrow />
      <NewsletterSignupHeading />
      <NewsletterSignupLead />
      <NewsletterSignupFields />
      <NewsletterSignupPrivacy />
      <NewsletterSignupStatus />
    </NewsletterSignup>
  );
}
