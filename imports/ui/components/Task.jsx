import React from 'react';


export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
	return (
		<li>			
			<input
				id={ `check${ task._id }`} 
				type='checkbox'
				checked={ !!task.isChecked }
				onClick={ () => onCheckboxClick(task) }
				readOnly
			/>

			<label for={ `check${ task._id }`}>
				<img src='/images/check.png' />
			</label>		

			<span> { task.text } </span>
			<button onClick={ () => onDeleteClick(task) }> &times; </button> {/*Remover uma tarefa*/}
		</li>
	)
};