import AddPostForm from '../components/AddPostForm'
import FeaturedEvents from '../components/FeaturedEvents';
import BaseButton from '../components/ui/BaseButton';
import classes from './index.module.css';

function Home() {
	return (
		<div className={classes.featured}>
    <BaseButton text="Add Another Event"></BaseButton>
    <FeaturedEvents />
    </div>
	);
}

export default Home;
