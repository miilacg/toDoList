import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { 
	Button,
	Checkbox, 
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	ListItemSecondaryAction,
	Radio,
	RadioGroup,
	TextField	
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import '../../../client/styles/forms.scss';
import '../../../client/styles/task.scss';



const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},

		'& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    },
	},
}));


export function TaskForm({ 
	action, taskId, buttonSubmit, buttonExit, onClickExit,
	dateSelect, titleSelect, descriptionSelected, situationSelected, particularSelected 
}) {
	
	const { tempDate, year, month, day, hour, minute } = useCurrentDate(dateSelect);	
	const currentDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;

	const [date, setDate] = useState(currentDate);
	const [titleTask, setTitleTask] = useState(titleSelect);
	const [description, setDescription] = useState('');
	const [situation, setSituation] = useState(situationSelected);
	const [isParticular, setIsParticular] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		if(action === 'edition') {
			console.log('oi');
			setDescription(descriptionSelected);
			setIsParticular(particularSelected);
		}
	}, []);
	

	const handleSubmit = e => {
		e.preventDefault();

		if(!titleTask || !date) return;

		const tempCurrentDate = new Date(date);
		if(tempCurrentDate.getTime() <= tempDate) {
			const errorMessage = document.getElementById('error');
			errorMessage.setAttribute("style", "display: flex");
			document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Escolha uma data superior a data atual';
			return;
		}

		if(action == 'create') { // Adicionando uma nova tarefa
			Meteor.call('tasks.insert', date, titleTask, description, isParticular);
		}
		
		if(action == 'edition') { // Editando tarefa
			Meteor.call('tasks.edit', taskId, date, description, situation, titleTask, isParticular, function (error) {
				if(error && error.error === 'Not authorized') {				
					const errorMessage = document.getElementById('error');
					errorMessage.setAttribute("style", "display: flex");
					document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Você não tem permissão para alterar essa tarefa';
				} 
			})
		}					

		setDate(currentDate);
		setTitleTask('');
		setDescription('');
		setSituation('');
		setIsParticular(false);
		onClickExit();
	};

	useEffect(() => {
		if(action == 'edition'){
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
		}
	}, [situation]);

  
	return (
		<form className='form taskForm' onSubmit={ handleSubmit }>
			<TextField					
				value={ titleTask }
				label="Tarefa"
				type="text"
				onChange={ (e) => setTitleTask(e.target.value) }
				required
			/>	

			<TextField
				id="standard-textarea"
				label="Descrição"
				value={ description }
				onChange={ (e) => setDescription(e.target.value) } 
				multiline
			/>

			{ action == 'edition' &&
				<FormControl className='radio'>
					<FormLabel>Situação</FormLabel>
					<RadioGroup row aria-label="Situação" name="situation" value={ situation } onChange={ (e) => setSituation(e.target.value) }>
						<FormControlLabel className='registered' value="Cadastrada" control={<Radio id='registered' />} label="Cadastrada" />
						<FormControlLabel className='inProgress' value="Em andamento" control={<Radio id='inProgress' />} label="Em andamento" />
						<FormControlLabel className='completed' value="Concluida" control={<Radio id='completed' />} label="Concluida" />
					</RadioGroup>
				</FormControl>
			}

			<TextField
				id="datetime-local"
				label="Data"
				type="datetime-local"
				value={ date }
				onChange={ (e) => setDate(e.target.value) } 
				className={ classes.textField }
				InputLabelProps={{
					shrink: true,
				}}
			/>	
			
			<FormControl>							
				<Checkbox 
					edge="start"
					checked={ isParticular } 
					onChange={ (e) => setIsParticular(e.target.checked) }
				/>
				<ListItemSecondaryAction>
					<InputLabel>Tarefa particular</InputLabel>
				</ListItemSecondaryAction>	
			</FormControl>		

			<Alert id='error' className='error' style={{ display:'none' }} severity="error">	</Alert>

			<div className='buttons'>
				<Button variant="contained" onClick={ () => onClickExit() }>{ buttonExit }</Button>
				<Button type='submit' variant="contained">{ buttonSubmit }</Button>
			</div>
		</form>	 								
	);
};