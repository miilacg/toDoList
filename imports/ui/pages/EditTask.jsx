import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { useParams } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'; 

import { TasksCollection } from '../../db/TasksCollection';

import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';



export const EditTask = () => {	
	const [state, setState] = useState(true); // true é para visualização
	let { taskId } = useParams();
	
	const changeState = () => {
		setState(!state);
	}
  
	const task = useTracker(() => {
		Meteor.subscribe('tasks');
    const task = TasksCollection.findOne({ _id: taskId });
		console.log('testUser ' + task);

    return task;
  });

	console.log('testUser ' + JSON.stringify(task));

	return (			
		<div className='app'>
			<Header /> 
			
			{ state ? (
				<div className='main'>
					<h1 onClick={ changeState }>teste</h1>
				</div>
			) : (
				<div className='main'>
					<h2>Editar tarefa</h2>

					<TaskForm 
						taskId={ taskId } 
						action='edition'
						buttonSubmit='Salvar alterações' 
						buttonExit='Voltar'
						onClickExit={ changeState }
					/>
				</div>
			) }		
		</div>
	);
};