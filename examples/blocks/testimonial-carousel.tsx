"use client";
import {
  TestimonialCarousel,
  TestimonialCarouselHeading,
  TestimonialCarouselSlides,
  TestimonialCarouselControls,
} from "../../registry/blocks/testimonial-carousel";

export default function Example() {
  return (
    <TestimonialCarousel>
      <TestimonialCarouselHeading />
      <TestimonialCarouselSlides />
      <TestimonialCarouselControls />
    </TestimonialCarousel>
  );
}
