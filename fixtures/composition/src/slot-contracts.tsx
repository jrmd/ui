import * as React from "react";
import {
  CalendarSchedule,
  CalendarScheduleCalendar,
  CalendarScheduleAgenda,
} from "../../../registry/blocks/calendar-schedule";
import {
  SearchableRecordsScreen,
  SearchableRecordsScreenRecords,
} from "../../../registry/blocks/searchable-records-screen";
import {
  KanbanBoard,
  KanbanBoardComposer,
  KanbanBoardColumns,
} from "../../../registry/blocks/kanban-board";
export function SlotContracts() {
  const [date, setDate] = React.useState("");
  return (
    <main className="grid gap-8 p-6">
      <CalendarSchedule
        defaultValue="2027-02-01"
        events={[
          { id: "next", date: "2027-02-02", content: "Connected appointment" },
        ]}
      >
        <CalendarScheduleAgenda />
        <CalendarScheduleCalendar onValueChange={setDate} />
      </CalendarSchedule>
      <output aria-label="Observed date">{date}</output>
      <SearchableRecordsScreen>
        <SearchableRecordsScreenRecords>
          {(table) => (
            <p>{table.getRowCount()} records from the shared table</p>
          )}
        </SearchableRecordsScreenRecords>
      </SearchableRecordsScreen>
      <KanbanBoard>
        <KanbanBoardComposer
          onSubmit={(event) => event.preventDefault()}
          ref={(node) => {
            if (node) node.dataset.refConnected = "true";
          }}
        />
        <KanbanBoardColumns />
      </KanbanBoard>
    </main>
  );
}
