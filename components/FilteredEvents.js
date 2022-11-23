import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPostsFromServer } from '../util/helpers';
import classes from './FeaturedEvents.module.css';

const FilteredEvents = ({ decade }) => {


  const filteredEvents = useSelector( state => state.eventReducer.events.filter(event => event.decade === decade));

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