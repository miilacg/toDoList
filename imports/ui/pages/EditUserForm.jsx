import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { Header } from '../components/Header';



export const EditUserForm = () => {
	const [username, setUsername] = useState('');
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
					<input 
						type='text'
						placeholder='Username'
						value={ username }
						required
						onChange={ (e) => setUsername(e.target.value) }
					/>
				
					<input 
						type='password'
						placeholder='Password'
						value={ password }
						required
						onChange={ (e) => setPassword(e.target.value) }
					/>

					<button type='submit'>Salvar alterações</button>	
				</form> 
			</div>
		</div>
	);
};