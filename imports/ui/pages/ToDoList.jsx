import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { TasksCollection } from '../../db/TasksCollection';

import { CreateTask } from '../components/CreateTask';
import { Menu } from '../components/Menu';
import { Task } from '../components/Task';

import '../../../client/styles/toDoList.scss';



const deleteTask = ({ _id }) => {
  Meteor.call('tasks.remove', _id);
}


export const ToDoList = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false);

	const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };

  const user = useTracker(() => Meteor.user()); //obtem o usuário autenticado ou nulo

  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } }; // o $ é usado para consultas quando envolver comparação de não igual ou igual sim
  const userFilter = user ? { userId: user._id } : {}; // filtra as tarefas pelo id do usuario ou se ela não for particular
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

    const handlerUser = Meteor.subscribe('allUsers');
    if (!handlerUser.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : { $or: [{ isParticular: false }, { userId: user._id }] }, {
        sort: { createdAt: -1 },
      }
    ).fetch();

    // Conta quantos itens não foram feitos
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };
  });
  
  const pendingTasksTitle = `${ pendingTasksCount ? `(${ pendingTasksCount })` : '' }`;  
  
  return(
    <div className='app'>   
      { user ? (
        <>
          <Menu pendingTasksTitle={ pendingTasksTitle } user={ user } />     	  

          <div className='main'>            
            <>   
              <h2>lista de tarefas</h2> 

              <Button className='newTask' onClick={ handleOpenCreateTask }>
                <AddCircleOutlineIcon />	Adicionar nova tarefa
              </Button>	

              { openCreateTask ? ( <CreateTask setOpenCreateTask={ setOpenCreateTask }/> ) : '' }
 
              { isLoading && <div className='loading'>loading...</div> }

              <List className='tasks'>
                { tasks.map(task => ( 
                  <Task 
                    key={ task._id } 
                    task={ task }
                    user={ Meteor.users.findOne({ _id: task.userId }) }
                    situation={ task.situation }
                    onDeleteClick={ deleteTask }
                  />
                )) }
              </List>
            </>    
          </div>
        </>
      ) : (
        <div className='loading'>loading...</div>
      ) }      
    </div>
  );
};