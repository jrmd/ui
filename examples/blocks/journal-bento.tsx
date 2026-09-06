"use client";
import {
  JournalBento,
  JournalBentoHeading,
  JournalBentoStories,
} from "../../registry/blocks/journal-bento";

export default function Example() {
  return (
    <JournalBento>
      <JournalBentoHeading />
      <JournalBentoStories />
    </JournalBento>
  );
}
