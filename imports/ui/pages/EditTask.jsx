import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import Button from '@material-ui/core/Button';

import { TasksCollection } from '../../db/TasksCollection';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import { CheckedSituation } from '../components/CheckedSituation';
import { Menu } from '../components/Menu';
import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/task';



export const EditTask = () => {	
	Meteor.subscribe('allUsers');

	let { taskId } = useParams();

	const [state, setState] = useState(true); // true é para visualização
	
	const changeState = () => {
		setState(!state);
	}
  
	const { task, user, username, isLoading } = useTracker(() => {
		const noDataAvailable = { task: [] };
		const handleTask = Meteor.subscribe('tasks');
		Meteor.subscribe('users');

		if(!handleTask.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
		
		if(!Meteor.user()){
			return { ...noDataAvailable, isLoading: true };
		}
		const user = Meteor.user();

		const task = TasksCollection.findOne({ _id: taskId });
		if(!task){
			return { ...noDataAvailable, isLoading: true };
		}

		const { username } = Meteor.users.findOne({ _id: task.userId });
		if(!username){
			return { ...noDataAvailable, isLoading: true };
		}

		return { task, user, username };
  });	


	const { year, month, day, hour, minute } = useCurrentDate(task.date);
	date = day + '/' + month + '/' + year + ' - ' + hour + ':' + minute;
	

	return (			
		<div className='app'>
			<Menu user={ user }/> 
			
			<div className='main editTask'>
				{ state ? (
					isLoading ? (
						<div className='loading'>loading...</div> 
					) : (
						<>
							<h2>{ task.titleTask }</h2>

							<div className="information">
								<h5><span>{ task.isParticular && 'Tarefa particular' } </span></h5>
								<h5><span>Responsável pela tarefa: </span>{ username }</h5>
								<h5><span>Data da tarefa: </span>{ date }</h5>													

								{ task.description ? <h5><span>Descrição: </span>{ task.description }</h5> : '' }

								<h5><span>Situação: </span>{ task.situation }</h5>

								{ user._id != task.userId ? (
									<div className='buttons notUser'>
										<Button variant="contained"><Link to={ `/toDoList/${ user._id }` }>Voltar</Link></Button>
									</div>
								) : (	
									<>
										<CheckedSituation 
											taskId={ taskId }
											situation={ task.situation }
										/>

										<div className='buttons'>
											<Button variant="contained"><Link to={ `/toDoList/${ user._id }` }>Voltar</Link></Button>
											<Button type='button' variant="contained" onClick={ changeState }>Editar tarefa</Button>
										</div>
									</>											
								)	}														
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
									dateSelect={ task.date }
									titleSelect={ task.titleTask }
									descriptionSelected={ task.description }
									situationSelected={ task.situation }
									particularSelected={ task.isParticular }
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