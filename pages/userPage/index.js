import { useSelector, useDispatch } from 'react-redux';
import router from 'next/router';
import FilteredEvents from './../../components/FilteredEvents';
import { getPostsFromServer, deletePostOnServer } from '../../util/helpers';

const UserAdmin = () => {
  const username = useSelector(state => state.authReducer.username);
  const dispatch = useDispatch();

  async function handleDelete(eventId) {
    console.log('handling delete for...', eventId);
     // TODO - Create individual userpages, reuse components, and move the delete and edit logic there
     const post = (await getPostsFromServer()).filter(event => {
      return event.author === username && event.id === eventId;
    });
    
    if(post.length > 0 && await deletePostOnServer(eventId))
	    dispatch({ type: 'deleteEvent', eventId });
	}

  function handleEdit(eventId){
    console.log('handling edit for...', eventId);
    router.push(`/editEventPage/${eventId}`);
  }

  return ( 
  <>
    <h2>User admin</h2> 
    <FilteredEvents filterType='author' onDelete={handleDelete} onEdit={handleEdit} item={username}/>
  </>
  );
}
 
export default UserAdmin;