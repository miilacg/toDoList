import React from 'react';
import { Link } from 'react-router-dom';
import { 
					ListItem, 
					ListItemSecondaryAction, 
					ListItemText, 
					ListItemIcon, 
					IconButton 
				} from '@material-ui/core';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import '../../../client/styles/task.scss';



export const Task = ({ task, user, situation, onDeleteClick }) => {
	return (
		<ListItem key={ task._id }>
      <ListItemIcon>
				{ situation == 'Cadastrada' ? (
					<CheckBoxOutlineBlankRoundedIcon />
				) : (
					situation == 'Concluida' ? (
						<CheckBoxRoundedIcon className='completed' />
					) : (
						<IndeterminateCheckBoxRoundedIcon className='inProgress' />
					)
				) }
      </ListItemIcon>

      <ListItemText id={ task._id } primary={ task.titleTask } secondary={ user }/>
		
			<ListItemSecondaryAction>
				<IconButton className='editar' aria-label="editar tarefa">
					<Link to={ `/editTask/${ task._id }` } >
						<VisibilityOutlinedIcon />
					</Link>	
				</IconButton>	

				<IconButton edge="end" aria-label="excluir tarefa" onClick={ () => onDeleteClick(task) }>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
	)
};