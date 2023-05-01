import { useRouter } from "next/router";
import useSWR from "swr";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

import { getFilteredEvents } from "../../../helpers/api-util";
import EventList from "../../../components/events/events/EventList";
import ResultsTitle from "../../../components/events/events/ResultsTitle";
import Button from "../../../components/events/ui/button";
import ErrorAlert from "../../../components/events/ui/ErrorAlert";

function FilteredEventsPage(props) {
  //const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();
  //const filterData = router.query.slug;

  // const { data, error } = useSWR(
  //   "https://nextevents-8aaf1-default-rtdb.firebaseio.com/events.json"
  // );

  // useEffect(() => {
  //   if (data) {
  //     const events = [];

  //     for (const key in data) {
  //       events.push({
  //         id: key,
  //         ...data[key],
  //       });
  //     }

  //     setLoadedEvents(events);
  //   }
  // }, [data]);

  // // when the componenet renders for the first time the url data is null
  // // it automatically renders again but with the data.
  // if (!loadedEvents) {
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <p className="center">Loading...</p>
  //     </Fragment>
  //   );
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // // + in front of the string turns it into a int
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // const filteredEvents = loadedEvents.filter((event) => {
  //   const eventDate = new Date(event.date);
  //   return (
  //     eventDate.getFullYear() === numYear &&
  //     eventDate.getMonth() === numMonth - 1
  //   );
  // });

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${props.date.month}/${props.date.year}`}
      />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events for chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events for chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // + in front of the string turns it into a int
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
