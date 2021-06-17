import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab';

import { Header } from '../components/Header';



export const LoginForm = () => {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function login() {
		if (Meteor.user()) {
			history.push('/toDoList');
		} else {
			const error = document.getElementById('error');
			error.setAttribute("style", "display: flex");
		} 
	}


	async function submit(e) {
		e.preventDefault();

		// Autenticar o usuário com as entradas fornecidas
		Meteor.loginWithPassword(username, password);
		login();
	}


	return (
		<div className='app'>
			<Header createUser='/createUser'/> 
			
			<div className='main'>
				<Alert id='error' className='error' style={{ display:'none' }} severity="error">
					Usuário ou senha incorreto
				</Alert>	

				<form onSubmit={ submit } className='login-form'>
					<div>
						<label htmlFor='username'>Username</label>

						<input 
							type='text'
							placeholder='Username'
							name='username'
							required
							onChange={ e => setUsername(e.target.value) }
						/>
					</div>

					<div>
						<label htmlFor='password'>Password</label>

						<input 
							type='password'
							placeholder='Password'
							name='password'
							required
							onChange={ e => setPassword(e.target.value) }
						/>
					</div>

					<div>				
						<button type='submit'>Log In</button>				
					</div>
				</form> 
			</div>
		</div>
	);
};