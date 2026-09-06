"use client";
import {
  StudioHero,
  StudioHeroMasthead,
  StudioHeroBrand,
  StudioHeroMeta,
  StudioHeroHeading,
  StudioHeroShowcase,
} from "../../registry/blocks/studio-hero";

export default function Example() {
  return (
    <StudioHero>
      <StudioHeroMasthead>
        <StudioHeroBrand />
        <StudioHeroMeta />
      </StudioHeroMasthead>
      <StudioHeroHeading />
      <StudioHeroShowcase />
    </StudioHero>
  );
}
