import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

import { TasksCollection } from '../db/TasksCollection';



Meteor.methods ({
	'users.insert'(username, password) {
		check(username, String);
		check(password, String);

		if(!Accounts.findUserByUsername(username)) {
			Accounts.createUser({
				username: username,
				password: password,
			});
		} else {
			throw new Meteor.Error('Usuario já existe');
		}
	},
	
	'users.remove'(userId) {
		check(userId, String);

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		Meteor.users.remove({ _id: userId });
		TasksCollection.remove({ userId: userId});
	}
})