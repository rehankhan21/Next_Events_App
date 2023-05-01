import { Fragment } from "react";
import Head from "next/head";

import { getEventById, getFeaturedEvents } from "../../../helpers/api-util";
import EventContent from "../../../components/events/event-detail/event-content";
import EventLogistics from "../../../components/events/event-detail/event-logistics";
import EventSummary from "../../../components/events/event-detail/event-summary";
import ErrorAlert from "../../../components/events/ui/ErrorAlert";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>...Loading</p>
      </div>
    );
  }

  return (
    //Use react fragment to display compoenets side by side
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;
