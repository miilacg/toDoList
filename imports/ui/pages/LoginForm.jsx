import React from 'react';
import Alert from '@material-ui/lab/Alert';

import { Header } from '../components/Header';
import { UserForm } from '../components/UserForm';

import '../../../client/styles/forms.scss';



export const LoginForm = () => {
	return (
		<div className='app'>
			<Header createUser='/createUser'/> 
			
			<div className='main'>
				<Alert id='error' className='error' style={{ display:'none' }} severity="error">
					Usuário ou senha incorreto
				</Alert>	

				<UserForm action='login' buttonSubmit='Entrar' text='Bem vindo ao To Do List'/>
			</div>
		</div>
	);
};