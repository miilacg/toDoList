import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; 

import Card from '@material-ui/core/Card';

import { TasksCollection } from '../../db/TasksCollection';

import { CreateTask } from '../components/CreateTask';
import { Menu } from '../components/Menu';



export function Dashboard(){
	const [openCreateTask, setOpenCreateTask] = useState(false);
	const user = useTracker(() => Meteor.user());

	const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };

	const { tasksCount,  pendingTasksCount, completedTasksCount, progressTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasksCount = TasksCollection.find({ userId: user._id }).count();
    const pendingTasksCount = TasksCollection.find({ userId: user._id, situation: 'Cadastrada' }).count();
		const completedTasksCount = TasksCollection.find({ userId: user._id, situation: 'Concluido' }).count();
		const progressTasksCount = TasksCollection.find({ userId: user._id, situation: 'Em andamento' }).count();

    return { tasksCount, pendingTasksCount, completedTasksCount, progressTasksCount };
  });

	const tasksAmount = tasksCount ? tasksCount : '0'; 
	const pendingTasksAmount = pendingTasksCount ? pendingTasksCount : '0'; 
	const completedTasksAmount = completedTasksCount ? completedTasksCount : '0'; 
	const progressTasksAmount = progressTasksCount ? progressTasksCount : '0'; 

	return (
		<div className='app'>   
      { user ? (
        <>
          <Menu user={ user } />     	  

          <div className='main dashboard'> 
						<h2>dashboard</h2> 

						<div className='cards'>
							<Card className='card'>		
								<h5> Total de tarefas </h5>
								<h3> { tasksAmount } </h3>	
							</Card>	

							<Card className='card'>
								<h5> Total de tarefas <br /> a fazer </h5>
								<h3> { pendingTasksAmount } </h3>									
							</Card>	
						</div>
						
						<div className='cards'>
							<Card className='card'>		
								<h5> Total de tarefas em andamento </h5>
								<h3> { completedTasksAmount } </h3>	
							</Card>	

							<Card className='card'>
								<h5> Total de tarefas concluidas </h5>
								<h3> { progressTasksAmount } </h3>									
							</Card>	
						</div> 

						<div className='cards buttons'>
							<Card className='card'>		
								<button onClick={ handleOpenCreateTask }>
									<h5> Adicionar nova tarefa </h5>
								</button>
							</Card>	

							{ openCreateTask ? ( <CreateTask setOpenCreateTask={ setOpenCreateTask }/> ) : '' }

							<Card className='card'>
								<button>
									<h5> <Link to='/toDoList'> Visualizar tarefas </Link> </h5>
								</button>
							</Card>	
						</div>    
          </div>
        </>
      ) : (
        <div className='loading'>loading...</div>
      ) }      
    </div>
	)
}