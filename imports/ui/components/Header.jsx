import React from "react";



export function Header({ createUser, pendingTasksTitle }) {
  return (
		<header className='app-bar'>
			<div className='app-header'>  
				<a href="/">
					<h1>📝️ To do list{ pendingTasksTitle }</h1>
				</a>

				{ pendingTasksTitle ? (
					''
				) : (
					createUser ? (
						''
					) : (
						<a href="/createUser">Criar conta</a>
					)					
				)}    
			</div>
		</header>
	);
}