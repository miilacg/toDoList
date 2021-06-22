import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
	Button,
	Checkbox, 
	FormControl,
	Input,
	InputLabel,
	ListItemSecondaryAction,
	TextField	
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},

		'& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
	},

	paper: {
    position: 'absolute',
    width: 400,
		top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
		borderRadius: '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
  },
}));

export function TaskForm({ action, taskId, buttonSubmit, buttonExit, onClickExit }) {
	let currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	const hour = currentDate.getHours();
	const minute = String(currentDate.getMinutes()).padStart(2, '0');
	currentDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;

	const [date, setDate] = useState(currentDate);
	const [titleTask, setTitleTask] = useState('');
	const [description, setDescription] = useState('');
	const [isParticular, setIsParticular] = useState(false);	

	const classes = useStyles();

	// Editando o usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!titleTask || !date) return;
		
		if(action == 'create') { // Adicionando uma nova tarefa
			Meteor.call('tasks.insert', date, titleTask, description, isParticular);
		}
		
		if(action == 'edition') { // Editando tarefa
			Meteor.call('tasks.edit', taskId, date, description, titleTask, isParticular);
		}					

		setDate(currentDate);
		setTitleTask('');
		setDescription('');
		setIsParticular(false);
	};
	
  
	return (
		<form className='task-form' onSubmit={ handleSubmit }>
			<FormControl>
				<InputLabel htmlFor="component-simple">Tarefa</InputLabel>
				<Input 
					id="component-simple" 
					value={ titleTask } 
					onChange={ (e) => setTitleTask(e.target.value) } 
					required
				/>
			</FormControl>

			<TextField
				id="standard-textarea"
				label="Descrição"
				value={ description }
				onChange={ (e) => setDescription(e.target.value) } 
				multiline
			/>

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

			<Button variant="contained" onClick={ () => onClickExit() }>{ buttonExit }</Button>
			<Button type='submit' variant="contained">{ buttonSubmit }</Button>
		</form>	 								
	);
};