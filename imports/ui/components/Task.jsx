import React from 'react';
import { Link } from 'react-router-dom';
import { 
					ListItem, 
					ListItemSecondaryAction, 
					ListItemText, 
					Checkbox, 
					ListItemIcon, 
					IconButton 
				} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';



export const Task = ({ task, user, onCheckboxClick, onDeleteClick }) => {
	return (
		<ListItem key={ task._id }>
      <ListItemIcon>
				<Checkbox
					edge="start"
					id={ `check${ task._id }`} 
					onClick={ () => onCheckboxClick(task) }
					checked={ !!task.isChecked }
				/>
      </ListItemIcon>

      <ListItemText id={ task._id } primary={ task.text } secondary={ user }/>
		
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