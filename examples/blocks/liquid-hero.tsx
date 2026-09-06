"use client";
import {
  LiquidHero,
  LiquidHeroLayout,
  LiquidHeroCopyContent,
  LiquidHeroArtwork,
} from "../../registry/blocks/liquid-hero";

export default function Example() {
  return (
    <LiquidHero>
      <LiquidHeroLayout>
        <LiquidHeroCopyContent />
        <LiquidHeroArtwork />
      </LiquidHeroLayout>
    </LiquidHero>
  );
}
