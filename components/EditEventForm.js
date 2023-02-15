import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'next/router';
import { findPostOnServer, updateOnServer } from '../util/helpers';
import BaseButton from './ui/BaseButton';
import classes from './AddPostForm.module.css';

const EditEventForm = ({ eventId }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);
  const username = useSelector(state => state.authReducer.username);

	// const [title, setTitle] = useState("hi");
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [decade, setDecade] = useState('');

	useEffect(() => {
		(async function fetch() {
			const event = await findPostOnServer(eventId);
      
			if (event) {
				setTitle(event.title);
				setImage(event.image);
				setDescription(event.description);
				setDecade(event.decade);
			}
		})();
	}, []);

	const handlePostingEvent = async (eventData) => {
    console.log("handling posting event...", eventData);
    if(await updateOnServer(eventData, eventId))
		  dispatch({ type: 'addEvent', eventData });
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		const eventData = {
			title,
			image,
			decade,
			description,
      author: username,
		};

    console.log('eventData: ', eventData);
	  await handlePostingEvent(eventData);
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
