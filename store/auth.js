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
    {id: 2, title: 'IBM PC - Model 5150', decade: '1980s', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ibm_px_xt_color.jpg/2560px-Ibm_px_xt_color.jpg', description: 'The IBM Personal Computer (model 5150, commonly known as the IBM PC) is the first microcomputer released in the IBM PC model line and the basis for the IBM PC compatible de facto standard. Released on August 12, 1981, it was created by a team of engineers and designers directed by Don Estridge in Boca Raton, Florida.'}
	],

};

const eventReducer = (state = initialEventState, action) => {
	if (action.type === 'setEvent') {
		console.log('setting event...');
		const updatedState = [...state];
		updatedState.push(action.payload);
		return updatedState;
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
