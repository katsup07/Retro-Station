import FilteredEvents from "../../components/FilteredEvents";
import { useRouter } from 'next/router';
import classes from './index.module.css';


const Decade = () => {
  const router = useRouter();
  const decade = router.query.decadeId;

  return ( 
  <>
    <div className={classes.header}>Events from the {decade}</div>
    <FilteredEvents filterType='decade' item={decade}/>
  </>
   );
}
 
export default Decade;