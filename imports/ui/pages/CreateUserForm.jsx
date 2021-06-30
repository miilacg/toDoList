import React from 'react';

import { Menu } from '../components/Menu';
import { UserForm } from '../components/UserForm';



export const CreateUserForm = () => {
	return (
		<div className='app'>
			<Menu /> 

			<div className='main'>
				<UserForm action='create' buttonSubmit='Criar' text='Preencha os campos'/>
			</div>
		</div>
	);
};