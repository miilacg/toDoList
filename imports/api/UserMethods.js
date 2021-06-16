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
	
	'users.edit'(userId, username, password) {
		check(userId, String);
		check(username, String);
		check(password, String);
		
		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		const user = Meteor.users.findOne({ _id: userId });
		if(user.username != username){
			if(!Accounts.findUserByUsername(username)) {
				Meteor.users.update({ _id: userId }, {
					$set: {
						username: username,
						password: password, 
					},
				});
			} else {
				throw new Meteor.Error('Usuario já existe');
			}	
		} else { // se o username for igual ao user não precisa alterar
			Meteor.users.update({ _id: userId }, {
				$set: {
					password: password, 
				},
			});
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