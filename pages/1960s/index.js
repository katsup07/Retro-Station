import FilteredEvents from "../../components/FilteredEvents";

const SixtiesHistory = () => {
  return ( 
  <>
    <div>Events from the 1960s</div>
    <FilteredEvents filterType='decade' item='1960s'/>
  </>
   );
}
 
export default SixtiesHistory;