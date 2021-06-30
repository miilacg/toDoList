import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente

import { 
	Button,
	FormControl,
  List,
	InputLabel,
	Select,
	MenuItem	
} from '@material-ui/core';

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
  const user = useTracker(() => Meteor.user()); //obtem o usuário autenticado ou nulo

	const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };


  const [filterResponsable, setFilterResponsable] = useState('all');

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
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
      filterResponsable === 'all' ? (
        { $or: [{ isParticular: false }, { userId: user._id }] }
      ) : { userId: user._id }, {
        sort: { createdAt: -1 }
      }
    ).fetch();

    return { tasks };
  });
  

  return(
    <div className='app'>   
      { user ? (
        <>
          <Menu user={ user } />     	  

          <div className='main'>            
            <>   
              <Button className='newTask' onClick={ handleOpenCreateTask }>
                <AddCircleOutlineIcon />	Adicionar nova tarefa
              </Button>	

              { openCreateTask ? ( <CreateTask setOpenCreateTask={ setOpenCreateTask }/> ) : '' }

              <h2>lista de tarefas</h2>               

              <div className='filter'>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Responsável</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={ filterResponsable }
                    onChange={ (e) => setFilterResponsable(e.target.value) }
                  >
                    <MenuItem value='my'>Eu</MenuItem>
                    <MenuItem value='all'>Qualquer um</MenuItem>
                  </Select>
                </FormControl>
              </div>
 
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