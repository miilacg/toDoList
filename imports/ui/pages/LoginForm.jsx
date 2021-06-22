import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab';

import { Header } from '../components/Header';



export const LoginForm = () => {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');


	async function submit(e) {
		e.preventDefault();

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


	return (
		<div className='app'>
			<Header createUser='/createUser'/> 
			
			<div className='main'>
				<Alert id='error' className='error' style={{ display:'none' }} severity="error">
					Usuário ou senha incorreto
				</Alert>	

				<form onSubmit={ submit } className='login-form'>	
					<h1>Bem vindo ao To Do List</h1>

					<input 
						type='text'
						placeholder='Username'
						name='username'
						required
						onChange={ e => setUsername(e.target.value) }
					/>
				
					<input 
						type='password'
						placeholder='Password'
						name='password'
						required
						onChange={ e => setPassword(e.target.value) }
					/>

					<button type='submit'>Entrar</button>				
				</form> 
			</div>
		</div>
	);
};