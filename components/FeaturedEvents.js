import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { router } from 'next/router';
import { getPostsFromServer, deletePostOnServer } from '../util/helpers';
import classes from './FeaturedEvents.module.css';
import BaseButton from './ui/BaseButton';

const FeaturedEvents = () => {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.eventReducer.events);
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	console.log(events);

	useEffect(() => {
		(async function fetch() {
			const eventPosts = await getPostsFromServer();
			dispatch({ type: 'addMultipleEvents', multipleEventsData: eventPosts });
		})();
	}, [dispatch]);

	async function handleDelete(eventId) {
    console.log('handling delete for...', eventId);
    if(await deletePostOnServer(eventId)) ;
	    dispatch({ type: 'deleteEvent', eventId });
	}

  function handleEdit(eventId){
    console.log('handling edit for...', eventId);
    router.push(`/editEventPage/${eventId}`);
  }

	function getJsxContent() {
		if (events.length === 0) return <div>Currently there are no events.</div>;

		return events.map((event) => (
			<li className={classes.events} key={event.id}>
				
				<div className={classes.deleteButtonContainer}>
					<h2>{event.title}</h2>
					{isAuth && (
						<button onClick={() => handleDelete(event.id)}>&#x2716;</button>
					)}
				</div>
				<img src={event.image} alt={event.title} width='200px'></img>
				<p>{event.description}</p>
        {isAuth && (
					<div className={classes.editButtonContainer}>
						<BaseButton
							onClick={() => handleEdit(event.id)}>
							Edit
						</BaseButton>
					</div>
				)}
				<hr />
			</li>
		));
	}

	return <ul className={classes.event}>{getJsxContent()}</ul>;
};

export default FeaturedEvents;
