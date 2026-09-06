"use client";
import {
  ChatWorkspace,
  ChatWorkspaceError,
  ChatWorkspaceToolbar,
  ChatWorkspaceMessages,
  ChatWorkspaceControls,
  ChatWorkspaceComposer,
  ChatWorkspaceFooter,
} from "../../registry/blocks/chat-workspace";

export default function Example() {
  return (
    <ChatWorkspace
      onSend={async (prompt) => `Your provider response to: ${prompt}`}
    >
      <ChatWorkspaceError />
      <ChatWorkspaceToolbar />
      <ChatWorkspaceMessages />
      <ChatWorkspaceControls />
      <ChatWorkspaceComposer />
      <ChatWorkspaceFooter />
    </ChatWorkspace>
  );
}
