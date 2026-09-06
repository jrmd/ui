"use client";
import {
  UserSwitcher,
  UserSwitcherMenu,
  UserSwitcherTrigger,
  UserSwitcherPopup,
  UserSwitcherStatus,
} from "../../registry/blocks/user-switcher";

export default function Example() {
  return (
    <UserSwitcher>
      <UserSwitcherMenu>
        <UserSwitcherTrigger />
        <UserSwitcherPopup />
      </UserSwitcherMenu>
      <UserSwitcherStatus />
    </UserSwitcher>
  );
}
