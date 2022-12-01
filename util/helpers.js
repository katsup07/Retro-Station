// Request calls to the backend
export async function getPostsFromServer() {
	const response = await fetch(
		'https://retrostation-9a405-default-rtdb.asia-southeast1.firebasedatabase.app/pastEvent.json'
	);

	const eventsData = await response.json();
	if (!response.ok) {
		// add error handling to display message to user
		console.log(response);
	}

	const events = [];
	for (const e in eventsData) {
		const event = { id: e, ...eventsData[e] };
		events.unshift(event);
	}
	console.log(events);

	return events;
}

export async function findPostOnServer(id) {
	const events = await getPostsFromServer();
	return events.find((event) => event.id === id);
}

export async function deletePostOnServer(eventId) {
	const response = await fetch(
		`https://retrostation-9a405-default-rtdb.asia-southeast1.firebasedatabase.app/pastEvent/${eventId}.json`,
		{
			method: 'DELETE',
		}
	);

	const responseData = await response.json();

	if (!response.ok) {
		// add error handling with info for user here
		console.log(responseData);
	}
	return response.ok;
}

export async function postOnServer(eventData, eventId) {
	console.log('posting on server...');
	const response = await fetch(
		`https://retrostation-9a405-default-rtdb.asia-southeast1.firebasedatabase.app/pastEvent/${eventId}.json`,
		{
			method: 'PUT', // !! This needs to be changed to a PUT request and look at how to change id to do so.
			body: JSON.stringify(eventData),
		}
	);
	const responseData = await response.json();

	if (!response.ok) {
		// add error handling and display message to user later...
		console.log(response);
	}

	console.log(responseData);
	eventData.id = responseData.name;
	return response.ok;
}

export async function authenticateOnServer(email, password, url) {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ email, password, returnSecureToken: true }),
	});

	const responseData = await response.json();
	return { response, responseData };
}
// eventsData = {"-NHYwfRNEQQE-kLLLZR7": {
// decade:
// "1960s",
// description: "test",
// id: "1669197904075",
// image: "https://www.images.hali.com",
// title: "test",
// }}
