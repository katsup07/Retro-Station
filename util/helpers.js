export async function getPostsFromServer(){
  const response= await fetch('https://retrostation-9a405-default-rtdb.asia-southeast1.firebasedatabase.app/pastEvent.json');
  
  const eventsData = await response.json();
  if(!response.ok){
    // add error handling to display message to user
    console.log(response);
  }
  
  const events = [];
  for(const e in eventsData){
    const event = {id: e, ...eventsData[e]};
    events.unshift(event);
  }
  console.log(events);

  return events;
}

// eventsData = {"-NHYwfRNEQQE-kLLLZR7": {
// decade: 
// "1960s",
// description: "test",
// id: "1669197904075",
// image: "https://www.images.hali.com",
// title: "test",
// }}