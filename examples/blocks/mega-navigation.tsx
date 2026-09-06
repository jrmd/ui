"use client";
import {
  MegaNavigation,
  MegaNavigationToolbar,
  MegaNavigationMobileMenu,
} from "../../registry/blocks/mega-navigation";

export default function Example() {
  return (
    <MegaNavigation>
      <MegaNavigationToolbar />
      <MegaNavigationMobileMenu />
    </MegaNavigation>
  );
}
