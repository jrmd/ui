"use client";
import {
  PortfolioHero,
  PortfolioHeroMasthead,
  PortfolioHeroBrand,
  PortfolioHeroMeta,
  PortfolioHeroLayout,
} from "../../registry/blocks/portfolio-hero";

export default function Example() {
  return (
    <PortfolioHero>
      <PortfolioHeroMasthead>
        <PortfolioHeroBrand />
        <PortfolioHeroMeta />
      </PortfolioHeroMasthead>
      <PortfolioHeroLayout />
    </PortfolioHero>
  );
}
