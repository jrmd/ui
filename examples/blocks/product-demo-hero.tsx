"use client";
import {
  ProductDemoHeroRoot,
  ProductDemoHeroIntro,
  ProductDemoHeroPreview,
  ProductDemoHeroCaption,
} from "../../registry/blocks/product-demo-hero";

export default function Example() {
  return (
    <ProductDemoHeroRoot>
      <ProductDemoHeroIntro />
      <ProductDemoHeroPreview />
      <ProductDemoHeroCaption />
    </ProductDemoHeroRoot>
  );
}
