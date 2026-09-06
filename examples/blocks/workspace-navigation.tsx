"use client";
import {
  WorkspaceNavigation,
  WorkspaceNavigationToolbar,
  WorkspaceNavigationViews,
  WorkspaceNavigationStatus,
} from "../../registry/blocks/workspace-navigation";

export default function Example() {
  return (
    <WorkspaceNavigation>
      <WorkspaceNavigationToolbar />
      <WorkspaceNavigationViews />
      <WorkspaceNavigationStatus />
    </WorkspaceNavigation>
  );
}
