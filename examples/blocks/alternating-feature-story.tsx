"use client";
import {
  AlternatingFeatureStory,
  AlternatingFeatureStoryOverview,
  AlternatingFeatureStoryActivity,
} from "../../registry/blocks/alternating-feature-story";

export default function Example() {
  return (
    <AlternatingFeatureStory>
      <AlternatingFeatureStoryOverview />
      <AlternatingFeatureStoryActivity />
    </AlternatingFeatureStory>
  );
}
