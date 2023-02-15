import { getPostsFromServer } from '../util/helpers';
import FeaturedEvents from '../components/FeaturedEvents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BaseButton from '../components/ui/BaseButton';
import plusIcon from '../public/icons/plus-icon.svg';
import classes from './index.module.css';

// TODO - Add intialEvents from getStaticProps() as the starting events state on pageload
function Home({ initialEvents }) {
  console.log(plusIcon);

	return (
    <>
      <h1 className={classes.header}>Records of Past Events</h1>
      <div className={classes.featured}>
      <BaseButton type="link" destination="/addNewEventPage" text="Add Event"></BaseButton>
      <FeaturedEvents initialEvents={initialEvents}/>
      </div>
    </>
	);
}

export default Home;

export async function getStaticProps(){
  const initialEvents = await getPostsFromServer();
  return {
    props: {initialEvents},
  }
}
