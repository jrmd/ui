"use client";
import {
  TypographicHero,
  TypographicHeroMasthead,
  TypographicHeroBrand,
  TypographicHeroMeta,
  TypographicHeroIntro,
} from "../../registry/blocks/typographic-hero";

export default function Example() {
  return (
    <TypographicHero>
      <TypographicHeroMasthead>
        <TypographicHeroBrand />
        <TypographicHeroMeta />
      </TypographicHeroMasthead>
      <TypographicHeroIntro />
    </TypographicHero>
  );
}
