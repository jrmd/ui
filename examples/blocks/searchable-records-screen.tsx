"use client";
import {
  SearchableRecordsScreen,
  SearchableRecordsScreenToolbar,
  SearchableRecordsScreenRecords,
} from "../../registry/blocks/searchable-records-screen";

export default function Example() {
  return (
    <SearchableRecordsScreen>
      <SearchableRecordsScreenToolbar />
      <SearchableRecordsScreenRecords />
    </SearchableRecordsScreen>
  );
}
