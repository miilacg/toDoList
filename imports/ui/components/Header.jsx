import React from "react";



export function Header({ createUser, pendingTasksTitle }) {
  return (
		<header className='app-bar'>
			<div className='app-header'>  	
				{ pendingTasksTitle ? ( // Se tiver na página de to do list
					pendingTasksTitle == 0 ? ( 
						<a href="/">
							<h1>📝️ To do list</h1>
						</a>
					) : (
						<a href="/">
							<h1>📝️ To do list { pendingTasksTitle }</h1>
						</a>
					)
				) : (
					createUser ? ( // Se for a página de login
						<>
							<a href="/">
								<h1>📝️ To do list</h1>
							</a>

							<a href="/createUser">Criar conta</a>
						</>
					) : ( // Se for qualquer outra página
						<a href="/">
							<h1>📝️ To do list</h1>
						</a>
					)					
				)}    
			</div>
		</header>
	);
}