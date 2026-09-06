"use client";
import {
  ProfileSettings,
  ProfileSettingsError,
  ProfileSettingsIntro,
  ProfileSettingsAvatar,
  ProfileSettingsNameField,
  ProfileSettingsEmailField,
  ProfileSettingsActions,
  ProfileSettingsStatus,
} from "../../registry/blocks/profile-settings";

export default function Example() {
  return (
    <ProfileSettings>
      <ProfileSettingsError />
      <ProfileSettingsIntro />
      <ProfileSettingsAvatar />
      <ProfileSettingsNameField />
      <ProfileSettingsEmailField />
      <ProfileSettingsActions />
      <ProfileSettingsStatus />
    </ProfileSettings>
  );
}
