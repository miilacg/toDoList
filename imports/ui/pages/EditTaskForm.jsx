import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import { 
	Checkbox, 
	ListItemIcon, 
	IconButton,
	Link 
} from '@material-ui/core';

import { TasksCollection } from '../../db/TasksCollection';

import { Header } from '../components/Header';



export const EditTaskForm = () => {
	let { ID } = useParams();
	const [nameTask, setNameTask] = useState('');
	const [description, setDescription] = useState('');
	const [checked, setChecked] = useState(false);	

	// Editando o usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!nameTask) return;
		
		Meteor.call('tasks.edit', ID, description, nameTask, checked);

		setNameTask('');
		setDescription('');
		setUsername('');
		setChecked(false);
	};


	return (
		<div className='app'>
			<Header /> 

			<div className='main'>
				<form onSubmit={ handleSubmit } className='login-form'>
					<input 
						type='text'
						placeholder='Titulo'
						value={ nameTask }
						required
						onChange={ (e) => setNameTask(e.target.value) }
					/>

					<ListItemIcon>
						<Checkbox
							edge="end"
							onChange={ (e) => setChecked(e.target.checked) }
							checked={ checked }
						/>
					</ListItemIcon>

					<input 
						type='text'
						placeholder='Descrição'
						value={ description }
						onChange={ (e) => setDescription(e.target.value) }
					/>

					<button type='submit'>Salvar alterações</button>	
				</form> 
			</div>
		</div>
	);
};