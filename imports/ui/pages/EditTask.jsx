import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';



export const EditTask = () => {
	let { taskId } = useParams();

	const [state, setState] = useState(true); // true é para visualização

	const changeState = () => {
		setState(!state); 
  }

	return (
		<div className='app'>
			<Header /> 
			
			{ state ? (
				<div className='main'>
					<h1 onClick={ changeState }>teste</h1>
				</div>
			) : (
				<div className='main'>
					<h2>Editar tarefa</h2>

					<TaskForm 
						taskId={ taskId } 
						action='edition'
						buttonSubmit='Salvar alterações' 
						buttonExit='Voltar'
						onClickExit={ changeState }
					/>
				</div>
			) }		
		</div>
	);
};