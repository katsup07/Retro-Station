import { useSelector } from 'react-redux';
import classes from './FeaturedEvents.module.css';

const FeaturedEvents = () => {
	const events = useSelector((state) => state.eventReducer.events);
	console.log(events);

	function getJsxContent() {
		if (events.length === 0) return <div>Currently there are no events.</div>;

		return events.map((event) => (
			<li key={event.id}>
				<h2>{event.title}</h2>
				<img src={event.image} alt={event.title} width='200px'></img>
				<p>{event.description}</p>
				<hr/>
			</li>
		));
	}

	return <ul className={classes.event}>{getJsxContent()}</ul>;
};

export default FeaturedEvents;
