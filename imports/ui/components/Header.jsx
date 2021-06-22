import React from "react";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';



export function Header({ createUser, pendingTasksTitle, user, handleOpen }) {
  return (		
		<header className='app-bar'>
			<div className='app-header'>
				<Link to="/">
					<h1>📝️ To do list { pendingTasksTitle }</h1>
				</Link>

				{ createUser ? ( // Se for a página de login		
					<Link to={ createUser }>Criar conta</Link>
				) : (
					user ? ( // Páginas dentro do to do list		
						<Button className='user' onClick={ handleOpen }>
							{ user.username } 🚪
						</Button>
					) : ( // Se for qualquer outra página
						''					
					)					
				) }    
			</div>
		</header>
	);
}