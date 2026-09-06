"use client";
import {
  SilkHero,
  SilkHeroMasthead,
  SilkHeroBrand,
  SilkHeroMeta,
  SilkHeroScene,
  SilkHeroArtwork,
  SilkHeroCopyContent,
  SilkHeroFooter,
  SilkHeroAction,
} from "../../registry/blocks/silk-hero";

export default function Example() {
  return (
    <SilkHero>
      <SilkHeroMasthead>
        <SilkHeroBrand />
        <SilkHeroMeta />
      </SilkHeroMasthead>
      <SilkHeroScene>
        <SilkHeroArtwork />
        <SilkHeroCopyContent />
      </SilkHeroScene>
      <SilkHeroFooter>
        <SilkHeroAction />
      </SilkHeroFooter>
    </SilkHero>
  );
}
