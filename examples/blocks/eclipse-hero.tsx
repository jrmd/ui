"use client";
import {
  EclipseHero,
  EclipseHeroLayout,
  EclipseHeroCopyContent,
  EclipseHeroArtwork,
} from "../../registry/blocks/eclipse-hero";

export default function Example() {
  return (
    <EclipseHero>
      <EclipseHeroLayout>
        <EclipseHeroCopyContent />
        <EclipseHeroArtwork />
      </EclipseHeroLayout>
    </EclipseHero>
  );
}
