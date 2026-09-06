"use client";
import {
  FeatureMosaic,
  FeatureMosaicGrid,
  FeatureMosaicHeading,
} from "../../registry/blocks/feature-mosaic";
export default function FeatureMosaicExample() {
  return (
    <FeatureMosaic>
      <FeatureMosaicHeading />
      <FeatureMosaicGrid />
    </FeatureMosaic>
  );
}
