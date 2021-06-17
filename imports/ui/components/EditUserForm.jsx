import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Header } from './Header';



export const EditUserForm = () => {
	const user = useTracker(() => Meteor.user());

	const [username, setUsername] = useState(user.username);
	const [password, setPassword] = useState('');

	// Editando o usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!username || !password) return;

		Meteor.call('users.edit', username, password);
		setUsername('');
		setPassword('');
	};


	return (
		<div className='app'>
			<Header /> 

			<div className='main'>
				<form onSubmit={ handleSubmit } className='login-form'>
					<div>
						<label htmlFor='username'>Username</label>

						<input 
							type='text'
							placeholder='Username'
							value={ username }
							required
							onChange={ (e) => setUsername(e.target.value) }
						/>
					</div>

					<div>
						<label htmlFor='password'>Password</label>

						<input 
							type='password'
							placeholder='Password'
							value={ password }
							required
							onChange={ (e) => setPassword(e.target.value) }
						/>
					</div>

					<div>
						<button type='submit'>Save</button>
					</div>
				</form> 
			</div>
		</div>
	);
};