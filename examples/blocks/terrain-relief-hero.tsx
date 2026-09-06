"use client";
import {
  TerrainReliefHero,
  TerrainReliefHeroMasthead,
  TerrainReliefHeroBrand,
  TerrainReliefHeroMeta,
  TerrainReliefHeroIntro,
  TerrainReliefHeroArtwork,
  TerrainReliefHeroControls,
} from "../../registry/blocks/terrain-relief-hero";

export default function Example() {
  return (
    <TerrainReliefHero>
      <TerrainReliefHeroMasthead>
        <TerrainReliefHeroBrand />
        <TerrainReliefHeroMeta />
      </TerrainReliefHeroMasthead>
      <TerrainReliefHeroIntro />
      <TerrainReliefHeroArtwork />
      <TerrainReliefHeroControls />
    </TerrainReliefHero>
  );
}
