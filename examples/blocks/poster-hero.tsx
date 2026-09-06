"use client";
import {
  PosterHero,
  PosterHeroContent,
  PosterHeroBrand,
  PosterHeroCopyContent,
  PosterHeroDescription,
  PosterHeroAction,
} from "../../registry/blocks/poster-hero";
export default function Example() {
  return (
    <PosterHero>
      <PosterHeroContent>
        <PosterHeroBrand />
        <PosterHeroCopyContent />
        <div className="grid gap-7 md:grid-cols-2">
          <PosterHeroDescription />
          <PosterHeroAction />
        </div>
      </PosterHeroContent>
    </PosterHero>
  );
}
