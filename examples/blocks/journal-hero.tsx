"use client";
import {
  JournalHero,
  JournalHeroMasthead,
  JournalHeroContent,
  JournalHeroCopyContent,
  JournalHeroMedia,
} from "../../registry/blocks/journal-hero";
export default function Example() {
  return (
    <JournalHero>
      <JournalHeroMasthead />
      <JournalHeroContent>
        <JournalHeroCopyContent />
        <JournalHeroMedia />
      </JournalHeroContent>
    </JournalHero>
  );
}
