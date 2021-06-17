import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";

import { Header } from './Header';



export const LoginForm = () => {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = e => {
		e.preventDefault();

		// Autenticar o usuário com as entradas fornecidas
		Meteor.loginWithPassword(username, password);

		const user = Meteor.user();
		if(user) {
			history.push('/toDoList'); 
		}
	};


	return (
		<div className='app'>
			<Header createUser='/createUser'/> 

			<div className='main'>
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