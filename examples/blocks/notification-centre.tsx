"use client";
import {
  NotificationCentre,
  NotificationCentreToolbar,
  NotificationCentreFilters,
  NotificationCentreMessages,
  NotificationCentreEmpty,
} from "../../registry/blocks/notification-centre";

export default function Example() {
  return (
    <NotificationCentre>
      <NotificationCentreToolbar />
      <NotificationCentreFilters />
      <NotificationCentreMessages />
      <NotificationCentreEmpty />
    </NotificationCentre>
  );
}
