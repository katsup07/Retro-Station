import { useSelector, dispatch, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPostsFromServer } from '../util/helpers';
import BaseButton from './ui/BaseButton';
import classes from './FeaturedEvents.module.css';

const FilteredEvents = ({ item, filterType, onEdit, onDelete }) => { // 1960s, 'Cereal', 'decade' / 'author'
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.eventReducer.events);

  useEffect(() => {
		(async function fetch() {
			const events = await getPostsFromServer();
			dispatch({ type: 'addMultipleEvents', multipleEventsData: events });
		})();
	}, [dispatch]);

  console.log(allEvents);
  const filteredEvents = allEvents.filter(event => event[filterType] === item);
  console.log(filteredEvents);

  return (filteredEvents.map((event) => (
    <div key={event.id} className={classes.event}>
      <li >
        <div className={classes.deleteButtonContainer}>
        <h2>{event.title}</h2>
					{ filterType === 'author' && (
						<button onClick={() => onDelete(event.id)}>&#x2716;</button>
					)}
				</div>
        <img src={event.image} alt={event.title} width='200px'></img>
        <p>{event.description}</p>
    { filterType === 'author' &&
    <div className={classes.editButtonContainer}>
						<BaseButton
							onClick={() => onEdit(event.id)}>
							Edit
						</BaseButton>
					</div>}
        <hr/>
      </li>
    </div>)
  ));
}
 
export default FilteredEvents;