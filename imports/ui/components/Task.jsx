import React from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText, Checkbox, ListItemIcon, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



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
        <IconButton edge="end" aria-label="delete" onClick={ () => onDeleteClick(task) }>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
	)
};