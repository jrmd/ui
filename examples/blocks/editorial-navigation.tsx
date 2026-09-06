"use client";
import {
  EditorialNavigation,
  EditorialNavigationMasthead,
  EditorialNavigationLinks,
} from "../../registry/blocks/editorial-navigation";

export default function Example() {
  return (
    <EditorialNavigation>
      <EditorialNavigationMasthead />
      <EditorialNavigationLinks />
    </EditorialNavigation>
  );
}
