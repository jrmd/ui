"use client";
import {
  ShapeHero,
  ShapeHeroContent,
  ShapeHeroCopyContent,
  ShapeHeroArtwork,
} from "../../registry/blocks/shape-hero";
export default function Example() {
  return (
    <ShapeHero>
      <ShapeHeroContent>
        <ShapeHeroCopyContent />
        <ShapeHeroArtwork />
      </ShapeHeroContent>
    </ShapeHero>
  );
}
