import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
	Button,
	Checkbox, 
	FormControl,
	Input,
	InputLabel,
	ListItemSecondaryAction,
	Modal,
	TextField	
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import '../../../client/styles/taskForm.scss';



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



export default function TaskForm() {
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

	const [open, setOpen] = useState(false);
	const classes = useStyles();


	// Adicionando uma nova tarefa
	const handleSubmit = e => {
		e.preventDefault();

		if(!titleTask || !date) return;

		Meteor.call('tasks.insert', date, titleTask, description, isParticular);

		setDate(currentDate);
		setTitleTask('');
		setDescription('');
		setIsParticular(false);
	};

	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
	return (
		<>	
			<Button className='newTask' onClick={ handleOpen }>
				<AddCircleOutlineIcon />	Adicionar nova tarefa
			</Button>		

			<Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={ classes.paper }>
					<h3 id='titleModalAddTask'>Preencha os campos</h3>

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

						<Button variant="contained" onClick={ handleClose }>Cancelar</Button>
						<Button type='submit' variant="contained">Adicionar tarefa</Button>
					</form>	 
				</div>
      </Modal>			
		</>		
	);
};