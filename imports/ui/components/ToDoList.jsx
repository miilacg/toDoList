import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente
import { createBrowserHistory } from "history";

import { TasksCollection } from '../../db/TasksCollection';

import { Header } from './Header';
import { LoginForm } from './LoginForm';
import { Task } from './Task';
import { TaskForm } from './TaskForm';



const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);




export const ToDoList = () => {
  const history = createBrowserHistory();

  const user = useTracker(() => Meteor.user()); //obtem o usuário autenticado ou nulo

  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } }; // o $ é usado para consultas quando envolver comparação de não igual ou igual sim
  const userFilter = user ? { userId: user._id} : {}; // filtra as tarefas pelo id do usuario
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter, {
        sort: { createdAt: -1 },
      }
    ).fetch();

    // Conta quantos itens não foram feitos
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${ pendingTasksCount ? `(${ pendingTasksCount })` : '' }`;

  const logout = () => Meteor.logout();


  return(
    <div className='app'>
      { history.location.pathname == '/' ? ( 
				<Header pendingTasksTitle={ pendingTasksTitle }/> 
			) : (
				''
			) }      

      <div className='main'>
        { user ? (
          <>
            <div className='user' onClick={ logout }>
              { user.username } 🚪
            </div>
            
            <TaskForm />

            <div className='filter'>
              <button onClick={ () => setHideCompleted(!hideCompleted) }>
                { hideCompleted ? 'Show All' : 'Hide Completed' }
              </button>          
            </div>

            { isLoading && <div className='loading'>loading...</div> }

            <ul className='tasks'>
              { tasks.map(task => (
                <Task 
                  key={ task._id } 
                  task={ task }
                  onCheckboxClick={ toggleChecked }
                  onDeleteClick={ deleteTask }
                />
              )) }
            </ul>
          </>
        ) : (
          <LoginForm />
        )}    
      </div>      
    </div>
  );
};