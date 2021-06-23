import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useHistory } from "react-router-dom";
import { 
	Button,
	TextField	
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Header } from '../components/Header';

import '../../../client/styles/forms.scss';



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

				<form onSubmit={ submit } className='login-form form'>	
					<h1>Bem vindo ao To Do List</h1>

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

					<Button type='submit' variant="contained">Entrar</Button>			
				</form> 
			</div>
		</div>
	);
};