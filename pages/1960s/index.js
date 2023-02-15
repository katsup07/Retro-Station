import FilteredEvents from "../../components/FilteredEvents";
import classes from './index.module.css';

const SixtiesHistory = () => {
  return ( 
  <>
    <div className={classes.header}>Events from the 1960s</div>
    <FilteredEvents filterType='decade' item='1960s'/>
  </>
   );
}
 
export default SixtiesHistory;