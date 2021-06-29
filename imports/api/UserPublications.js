import { Meteor } from 'meteor/meteor';


Meteor.publish('allUsers', function publishUsers() {
	return Meteor.users.find({}, { fields: { username: 1 }});
});