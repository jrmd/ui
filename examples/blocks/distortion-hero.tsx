"use client";
import {
  DistortionHero,
  DistortionHeroMasthead,
  DistortionHeroBrand,
  DistortionHeroMeta,
  DistortionHeroArtwork,
  DistortionHeroIntro,
} from "../../registry/blocks/distortion-hero";

export default function Example() {
  return (
    <DistortionHero>
      <DistortionHeroMasthead>
        <DistortionHeroBrand />
        <DistortionHeroMeta />
      </DistortionHeroMasthead>
      <DistortionHeroArtwork />
      <DistortionHeroIntro />
    </DistortionHero>
  );
}
