import React from "react";



export function Header({ createUser, pendingTasksTitle }) {
  return (		
		<header className='app-bar'>
			<div className='app-header'>
				<a href="/">
					<h1>📝️ To do list { pendingTasksTitle }</h1>
				</a>

				{ createUser ? ( // Se for a página de login		
					<a href={ createUser }>Criar conta</a>
				) : ( // Se for qualquer outra página
					''					
				)}    
			</div>
		</header>
	);
}