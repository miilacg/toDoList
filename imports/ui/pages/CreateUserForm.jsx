import React from 'react';

import { Header } from '../components/Header';
import { UserForm } from '../components/UserForm';



export const CreateUserForm = () => {
	return (
		<div className='app'>
			<Header /> 

			<div className='main'>
				<UserForm action='create' buttonSubmit='Criar' text='Preencha os campos'/>
			</div>
		</div>
	);
};