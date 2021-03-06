import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';



Meteor.methods ({
	'tasks.insert'(date, titleTask, description, isParticular) {
		check(date, String); // o check é usado apra verificar se o valor recebido é do tipo esperado
		check(titleTask, String);
		check(description, String);
		check(isParticular, Boolean);

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		TasksCollection.insert({
			date,
			titleTask,
			description,
			situation: 'Cadastrada',
			isParticular,
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

	'tasks.setSituation'(taskId, situation) {
		check(taskId, String);
		check(situation, String);

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
				situation
			},
		});
	},
	
	'tasks.edit'(taskId, date, description, situation, titleTask, isParticular) {
		check(taskId, String);
		check(date, String);
		check(titleTask, String);
		check(description, String);
		check(situation, String);
		check(isParticular, Boolean);

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
				date: date,
				titleTask: titleTask,
				description: description,
				situation: situation,
				isParticular: isParticular,
			},
		});
	},
});