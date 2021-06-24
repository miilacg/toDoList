import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { Button, TextField } from '@material-ui/core';

import '../../../client/styles/forms.scss';
import '../../../client/styles/user.scss';



export function UserForm({ action, buttonSubmit, text }) {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		if(!password || !username) return;
		
		if(action == 'create') { // Criando um usuário
			Meteor.call('users.insert', username, password);
		}
		
		if(action == 'login') { // Fazendo login
			Meteor.loginWithPassword(username, password, function (error) {
				if(!error){
					history.push('/toDoList');
				}
				else {
					const error = document.getElementById('error');
					error.setAttribute("style", "display: flex");
				}
			});
		}					

		setUsername('');
		setPassword('');
	};
	
  
	return (
		<form className='form userForm' onSubmit={ handleSubmit }>
			<h1>{ text }</h1>

			<TextField						
				type="text"
				label="Nome"
				value={ username }				
				onChange={ (e) => setUsername(e.target.value) }
				required
			/>

			<TextField						
				type="password"
				label="Senha"
				value={ password }				
				onChange={ (e) => setPassword(e.target.value) }
				required
			/>			

			<Button type='submit' variant="contained">{ buttonSubmit }</Button>
		</form>	 								
	);
};