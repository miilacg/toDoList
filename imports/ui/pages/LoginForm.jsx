import React from 'react';

import { Menu } from '../components/Menu';
import { UserForm } from '../components/UserForm';

import '../../../client/styles/forms.scss';



export const LoginForm = () => {
	return (
		<div className='app'>
			<Menu createUser='/createUser'/> 
			
			<div className='main'>
				<UserForm action='login' buttonSubmit='Entrar' text='Bem vindo ao To Do List'/>
			</div>
		</div>
	);
};