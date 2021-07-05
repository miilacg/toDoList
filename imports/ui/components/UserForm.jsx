import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Meteor } from 'meteor/meteor';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
			Meteor.call('users.insert', username, password, function (error) {
				if(!error) {
					history.push('/');
					const successMessage = document.getElementById('success');
					successMessage.setAttribute("style", "display: flex");
				} else {
					const errorMessage = document.getElementById('error');
					errorMessage.setAttribute("style", "display: flex");
					document.getElementsByClassName("MuiAlert-message")[0].innerHTML = error.error;
				}
			})
		}
		
		if(action == 'login') { // Fazendo login
			Meteor.loginWithPassword(username, password, function (error) {
				if(!error){
					history.push('/dashboard');
				}
				else {
					const errorMessage = document.getElementById('error');
					errorMessage.setAttribute("style", "display: flex");
					document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Usuário ou senha incorreto';
				}
			});
		}					

		setUsername('');
		setPassword('');
	};
	
  
	return (
		<>
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

			<Alert id='error' className='alert error' style={{ display:'none' }} severity="error"> </Alert>	

			<Alert id='success' className='alert success' style={{ display:'none' }} severity="success"> 	
				Cadastro efetuado com sucesso
			</Alert>
		</>							
	);
};