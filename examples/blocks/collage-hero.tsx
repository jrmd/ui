"use client";
import {
  CollageHero,
  CollageHeroContent,
  CollageHeroBrand,
  CollageHeroGallery,
  CollageHeroMedia,
  CollageHeroCopyContent,
  CollageHeroSecondaryMedia,
  CollageHeroFootnote,
} from "../../registry/blocks/collage-hero";
export default function Example() {
  return (
    <CollageHero>
      <CollageHeroContent>
        <CollageHeroBrand />
        <CollageHeroGallery>
          <CollageHeroMedia />
          <CollageHeroCopyContent />
          <CollageHeroSecondaryMedia />
        </CollageHeroGallery>
        <CollageHeroFootnote />
      </CollageHeroContent>
    </CollageHero>
  );
}
