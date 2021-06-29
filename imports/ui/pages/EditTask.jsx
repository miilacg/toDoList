import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { 
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup	
} from '@material-ui/core';

import { TasksCollection } from '../../db/TasksCollection';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/task';



export const EditTask = () => {	
	let { taskId } = useParams();
	const history = useHistory();

	const [state, setState] = useState(true); // true é para visualização
	const [situation, setSituation] = useState('');
	
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

		const task = TasksCollection.findOne({ _id: taskId });
		if(!task){
			return { ...noDataAvailable, isLoading: true };
		}
		
    return { task, user };
  });	

	useEffect(() => {
		setSituation(task.situation);
	}, [task.situation]);


	const { year, month, day, hour, minute } = useCurrentDate(task.date);
	date = day + '/' + month + '/' + year + ' - ' + hour + ':' + minute;
	

	useEffect(() => {
    if(situation == 'Cadastrada') {
			const progress = document.getElementById('inProgress');
			const completed = document.getElementById('completed');
			progress.removeAttribute('disabled');
			completed.setAttribute('disabled', 'disabled');
		}

		if(situation == 'Concluida') {
			const progress = document.getElementById('inProgress');
			const registered = document.getElementById('registered');
			registered.removeAttribute('disabled');
			progress.setAttribute('disabled', 'disabled');
		}

		if(situation == 'Em andamento') {
			const registered = document.getElementById('registered');
			const completed = document.getElementById('completed');
			registered.removeAttribute('disabled');
			completed.removeAttribute('disabled');
		}
	}, [situation]);


	function handleSubmit(e) {
		e.preventDefault();		

		if(!situation) return;

		Meteor.call('tasks.setSituation', taskId, situation, function (error) {
			if(!error) {				
				history.push('/toDoList');
			}
		})
	};


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
								<h5><span>{ task.isParticular && 'Tarefa particular' } </span></h5>
								<h5><span>Responsável pela tarefa: </span>{  }</h5>
								<h5><span>Data da tarefa: </span>{ date }</h5>													

								{ task.description ? <h5><span>Descrição: </span>{ task.description }</h5> : '' }

								<h5><span>Situação: </span>{ task.situation }</h5>

								<form className='form taskForm' onSubmit={ handleSubmit }>
									<FormControl className='radio'>
										<RadioGroup row aria-label="Situação" name="situation" value={ situation } onChange={ (e) => setSituation(e.target.value) }>
											<FormControlLabel className='registered' id='controlRegistered' value="Cadastrada" control={<Radio id='registered' />} label="Cadastrada" />
											<FormControlLabel className='inProgress' value="Em andamento" control={<Radio id='inProgress' />} label="Em andamento" />
											<FormControlLabel className='completed' value="Concluida" control={<Radio id='completed' />} label="Concluida" />
										</RadioGroup>
									</FormControl>

									<div className='buttons'>
										<Button variant="contained"><Link to='/toDoList'>Voltar</Link></Button>
										<Button type='submit' variant="contained">Salvar status</Button>
										<Button type='button' variant="contained" onClick={ changeState }>Editar tarefa</Button>
									</div>		
								</form>									
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