"use client";
import {
  TerrainHero,
  TerrainHeroMasthead,
  TerrainHeroBrand,
  TerrainHeroMeta,
  TerrainHeroIntro,
  TerrainHeroArtwork,
  TerrainHeroControls,
} from "../../registry/blocks/terrain-hero";

export default function Example() {
  return (
    <TerrainHero>
      <TerrainHeroMasthead>
        <TerrainHeroBrand />
        <TerrainHeroMeta />
      </TerrainHeroMasthead>
      <TerrainHeroIntro />
      <TerrainHeroArtwork />
      <TerrainHeroControls />
    </TerrainHero>
  );
}
