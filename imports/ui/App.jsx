import React from 'react';
import { useTracker } from 'meteor/react-meteor-data'; //cada vez que os dados mudam por meio de reatividade, o componente será renderizado novamente

import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';



export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return(
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        { tasks.map(task => 
          <Task key={ task._id } task={ task }/>
        ) }
      </ul>
    </div>
  );
};