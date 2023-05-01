import Head from "next/head";

import { getFeaturedEvents } from "../../helpers/api-util";
import EventList from "../../components/events/events/EventList";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      {/* this allows us to put content into the head tage for seo */}
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
