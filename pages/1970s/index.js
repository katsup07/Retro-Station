import FilteredEvents from "../../components/FilteredEvents";
import classes from './index.module.css';

const SeventiesHistory = () => {
  return ( 
    <>
      <div className={classes.header}>Events from the 1970s</div>
      <FilteredEvents filterType='decade' item='1970s'/>
    </>
     );
}
 
export default SeventiesHistory;