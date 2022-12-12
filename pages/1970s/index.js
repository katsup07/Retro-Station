import FilteredEvents from "../../components/FilteredEvents";

const SeventiesHistory = () => {
  return ( 
    <>
      <div>Events from the 1970s</div>
      <FilteredEvents filterType='decade' item='1970s'/>
    </>
     );
}
 
export default SeventiesHistory;