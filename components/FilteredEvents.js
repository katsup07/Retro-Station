import { useSelector, dispatch, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPostsFromServer } from '../util/helpers';
import classes from './FeaturedEvents.module.css';

const FilteredEvents = ({ item, filterType }) => { // 1960s, 'Cereal', 'decade' / 'author'
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

  return ( filteredEvents.map((event) => (
    <div key={event.id} className={classes.event}>
      <li >
        <h2>{event.title}</h2>
        <img src={event.image} alt={event.title} width='200px'></img>
        <p>{event.description}</p>
        <hr/>
      </li>
    </div>)
  ));
}
 
export default FilteredEvents;