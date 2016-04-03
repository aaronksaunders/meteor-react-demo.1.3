// Define a collection to hold our tasks
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Sessions = new Mongo.Collection("sessions");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('sessions', function sessionsPublication() {
        return Sessions.find();
    });
}

Meteor.methods({
    'sessions.insert'(_sessionData) {
        check(_sessionData.title, String);
        check(_sessionData.description, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Sessions.insert({
            title: _sessionData.title,
            description: _sessionData.description,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    'sessions.remove'(_sessionId) {
        check(_sessionId, String);

        const session = Sessions.findOne(_sessionId);
        if (session.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Sessions.remove(_sessionId);
    }
});