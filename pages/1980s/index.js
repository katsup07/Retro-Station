import FilteredEvents from "../../components/FilteredEvents";
import classes from './index.module.css';


const EightiesHistory = () => {
  return ( 
  <>
    <div className={classes.header}>Events from the 1980s</div>
    <FilteredEvents filterType='decade' item='1980s'/>
  </>
   );
}
 
export default EightiesHistory;