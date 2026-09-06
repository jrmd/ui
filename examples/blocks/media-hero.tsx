"use client";
import {
  MediaHero,
  MediaHeroLayout,
  MediaHeroCopyContent,
  MediaHeroMedia,
} from "../../registry/blocks/media-hero";

export default function Example() {
  return (
    <MediaHero>
      <MediaHeroLayout>
        <MediaHeroCopyContent />
        <MediaHeroMedia />
      </MediaHeroLayout>
    </MediaHero>
  );
}
