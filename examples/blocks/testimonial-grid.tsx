"use client";
import {
  TestimonialGrid,
  TestimonialGridHeading,
  TestimonialGridLead,
  TestimonialGridQuotes,
} from "../../registry/blocks/testimonial-grid";

export default function Example() {
  return (
    <TestimonialGrid>
      <TestimonialGridHeading />
      <TestimonialGridLead />
      <TestimonialGridQuotes />
    </TestimonialGrid>
  );
}
