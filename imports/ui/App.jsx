import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CreateUserForm } from './components/CreateUserForm';
import { EditUserForm } from './components/EditUserForm';
import { LoginForm } from './components/LoginForm';
import { ToDoList } from './components/ToDoList';



export default function App() {
  return (		
		<Router>
			<Switch>
				<Route path="/" exact>
					<LoginForm />
				</Route>

				<Route path="/createUser">
					<CreateUserForm />
				</Route>

				<Route path="/editUser">
					<EditUserForm />
				</Route>		

				<Route path="/toDoList">
					<ToDoList />
				</Route>				
			</Switch>
		</Router>
  );
}