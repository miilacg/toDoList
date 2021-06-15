import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';



export const CreateUserForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// Adicionando novo usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!username || !password) return;

		Meteor.call('users.insert', username, password);
		setUsername('');
		setPassword('');
	};


	return (
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
				<button type='submit'>Create</button>
			</div>
		</form> 
	);
};