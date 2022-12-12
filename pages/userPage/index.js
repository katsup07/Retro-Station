import { useSelector } from 'react-redux';
import FilteredEvents from './../../components/FilteredEvents';

const UserAdmin = () => {
  const user = useSelector(state => state.authReducer.username);

  return ( 
  <>
    <FilteredEvents filterType='author' item={user}/>
    <p>User admin</p> 
  </>
  );
}
 
export default UserAdmin;