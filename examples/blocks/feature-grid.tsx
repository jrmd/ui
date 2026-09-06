"use client";
import {
  FeatureGrid,
  FeatureGridHeader,
  FeatureGridTitle,
  FeatureGridDescription,
  FeatureGridLayout,
  FeatureGridList,
  FeatureGridItem,
  FeatureGridItemLabel,
  FeatureGridItemDescription,
  FeatureGridPreview,
  FeatureGridPanel,
} from "../../registry/blocks/feature-grid";

export default function FeatureGridExample() {
  return (
    <FeatureGrid defaultValue={10}>
      <FeatureGridHeader>
        <FeatureGridTitle>Work at your own pace.</FeatureGridTitle>
        <FeatureGridDescription>
          Choose a stage to explore.
        </FeatureGridDescription>
      </FeatureGridHeader>
      <FeatureGridLayout>
        <FeatureGridPreview>
          <FeatureGridPanel value={10}>
            A space for early ideas.
          </FeatureGridPanel>
          <FeatureGridPanel value={20}>
            Share a finished project with your team.
          </FeatureGridPanel>
        </FeatureGridPreview>
        <FeatureGridList>
          <FeatureGridItem value={10}>
            <FeatureGridItemLabel>Explore</FeatureGridItemLabel>
            <FeatureGridItemDescription className="pl-0">
              Collect and compare possibilities.
            </FeatureGridItemDescription>
          </FeatureGridItem>
          <FeatureGridItem value={20}>
            <FeatureGridItemLabel>Publish</FeatureGridItemLabel>
            <FeatureGridItemDescription className="pl-0">
              Put a considered idea into the world.
            </FeatureGridItemDescription>
          </FeatureGridItem>
        </FeatureGridList>
      </FeatureGridLayout>
    </FeatureGrid>
  );
}
