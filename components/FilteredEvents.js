import { useSelector } from 'react-redux';

const FilteredEvents = ({ decade }) => {
  const filteredEvents = useSelector( state => state.eventReducer.events.filter(event => event.decade === decade));

  return ( filteredEvents.map((event) => (
    <li key={event.id}>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} width='200px'></img>
      <p>{event.description}</p>
      <hr/>
    </li>)
  ));
}
 
export default FilteredEvents;