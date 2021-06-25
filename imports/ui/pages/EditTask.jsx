import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; 
import { Link } from 'react-router-dom';
import { 
	Checkbox, 
	FormControl,
	ListItemSecondaryAction,
	InputLabel,
	Button
} from '@material-ui/core';

import { TasksCollection } from '../../db/TasksCollection';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/task';



export const EditTask = () => {	
	let { taskId } = useParams();

	const [state, setState] = useState(true); // true é para visualização
	
	const changeState = () => {
		setState(!state);
	}

  
	const { task, user, isLoading } = useTracker(() => {
		const noDataAvailable = { task: [] };
		const handleTask = Meteor.subscribe('tasks');

		if(!handleTask.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
		
		let user = Meteor.user();
		if(!Meteor.user()){
			return { ...noDataAvailable, isLoading: true };
		}

		const task = TasksCollection.findOne({ _id: taskId, userId: user._id });	
		
    return { task, user };
  });

	const { year, month, day, hour, minute } = useCurrentDate(task.date);
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

							<div className="information">
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

							<div className="information">
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