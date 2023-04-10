import { getAllEvents } from "../../../dummy-data";
import EventList from "../../../components/events/events/EventList";
import EventsSearch from "../../../components/events/events/EventsSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";

function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;
