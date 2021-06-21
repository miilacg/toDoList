import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente
import { useHistory } from "react-router-dom";
import { List } from '@material-ui/core';

import { TasksCollection } from '../../db/TasksCollection';

import { Header } from '../components/Header';
import { Task } from '../components/Task';
import { TaskForm } from '../components/TaskForm';



const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
}

const deleteTask = ({ _id }) => {
  Meteor.call('tasks.remove', _id);
}

function deleteUser(_id) {
  Meteor.call('users.remove', _id);
}

export const ToDoList = () => {
  let history = useHistory();
  
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

  const logout = () => {
    history.push('/');
    Meteor.logout();    
  }
  
  return(
    <div className='app'>      
      <Header pendingTasksTitle={ pendingTasksTitle } user={ user }  />     	  

      <div className='main'>            
        <>   
          <div className="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Escolha uma opção</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <h5>
                    <a href="/editUser">Editar usuário</a>
                  </h5>
                  <h5 data-dismiss="modal" aria-label="Excluir usuário" onClick={ () => deleteUser(user._id) }>Excluir usuário</h5>
                  <h5 data-dismiss="modal" aria-label="Sair" onClick={ logout }>Sair</h5>                    
                </div>
              </div>
            </div>
          </div> 

          <TaskForm />

          <div className='filter'>
            { <button onClick={ () => setHideCompleted(!hideCompleted) }>
              { hideCompleted ? 'Show All' : 'Hide Completed' }
            </button> } 
          </div>

          { isLoading && <div className='loading'>loading...</div> }

          <List className='tasks'>
            { tasks.map(task => (
              <Task 
                key={ task._id } 
                task={ task }
                user={ user.username }
                onCheckboxClick={ toggleChecked }
                onDeleteClick={ deleteTask }
              />
            )) }
          </List>
        </>    
      </div>      
    </div>
  );
};