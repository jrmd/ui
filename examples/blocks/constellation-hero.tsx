"use client";
import {
  ConstellationHero,
  ConstellationHeroContent,
  ConstellationHeroCopyContent,
  ConstellationHeroArtwork,
} from "../../registry/blocks/constellation-hero";
export default function Example() {
  return (
    <ConstellationHero>
      <ConstellationHeroContent>
        <ConstellationHeroCopyContent />
        <ConstellationHeroArtwork />
      </ConstellationHeroContent>
    </ConstellationHero>
  );
}
