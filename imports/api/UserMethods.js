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
	
	'users.edit'(username, password, email, date, gender, company) {
		check(username, String);
		check(password, String);
		check(email, String);
		check(date, String);
		check(gender, String);
		check(company, String);		

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		const user = Meteor.users.findOne({ _id: this.userId });

		if(user.username != username){
			if(!Accounts.findUserByUsername(username)) {
				Meteor.users.update({ _id: this.userId }, {
					$set: {
						username: username,
						email: email,
						date: date,
						gender: gender,
						company: company, 
					},
				});
				Accounts.setPassword(this.userId, password);
			} else {
				throw new Meteor.Error('Usuário já existe');
			}	
		} else { // se o username for igual ao user não precisa alterar			
			Meteor.users.update({ _id: this.userId }, {
				$set: {
					email: email,
					date: date,
					gender: gender,
					company: company, 
				},
			});
			Accounts.setPassword(this.userId, password);
		}			
	},
	
	'users.remove'(userId) {
		check(userId, String);

		if (!this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		Meteor.users.remove({ _id: userId });
		TasksCollection.remove({ userId: userId });
	}
})