import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente
import { useHistory } from "react-router-dom";
import { List, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TasksCollection } from '../../db/TasksCollection';

import { CreateTask } from '../components/CreateTask';
import { Header } from '../components/Header';
import { Task } from '../components/Task';



const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call('tasks.setIsChecked', _id, !isChecked);
}

const deleteTask = ({ _id }) => {
  Meteor.call('tasks.remove', _id);
}

function deleteUser(_id) {
  Meteor.call('users.remove', _id);
}

const useStyles = makeStyles((theme) => ({
	paper: {
    position: 'absolute',
    width: 400,
		top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
		borderRadius: '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 1.5),
  },
}));


export const ToDoList = () => {
  let history = useHistory();
  
  const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Header pendingTasksTitle={ pendingTasksTitle } user={ user } handleOpen={ handleOpen } />     	  

      <div className='main'>            
        <>   
          <Modal
            open={ open }
            onClose={ handleClose }
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={ classes.paper }>    
              <div className="modal-header">
                <h4 className="modal-title">Escolha uma opção</h4>
                <button type="button" className="close" onClick={ handleClose } label="Fechar">
                  <span>&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <h5>
                  <a href="/editUser">Editar usuário</a>
                </h5>
                <h5 label="Excluir usuário" onClick={ () => deleteUser(user._id) }>Excluir usuário</h5>
                <h5 label="Sair" onClick={ logout }>Sair</h5>                    
              </div>
            </div>
          </Modal>	

          <CreateTask />

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