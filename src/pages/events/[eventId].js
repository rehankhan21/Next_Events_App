import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../../components/events/event-detail/event-content";
import EventLogistics from "../../../components/events/event-detail/event-logistics";
import EventSummary from "../../../components/events/event-detail/event-summary";
import { getEventById } from "../../../dummy-data";
import ErrorAlert from "../../../components/events/ui/ErrorAlert";

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }

  return (
    //Use react fragment to display compoenets side by side
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
