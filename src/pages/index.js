import { getFeaturedEvents } from "../../dummy-data";
import EventList from "../../components/events/events/EventList";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
