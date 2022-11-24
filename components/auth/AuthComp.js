import BaseButton from '../ui/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import classes from './AuthComp.module.css';
import { router } from 'next/router';

const Auth = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.authReducer.isAuth);

	const [mode, setMode] = useState('login'); // either login or signup
	const [error, setError] = useState(false);
	const [httpError, setHttpError] = useState('');

	const usernameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const checkAuthOnBackEnd = () => {};

	const validate = () => {
		const [email, password] = [
			emailInputRef.current.value,
			passwordInputRef.current.value,
		];
		return email.includes('@') && email.length > 5 && password.length > 5;
	};

	const handleSignUp = async (e, email, password) => {
		e.preventDefault();
		if (!validate()) return setError(true);
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBR4GaaaFuFgOsbdCeI4cTbuSubFpmHhcg',
			{
				method: 'POST',
				body: JSON.stringify({ email, password, returnSecureToken: true }),
			}
		);

		const responseData = await response.json();

		if (!response.ok) {
      console.log(responseData.error.errors[0].message);
      return setHttpError("Error sending signup request to server --" + responseData.error.errors[0].message);
		}

		console.log(responseData);
    handleLoginAndLogout(e, responseData);
	};

  const handleLogin = async(e, email, password) => {
    e.preventDefault();
		if (!validate()) return setError(true);
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBR4GaaaFuFgOsbdCeI4cTbuSubFpmHhcg',
			{
				method: 'POST',
				body: JSON.stringify({ email, password, returnSecureToken: true }),
			}
		);

		const responseData = await response.json();

		if (!response.ok) {
      console.log(responseData.error.errors[0].message);
      return setHttpError("Error sending login request to server --" + responseData.error.errors[0].message);
		}

		console.log(responseData);
    handleLoginAndLogout(e, responseData);
  }


	const handleLoginAndLogout = (e, data) => {
		e.preventDefault();
		console.log('isAuth: ', isAuth);
		checkAuthOnBackEnd();
		if (isAuth) {
			console.log('handleLoginAndLogout() -logging user out...');
			dispatch({ type: 'logout' });
			dispatch({ type: 'setUsername', payload: '' });
		} else {
			console.log('handleLoginAndLogout() -logging user in... data: ', data);
			dispatch({ type: 'login', payload: {token: data.idToken, userId: data.localId, tokenExpiration: data.expiresIn} });
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
				{httpError && (
					<p className={classes.errorMessage}>
						{httpError}
					</p>
				)}
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
			// already logged in
			return (
				<form className={classes.form} onSubmit={handleLoginAndLogout}>
					<BaseButton text='confirm logout'></BaseButton>
				</form>
			);
		}

		if (mode === 'signup') {
			// user wants to signup
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
							handleSignUp(
								e,
								emailInputRef.current.value,
								passwordInputRef.current.value
							)
						}>
						{emailUsernameAndPasswordInputs}
						<BaseButton text='SignUp'></BaseButton>
					</form>
				</div>
			);
		}
		// else !isAuth && !signup -> login
		return (
			<div>
				<div className={classes.option}>
					<BaseButton
						onClick={() => setMode('signup')}
						text='Switch to signup >>'></BaseButton>
				</div>
				<form className={classes.form} onSubmit={(e) => handleLogin(e, emailInputRef.current.value,
								passwordInputRef.current.value)}>
					{emailUsernameAndPasswordInputs}
					<BaseButton text='Login'></BaseButton>
				</form>
			</div>
		);
	}

	return JSXContent();
};

export default Auth;
