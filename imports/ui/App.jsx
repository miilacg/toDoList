import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { CreateUserForm } from './components/CreateUserForm';
import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';



export default function App() {
	const history = createBrowserHistory();

  return (
		<div className='app'>
			{ history.location.pathname != '/' ? ( 
				<Header /> 
			) : (
				''
			) }			

			<div className='main'>
				<Router>
					<Switch>
						<Route path="/" exact>
							<ToDoList />
						</Route>

						<Route path="/createUser">
							<CreateUserForm />
						</Route>					
					</Switch>
				</Router>
			</div>
		</div>
  );
}