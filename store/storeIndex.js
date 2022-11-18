import { createStore, combineReducers } from 'redux';

const initialAuthState = { isAuth: false, username: '' };

const authReducer = (state = initialAuthState, action) => {
	if (action.type === 'login')
		return { isAuth: true, username: state.username };

	if (action.type === 'logout')
		return { isAuth: false, username: state.username };

	if (action.type === 'setUsername') {
		console.log('setting username in auth - value: ', action.payload);
		return { isAuth: state.isAuth, username: action.payload };
	}

	return state;
};

/* 
title: titleRef.current.value,
image: imageRef.current.value,
decade: decadeRef.current.value,
description: descriptionRef.current.value, */

const initialEventState = {
	events: [
		{
			id: 1,
			title: 'Thriller',
			image:
				'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-170249-PSDMIJA_EC001_H.jpg',
			decade: '1980s',
			description:
				"Michael Jackson's video for Thriller premiers on MTV on December 2nd, 1983.",
		},
		{
			id: 2,
			title: 'IBM PC - Model 5150',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ibm_px_xt_color.jpg/2560px-Ibm_px_xt_color.jpg',
			decade: '1980s',
			description:
				'The IBM Personal Computer (model 5150, commonly known as the IBM PC) is the first microcomputer released in the IBM PC model line and the basis for the IBM PC compatible de facto standard. Released on August 12, 1981, it was created by a team of engineers and designers directed by Don Estridge in Boca Raton, Florida.',
		},
		{
			id: 3,
			title: 'Chernobyl Disaster',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/6/6e/View_of_Chernobyl_taken_from_Pripyat.JPG',
			decade: '1980s',
			description:
				'The Chernobyl disaster (also called the Chornobyl disaster) was a nuclear accident that occurred on 26 April 1986 at the No. 4 reactor in the Chernobyl Nuclear Power Plant, near the city of Pripyat in the north of the Ukrainian SSR in the Soviet Union.',
		},
		{
			id: 4,
			title: 'Beatlemania Spreads Worldwide',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/3/3a/The_Beatles_and_Lill-Babs_1963.jpg',
			decade: '1960s',
			description:
				"By early 1964, the Beatles were international stars and had achieved unprecedented levels of critical and commercial success. They became a leading force in Britain's cultural resurgence, ushering in the British Invasion of the United States pop market, and soon made their film debut with A Hard Day's Night (1964).",
		},
		{
			id: 5,
			title: 'The Super Nintendo',
			decade: '1990s',
			image: 'https://www.chrismcovell.com/secret/1990/Shoshinkai-01M.jpg',
			description:
				"On August 28 and 29, 1990, Nintendo held their own game show, having shunned June's Tokyo Toy Show.  Attendees came to witness the public launch of the Super Famicom and its games.  Marukatsu Famicom magazine held a prize draw to allow 10 of its readers to attend the show and report their opinions on all the games.  First up are...",
		},
		{
			id: 6,
			title: 'Burger King',
			decade: '1970s',
			image: 'https://i.pinimg.com/736x/ec/c4/ee/ecc4ee446a61f8fb65ae71f78c836dc1.jpg',
			description:
				"This is Burger King in the 70s.",
		},
	],
};

const eventReducer = (state = initialEventState, action) => {
	if (action.type === 'addEvent') {
		console.log('adding event...', action.eventData);
		const updatedEvents = [action.eventData, ...state.events];
		return { ...state, events: updatedEvents };
	}

  if(action.type === 'deleteEvent'){
    console.log('deleting event...');
    const updatedEvents = state.events.filter(event => event.id !== action.eventId);
    return { ...state, events: updatedEvents};
  }

	return state;
};

const combinedReducers = combineReducers({ authReducer, eventReducer });
const store = createStore(combinedReducers);

export default store;

// TODO use configureStore()
// import { configureStore, createSlice } from '@reduxjs/toolkit';

// const initialAuthState = { isAuth: false, username: '' };
// const authSlice = createSlice({
// 	name: 'auth',
// 	initialState: initialAuthState,
// 	reducers: {
// 		login(state) {
// 			console.log('changing isAuth to true!!!');
// 			state.isAuth = true;
// 		},

// 		logout(state) {
// 			console.log('changing isAuth to false!!!');
// 			state.isAuth = false;
// 		},

// 		setUsername(state, action) {
// 			console.log('setting username in auth - value: ', action.payload);
// 			state.username = action.payload;
// 		},
// 	},
// });

// /*
// title: titleRef.current.value,
// image: imageRef.current.value,
// decade: decadeRef.current.value,
// description: descriptionRef.current.value, */

// const initialEvents = [
// 	{
// 		id: 1,
// 		title: 'Thriller',
// 		image: 'some_image.jpg',
// 		decade: '1980s',
// 		description:
// 			"Michael Jackson's video for Thriller premiers on MTV on December 2nd, 1983.",
// 	},
// ];
// const eventReducer = (state = initialEvents, action) => {
// 	if (action.type === 'setEvent') {
// 		console.log('setting event');
// 		const updatedState = [...state];
// 		updatedState.push(action.payload);
// 		return updatedState;
// 	}
// };

// const store = configureStore({
// 	reducer: { auth: authSlice.reducer,/*  event: eventReducer */ },
// });

// export default store;
