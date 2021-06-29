import React from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/task.scss';



const useStyles = makeStyles((theme) => ({
	paper: {
    position: 'absolute',
    width: 'auto',
		top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
		borderRadius: '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 1),
  },
}));



export function CreateTask({ setOpenCreateTask }) {
	const classes = useStyles();

	const handleClose = () => {
    setOpenCreateTask(false);
  };

  
	return (		
		<Modal
			open={ setOpenCreateTask }
			onClose={ handleClose }
		>
			<div className={ classes.paper }>
				<h3 id='titleModalAddTask'>Preencha os campos</h3>

				<TaskForm 
					action='create'
					buttonSubmit='Adicionar tarefa' 
					buttonExit='Voltar'
					onClickExit={ handleClose }
				/>
			</div>
		</Modal>				
	);
};