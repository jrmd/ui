"use client";
import {
  TeamManagement,
  TeamManagementError,
  TeamManagementHeading,
  TeamManagementInviteForm,
  TeamManagementMembers,
  TeamManagementStatus,
  TeamManagementReset,
} from "../../registry/blocks/team-management";

export default function Example() {
  return (
    <TeamManagement>
      <TeamManagementError />
      <TeamManagementHeading />
      <TeamManagementInviteForm />
      <TeamManagementMembers />
      <TeamManagementStatus />
      <TeamManagementReset />
    </TeamManagement>
  );
}
