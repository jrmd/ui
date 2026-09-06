"use client";
import {
  StudioFooter,
  StudioFooterHeading,
  StudioFooterContact,
  StudioFooterColumns,
} from "../../registry/blocks/studio-footer";

export default function Example() {
  return (
    <StudioFooter>
      <StudioFooterHeading />
      <StudioFooterContact />
      <StudioFooterColumns />
    </StudioFooter>
  );
}
