"use client";
import {
  NewsletterFooter,
  NewsletterFooterColumns,
  NewsletterFooterBranding,
} from "../../registry/blocks/newsletter-footer";

export default function Example() {
  return (
    <NewsletterFooter>
      <NewsletterFooterColumns />
      <NewsletterFooterBranding />
    </NewsletterFooter>
  );
}
