import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';


Meteor.publish('tasks', function publishTasks() { // não pode usar o => pq ta usando o this dentro da função
	return TasksCollection.find({ $or: [{ isParticular: false }, { userId: this.userId }] });
});