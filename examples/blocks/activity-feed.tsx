"use client";
import {
  ActivityFeed,
  ActivityFeedHeading,
  ActivityFeedEntries,
} from "../../registry/blocks/activity-feed";

export default function Example() {
  return (
    <ActivityFeed>
      <ActivityFeedHeading />
      <ActivityFeedEntries />
    </ActivityFeed>
  );
}
