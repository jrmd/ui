"use client";
import {
  ProductBento,
  ProductBentoGrid,
  ProductBentoHeading,
} from "../../registry/blocks/product-bento";
export default function ProductBentoExample() {
  return (
    <ProductBento>
      <ProductBentoHeading />
      <ProductBentoGrid />
    </ProductBento>
  );
}
