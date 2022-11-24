import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'next/router';
import { findPostOnServer } from '../util/helpers';
import BaseButton from './ui/BaseButton';
import classes from './AddPostForm.module.css';

const EditEventForm = ({ eventId }) => {
  let ev = '';
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	// const [title, setTitle] = useState("hi");
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [decade, setDecade] = useState('');

	useEffect(() => {
		(async function fetch() {
			const event = await findPostOnServer(eventId);
      ev = event;
			if (event) {
				setTitle(event.title);
				setImage(event.image);
				setDescription(event.description);
				setDecade(event.decade);
			}
		})();
	}, []);

	const registerEvent = async (eventData) => {
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
		dispatch({ type: 'addEvent', eventData });
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		const eventData = {
			title,
			image,
			decade,
			description,
		};
    console.log(eventData);
	  await registerEvent(eventData);
		router.replace('/');
	};

	function getJsxContent() {
		if(isAuth){
		return (
			<section>
				<form className={classes.form} onSubmit={formSubmitHandler}>
					<label htmlFor='event'>Title</label>
					<input
						type='text'
						id='event'
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
					/>

					<label htmlFor='image'>Image</label>
					<input
						type='url'
						id='image'
						value={image}
						onChange={(e) => setImage(e.currentTarget.value)}
					/>

					<label htmlFor='year'>Decade</label>
					<select
						name='decade'
						id='decade'
						value={decade}
						onChange={(e) => setDecade(e.currentTarget.value)}>
						<option value='1960s'>1960s</option>
						<option value='1970s'>1970s</option>
						<option value='1980s'>1980s</option>
						<option value='1990s'>1990s</option>
					</select>

					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
            rows="10"
						value={description}
						onChange={(e) => setDescription(e.currentTarget.value)}></textarea>
					<div className={classes.btn}>
						<BaseButton text='post'></BaseButton>
					</div>
				</form>
			</section>
		);}
    return <p>Loading... No content to display... </p>
	}

	return getJsxContent();
};

export default EditEventForm;
