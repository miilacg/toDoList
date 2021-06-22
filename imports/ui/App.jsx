import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CreateUserForm } from './pages/CreateUserForm';
import { EditUserForm } from './pages/EditUserForm';
import { EditTask } from './pages/EditTask';
import { LoginForm } from './pages/LoginForm';
import { ToDoList } from './pages/ToDoList';



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

				<Route path="/editTask/:taskId">
					<EditTask />
				</Route>			
			</Switch>
		</Router>
  );
}