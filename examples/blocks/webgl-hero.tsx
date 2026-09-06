"use client";
import {
  WebglHero,
  WebglHeroIntro,
  WebglHeroArtwork,
  WebglHeroControls,
} from "../../registry/blocks/webgl-hero";

export default function Example() {
  return (
    <WebglHero>
      <WebglHeroIntro />
      <WebglHeroArtwork />
      <WebglHeroControls />
    </WebglHero>
  );
}
