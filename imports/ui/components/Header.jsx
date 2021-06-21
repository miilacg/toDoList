import React from "react";
import { Link } from 'react-router-dom';



export function Header({ createUser, pendingTasksTitle, user }) {
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
						<button type="button" className='user' data-toggle="modal" data-target="#modalExemplo">
              { user.username } 🚪
            </button>
					) : ( // Se for qualquer outra página
						''					
					)					
				) }    
			</div>
		</header>
	);
}