"use client";
import {
  ProductComparison,
  ProductComparisonHeading,
  ProductComparisonTable,
} from "../../registry/blocks/product-comparison";

export default function Example() {
  return (
    <ProductComparison>
      <ProductComparisonHeading />
      <ProductComparisonTable />
    </ProductComparison>
  );
}
