import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; 
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { 
	Checkbox, 
	FormControl,
	ListItemSecondaryAction,
	InputLabel,
	Button
} from '@material-ui/core';

import { TasksCollection } from '../../db/TasksCollection';

import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/task';



export const EditTask = () => {	
	const [state, setState] = useState(true); // true é para visualização
	let { taskId } = useParams();
	
	const changeState = () => {
		setState(!state);
	}

  
	const { task, user, isLoading } = useTracker(() => {
		const noDataAvailable = { task: [] };
		const handleTask = Meteor.subscribe('tasks');

		if(!handleTask.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
		
		const task = TasksCollection.findOne({ _id: taskId });		
		let user = Meteor.user();

		if(!Meteor.user()){
			return { ...noDataAvailable, isLoading: true };
		} 		
		
    return { task, user };
  });

	let date = new Date(task.date);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hour = date.getHours();
	const minute = String(date.getMinutes()).padStart(2, '0');
	date = day + '/' + month + '/' + year + ' - ' + hour + ':' + minute;


	return (			
		<div className='app'>
			<Header user={ user }/> 
			
			<div className='main editTask'>
				{ state ? (
					isLoading ? (
						<div className='loading'>loading...</div> 
					) : (
						<>
							<h2>{ task.titleTask }</h2>

							<div class="information">
								<h5><span>Responsavel pela tarefa: </span>{ user.username }</h5>
								<h5><span>Data da tarefa: </span>{ date }</h5>
								<h5><span>Situação: </span></h5>
								{ task.description ? <h5><span>Descrição: </span>{ task.description }</h5> : '' }

								<FormControl>							
									<Checkbox 
										edge="start"
										checked={ !!task.isParticular }
										disable
									/>
									<ListItemSecondaryAction>
										<InputLabel>Tarefa particular</InputLabel>
										{/*<ListItemText primary='Atividade particular' />*/}
									</ListItemSecondaryAction>	
								</FormControl>
							</div>

							<div className='buttons'>
								<Button variant="contained"><Link to='/toDoList'>Voltar</Link></Button>
								<Button type='submit' variant="contained" onClick={ changeState }>Editar tarefa</Button>
							</div>	
						</>
					)				
				) : (
					isLoading ? (
						<div className='loading'>loading...</div> 
					) : (
						<>
							<h2>editar tarefa: { task.titleTask }</h2>

							<div class="information">
								<TaskForm 
									taskId={ taskId } 
									action='edition'
									buttonSubmit='Salvar alterações' 
									buttonExit='Voltar'
									onClickExit={ changeState }
								/>
							</div>							
						</>
					)
				) }		
			</div>
		</div>
	);
};