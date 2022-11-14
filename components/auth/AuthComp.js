import BaseButton from '../ui/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import classes from './AuthComp.module.css';
import { router } from 'next/router';

const Auth = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const usernameInputRef = useRef();

	const handleLoginAndLogout = (e) => {
		e.preventDefault();
    console.log('isAuth: ', isAuth);
		if (isAuth) {
			console.log('handleLoginAndLogout() -logging user out...');
			dispatch({ type: 'logout' });
			dispatch({ type: 'setUsername', payload: '' });
		} else {
			console.log('handleLoginAndLogout() -logging user in...');
			dispatch({ type: 'login' });
			dispatch({
				type: 'setUsername',
				payload: usernameInputRef.current.value,
			});
		}

		router.replace('/');
	};

	function getJsxContent() {
		if (isAuth) {
			return (
				<form className={classes.form} onSubmit={handleLoginAndLogout}>
					<BaseButton
						text={isAuth ? 'confirm logout' : 'login/signup'}></BaseButton>
				</form>
			);
		}
		// else !isAuth
		return (
			<form className={classes.form} onSubmit={handleLoginAndLogout}>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' />
				<label htmlFor='username'>Username</label>
				<input type='username' id='username' ref={usernameInputRef} />
				<label htmlFor='password'>Password</label>
				<input type='password' id='password' />
				<BaseButton
					text={isAuth ? 'confirm logout' : 'login/signup'}></BaseButton>
			</form>
		);
	}

	return getJsxContent();
};

export default Auth;
