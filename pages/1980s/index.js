import FilteredEvents from "../../components/FilteredEvents";

const EightiesHistory = () => {
  return ( 
  <>
    <div>Events from the 1980s</div>
    <FilteredEvents filterType='decade' item='1980s'/>
  </>
   );
}
 
export default EightiesHistory;