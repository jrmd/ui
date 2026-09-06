"use client";
import {
  CommandSearch,
  CommandSearchPalette,
  CommandSearchStatus,
} from "../../registry/blocks/command-search";

export default function Example() {
  return (
    <CommandSearch>
      <CommandSearchPalette />
      <CommandSearchStatus />
    </CommandSearch>
  );
}
