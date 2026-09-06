"use client";
import {
  OrbHero,
  OrbHeroMasthead,
  OrbHeroBrand,
  OrbHeroMeta,
  OrbHeroLayout,
  OrbHeroArtwork,
  OrbHeroCopyContent,
} from "../../registry/blocks/orb-hero";

export default function Example() {
  return (
    <OrbHero>
      <OrbHeroMasthead>
        <OrbHeroBrand />
        <OrbHeroMeta />
      </OrbHeroMasthead>
      <OrbHeroLayout>
        <OrbHeroArtwork />
        <OrbHeroCopyContent />
      </OrbHeroLayout>
    </OrbHero>
  );
}
