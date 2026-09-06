"use client";
import {
  RecordDetailPanel,
  RecordDetailPanelHeading,
  RecordDetailPanelDetails,
  RecordDetailPanelNote,
} from "../../registry/blocks/record-detail-panel";

export default function Example() {
  return (
    <RecordDetailPanel>
      <RecordDetailPanelHeading />
      <RecordDetailPanelDetails />
      <RecordDetailPanelNote />
    </RecordDetailPanel>
  );
}
