import FilteredEvents from "../../components/FilteredEvents";
import classes from './index.module.css';


const NinetiesHistory = () => {
  return ( 
  <>
    <div className={classes.header}>Events from the 1990s</div>
    <FilteredEvents filterType='decade' item='1990s'/>
  </>
   );
}
 
export default NinetiesHistory;