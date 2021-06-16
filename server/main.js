import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { TasksCollection } from '../imports/db/TasksCollection';
import '../imports/api/TasksMetods';
import '../imports/api/TasksPublications';
import '../imports/api/UserMethods';



const insertTask = (taskText, user) => 
  TasksCollection.insert({ 
    text: taskText,
    userId: user._id,
    createdAt: new Date(), 
  });


Meteor.startup(() => {
  //const user = Accounts.findUserByUsername(SEED_USERNAME);
});