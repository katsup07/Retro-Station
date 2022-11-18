import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'next/router';
import BaseButton from './ui/BaseButton';
import classes from './AddPostForm.module.css';

const AddPostForm = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.authReducer.isAuth)
	const titleRef = useRef();
	const imageRef = useRef();
	const decadeRef = useRef();
	const descriptionRef = useRef();

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const eventData = {
      id: Date.now(),
			title: titleRef.current.value,
			image: imageRef.current.value,
			decade: decadeRef.current.value,
			description: descriptionRef.current.value,
		};
    dispatch({type: 'addEvent', eventData});
    router.replace('/');
	};

function getJsxContent(){
  if(isAuth){
	return (
		<section>
			<form className={classes.form} onSubmit={formSubmitHandler}>
				<label htmlFor='event'>Title</label>
				<input type='text' id='event' ref={titleRef} />

				<label htmlFor='image'>Image</label>
				<input type='url' id='image' ref={imageRef} />

				<label htmlFor='year'>Decade</label>
				<select name='decade' id='decade' ref={decadeRef}>
					<option value='1960s'>1960s</option>
					<option value='1970s'>1970s</option>
					<option value='1980s'>1980s</option>
					<option value='1990s'>1990s</option>
				</select>

				<label htmlFor='description'>Description</label>
				<textarea id='description' ref={descriptionRef}></textarea>
				<div className={classes.btn}>
					<BaseButton text='post'></BaseButton>
				</div>
			</form>
		</section>
	);
  }
 
  return <p>Please login to add new event posts.</p>
}

return getJsxContent();
}

export default AddPostForm;