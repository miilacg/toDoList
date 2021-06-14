import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';



Meteor.methods ({
	'tasks.insert'(text) {
		check(text, String); // o check é usado apra verificar se o valor recebido é do tipo esperado

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		TasksCollection.insert({
			text,
			createdAt: new Date,
			userId: this.userId,
		});
	},

	'tasks.remove'(taskId) {
		check(taskId, String);

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		// verificando a permissão do usuario
		const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

		if(!task) {
			throw new Meteor.Error('Access denied.');
		}

		TasksCollection.remove(taskId);
	},

	'tasks.setIsChecked'(taskId, isChecked) {
		check(taskId, String);
		check(isChecked, Boolean);

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		// verificando a permissão do usuario
		const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

		if(!task) {
			throw new Meteor.Error('Access denied.');
		}

		TasksCollection.update(taskId, {
			$set: {
				isChecked
			},
		});
	},
});