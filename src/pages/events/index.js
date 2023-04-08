import { getAllEvents } from "../../../dummy-data";
import EventList from "../../../components/events/events/EventList";
import EventsSearch from "../../../components/events/events/EventsSearch";
import { Fragment } from "react";

function EventsPage() {
  const events = getAllEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;
