import FilteredEvents from "../../components/FilteredEvents";

const NinetiesHistory = () => {
  return ( 
  <>
    <div>Events from the 1990s</div>
    <FilteredEvents filterType='decade' item='1990s'/>
  </>
   );
}
 
export default NinetiesHistory;