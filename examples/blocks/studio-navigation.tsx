"use client";
import {
  StudioNavigation,
  StudioNavigationBrand,
  StudioNavigationMenu,
} from "../../registry/blocks/studio-navigation";

export default function Example() {
  return (
    <StudioNavigation>
      <StudioNavigationBrand />
      <StudioNavigationMenu />
    </StudioNavigation>
  );
}
