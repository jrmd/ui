"use client";
import {
  ParticleHero,
  ParticleHeroIntro,
  ParticleHeroArtwork,
  ParticleHeroFooter,
  ParticleHeroDescription,
  ParticleHeroAction,
} from "../../registry/blocks/particle-hero";

export default function Example() {
  return (
    <ParticleHero>
      <ParticleHeroIntro />
      <ParticleHeroArtwork />
      <ParticleHeroFooter>
        <ParticleHeroDescription />
        <ParticleHeroAction />
      </ParticleHeroFooter>
    </ParticleHero>
  );
}
