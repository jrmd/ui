"use client";
import {
  TunnelHero,
  TunnelHeroScene,
  TunnelHeroArtwork,
  TunnelHeroCopyContent,
} from "../../registry/blocks/tunnel-hero";

export default function Example() {
  return (
    <TunnelHero>
      <TunnelHeroScene>
        <TunnelHeroArtwork />
        <TunnelHeroCopyContent />
      </TunnelHeroScene>
    </TunnelHero>
  );
}
