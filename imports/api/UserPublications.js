import { Meteor } from 'meteor/meteor';


Meteor.publish('users', function () { 
	return Meteor.users.find({ _id: this.userId });
}); 

Meteor.publish('allUsers', function publishUsers() {
	return Meteor.users.find({}, { fields: { username: 1 }});
});