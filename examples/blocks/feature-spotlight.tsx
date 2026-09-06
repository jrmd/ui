"use client";
import {
  FeatureSpotlight,
  FeatureSpotlightCopy,
  FeatureSpotlightFrame,
  FeatureSpotlightPreview,
} from "../../registry/blocks/feature-spotlight";
export default function FeatureSpotlightExample() {
  return (
    <FeatureSpotlight>
      <FeatureSpotlightFrame>
        <FeatureSpotlightCopy />
        <FeatureSpotlightPreview />
      </FeatureSpotlightFrame>
    </FeatureSpotlight>
  );
}
