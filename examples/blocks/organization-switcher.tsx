"use client";
import {
  OrganizationSwitcher,
  OrganizationSwitcherMenu,
  OrganizationSwitcherTrigger,
  OrganizationSwitcherPopup,
  OrganizationSwitcherStatus,
} from "../../registry/blocks/organization-switcher";

export default function Example() {
  return (
    <OrganizationSwitcher>
      <OrganizationSwitcherMenu>
        <OrganizationSwitcherTrigger />
        <OrganizationSwitcherPopup />
      </OrganizationSwitcherMenu>
      <OrganizationSwitcherStatus />
    </OrganizationSwitcher>
  );
}
