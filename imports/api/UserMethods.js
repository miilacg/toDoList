import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

import { UserCollection } from '../db/UserCollection';



Meteor.methods ({
	'users.insert'(username, password) {
		check(username, String);
		check(password, String);

		console.log(username);
		if(!Accounts.findUserByUsername(username)) {
			Accounts.createUser({
				username: username,
				password: password,
			});
		} else {
			throw new Meteor.Error('Usuario já existe');
		}
	}	
})