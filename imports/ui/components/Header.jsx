import React from "react";
import { Link } from 'react-router-dom';



export function Header({ createUser, pendingTasksTitle }) {
  return (		
		<header className='app-bar'>
			<div className='app-header'>
				<Link to="/">
					<h1>📝️ To do list { pendingTasksTitle }</h1>
				</Link>

				{ createUser ? ( // Se for a página de login		
					<Link to={ createUser }>Criar conta</Link>
				) : ( // Se for qualquer outra página
					''					
				)}    
			</div>
		</header>
	);
}