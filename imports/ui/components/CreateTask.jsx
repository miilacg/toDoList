import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
	Button,
	Modal	
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { TaskForm } from '../components/TaskForm';

import '../../../client/styles/taskForm.scss';



const useStyles = makeStyles((theme) => ({
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



export function CreateTask() {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

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

					<TaskForm 
						action='create'
						buttonSubmit='Adicionar tarefa' 
						buttonExit='Voltar'
						onClickExit={ handleClose }
					/>
				</div>
      </Modal>			
		</>		
	);
};