"use client";
import {
  CalendarSchedule,
  CalendarScheduleCalendar,
  CalendarScheduleAgenda,
} from "../../registry/blocks/calendar-schedule";

export default function Example() {
  return (
    <CalendarSchedule>
      <CalendarScheduleCalendar />
      <CalendarScheduleAgenda />
    </CalendarSchedule>
  );
}
