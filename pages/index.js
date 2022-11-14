import AddPostForm from '../components/AddPostForm'
import FeaturedEvents from '../components/FeaturedEvents';

function Home() {
	return (
		<>
    <FeaturedEvents />
      <div>
          Add an event to the logbook...
      </div>
          <AddPostForm/>
    </>
	);
}

export default Home;
