"use client";
import {
  FeatureCarousel,
  FeatureCarouselHeading,
  FeatureCarouselSlides,
  FeatureCarouselControls,
} from "../../registry/blocks/feature-carousel";
export default function Example() {
  return (
    <FeatureCarousel layout="rail">
      <FeatureCarouselHeading />
      <FeatureCarouselSlides />
      <FeatureCarouselControls />
    </FeatureCarousel>
  );
}
