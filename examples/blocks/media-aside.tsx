"use client";
import {
  MediaAside,
  MediaAsideContent,
  MediaAsideTitle,
  MediaAsideDescription,
  MediaAsideAction,
  MediaAsideMedia,
} from "../../registry/blocks/media-aside";

export default function MediaAsideExample() {
  return (
    <MediaAside className="rounded-none">
      <MediaAsideContent>
        <MediaAsideTitle>
          A <em>different</em> perspective.
        </MediaAsideTitle>
        <MediaAsideDescription>
          Stories from our workshop.
        </MediaAsideDescription>
        <MediaAsideAction asChild>
          <a href="#story">Read our story</a>
        </MediaAsideAction>
      </MediaAsideContent>
      <MediaAsideMedia
        src="/assets/editorial-slow.svg"
        alt="An abstract study in green"
      />
    </MediaAside>
  );
}
