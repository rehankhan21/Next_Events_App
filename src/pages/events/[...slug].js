import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EventList from "../../../components/events/events/EventList";
import ResultsTitle from "../../../components/events/events/ResultsTitle";
import { Fragment } from "react";
import Button from "../../../components/events/ui/button";
import ErrorAlert from "../../../components/events/ui/ErrorAlert";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  // when the componenet renders for the first time the url data is null
  // it automatically renders again but with the data.
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
