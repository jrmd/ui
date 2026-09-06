"use client";
import {
  EditorialHero,
  EditorialHeroHeading,
  EditorialHeroIntro,
  EditorialHeroDescription,
  EditorialHeroAction,
} from "../../registry/blocks/editorial-hero";

export default function Example() {
  return (
    <EditorialHero>
      <EditorialHeroHeading />
      <EditorialHeroIntro>
        <EditorialHeroDescription />
        <EditorialHeroAction />
      </EditorialHeroIntro>
    </EditorialHero>
  );
}
