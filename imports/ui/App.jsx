import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';
import { CreateUserForm } from './CreateUserForm';



export default function App() {
	const history = createBrowserHistory();

  return (
		<div className='app'>
			{ console.log(history.location.pathname) }
			{ history.location.pathname == '/createUser' ? ( 
				<Header createUser='creteUser' /> 
			) : (
				''
			) }
			

			<div className='main'>
				<Router>
					<Switch>
						<Route path="/">
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