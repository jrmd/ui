"use client";
import {
  CommerceNavigation,
  CommerceNavigationAnnouncement,
  CommerceNavigationToolbar,
  CommerceNavigationMobileMenu,
} from "../../registry/blocks/commerce-navigation";

export default function Example() {
  return (
    <CommerceNavigation>
      <CommerceNavigationAnnouncement />
      <CommerceNavigationToolbar />
      <CommerceNavigationMobileMenu />
    </CommerceNavigation>
  );
}
