import { useSelector, useDispatch } from 'react-redux';
import BaseButton from './ui/BaseButton';
import classes from './FeaturedEvents.module.css';

const FeaturedEvents = () => {
  const dispatch = useDispatch();
	const events = useSelector((state) => state.eventReducer.events);
  const isAuth = useSelector(state => state.authReducer.isAuth)
	console.log(events);

  function handleDelete(eventId){
    console.log('handling delete...');
    dispatch({ type: 'deleteEvent', eventId});
  }

	function getJsxContent() {
		if (events.length === 0) return <div>Currently there are no events.</div>;

		return events.map((event) => (
			<li className={classes.events} key={event.id}>
				<div className={classes.deleteButtonContainer}>
					<h2>{event.title}</h2>
					{ isAuth && <button onClick={() => handleDelete(event.id)}>&#x2716;</button>}
				</div>
				<img src={event.image} alt={event.title} width='200px'></img>
				<p>{event.description}</p>
				<hr />
			</li>
		));
	}

	return <ul className={classes.event}>{getJsxContent()}</ul>;
};

export default FeaturedEvents;
