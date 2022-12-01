import BaseButton from '../ui/BaseButton';
import { authenticateOnServer } from '../../util/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import classes from './AuthComp.module.css';
import { router } from 'next/router';

const Auth = () => {
	const signupUrl =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBR4GaaaFuFgOsbdCeI4cTbuSubFpmHhcg';
	const signinUrl =
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBR4GaaaFuFgOsbdCeI4cTbuSubFpmHhcg';

	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const [mode, setMode] = useState('login'); // either login or signup
	const [error, setError] = useState(false);
	const [httpError, setHttpError] = useState('');

	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const validate = () => {
		const [email, password] = [
			emailInputRef.current.value,
			passwordInputRef.current.value,
		];
		return email.includes('@') && email.length > 5 && password.length > 5;
	};

   // url decides whether it is a login or signup request. Everything else is the same.
	const handleServersideLoginOrSignupAuth = async (e, email, password, url) => {
		e.preventDefault();
		if (!validate()) return setError(true);

		const { response, responseData } = await authenticateOnServer(
			email,
			password,
			url
		);
		if (!response.ok) {
			console.log(responseData.error.errors[0].message);
			return setHttpError(
				'Error sending login request to server --' +
					responseData.error.errors[0].message
			);
		}

		console.log(responseData);
		handleStoreLoginOrLogout(e, responseData);
	};

	const handleStoreLoginOrLogout = (e, data) => {
		e.preventDefault();
		console.log('isAuth: ', isAuth);
		if (isAuth) {
			console.log('handleStoreLoginOrLogout() -logging user out...');
			dispatch({ type: 'logout' });
			dispatch({ type: 'setUsername', payload: '' });
		} else {
			console.log('handleStoreLoginOrLogout() -logging user in... data: ', data);
			dispatch({
				type: 'login',
				payload: {
					token: data.idToken,
					userId: data.localId,
					tokenExpiration: data.expiresIn,
				},
			});
			dispatch({
				type: 'setUsername',
				payload: usernameInputRef.current.value,
			});
		}

		router.replace('/');
	};

	function JSXContent() {
		const emailUsernameAndPasswordInputs = (
			<>
				{httpError && <p className={classes.errorMessage}>{httpError}</p>}
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					ref={emailInputRef}
					onFocus={() => setError(false)}
				/>
				<label htmlFor='username'>Username</label>
				<input
					type='username'
					id='username'
					ref={usernameInputRef}
					onFocus={() => setError(false)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					ref={passwordInputRef}
					onFocus={() => setError(false)}
				/>
				{error && (
					<p className={classes.errorMessage}>
						Please ensure each field is at least 5 characters long and a proper
						email address is used
					</p>
				)}
			</>
		);

		if (isAuth) {
			// logout
			return (
				<form className={classes.form} onSubmit={handleStoreLoginOrLogout}>
					<BaseButton text='confirm logout'></BaseButton>
				</form>
			);
		}

		if (mode === 'signup') {
			// signup
			return (
				<div>
					<div className={classes.option}>
						<BaseButton
							onClick={() => setMode('login')}
							text='Switch to login >>'></BaseButton>
					</div>
					<form
						className={classes.form}
						onSubmit={(e) =>
							handleServersideLoginOrSignupAuth(
								e,
								emailInputRef.current.value,
								passwordInputRef.current.value,
								signupUrl
							)
						}>
						{emailUsernameAndPasswordInputs}
						<BaseButton text='SignUp'></BaseButton>
					</form>
				</div>
			);
		}
		// sign in
		return (
			<div>
				<div className={classes.option}>
					<BaseButton
						onClick={() => setMode('signup')}
						text='Switch to signup >>'></BaseButton>
				</div>
				<form
					className={classes.form}
					onSubmit={(e) =>
						handleServersideLoginOrSignupAuth(
							e,
							emailInputRef.current.value,
							passwordInputRef.current.value,
							signinUrl
						)
					}>
					{emailUsernameAndPasswordInputs}
					<BaseButton text='Login'></BaseButton>
				</form>
			</div>
		);
	}

	return JSXContent();
};

export default Auth;
