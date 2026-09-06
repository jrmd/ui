"use client";
import {
  EditorialFooter,
  EditorialFooterColumns,
  EditorialFooterNote,
} from "../../registry/blocks/editorial-footer";

export default function Example() {
  return (
    <EditorialFooter>
      <EditorialFooterColumns />
      <EditorialFooterNote />
    </EditorialFooter>
  );
}
