import React from 'react';

import { Header } from '../components/Header';
import { UserForm } from '../components/UserForm';

import '../../../client/styles/forms.scss';



export const LoginForm = () => {
	return (
		<div className='app'>
			<Header createUser='/createUser'/> 
			
			<div className='main'>
				<UserForm action='login' buttonSubmit='Entrar' text='Bem vindo ao To Do List'/>
			</div>
		</div>
	);
};