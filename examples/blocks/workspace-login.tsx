"use client";
import {
  WorkspaceLogin,
  WorkspaceLoginBackdrop,
  WorkspaceLoginFormPanel,
  WorkspaceLoginFooter,
} from "../../registry/blocks/workspace-login";

export default function Example() {
  return (
    <WorkspaceLogin>
      <WorkspaceLoginBackdrop />
      <WorkspaceLoginFormPanel />
      <WorkspaceLoginFooter />
    </WorkspaceLogin>
  );
}
