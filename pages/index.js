import { getPostsFromServer } from '../util/helpers';
import FeaturedEvents from '../components/FeaturedEvents';
import BaseButton from '../components/ui/BaseButton';
import classes from './index.module.css';

// TODO - Add intialEvents from getStaticProps() as the starting events state on pageload
function Home({ initialEvents }) {

	return (
		<div className={classes.featured}>
    <BaseButton type="link" destination="/addNewEventPage" text="Add Event"></BaseButton>
    <FeaturedEvents initialEvents={initialEvents}/>
    </div>
	);
}

export default Home;

export async function getStaticProps(){
  const initialEvents = await getPostsFromServer();
  return {
    props: {initialEvents},
  }
}
