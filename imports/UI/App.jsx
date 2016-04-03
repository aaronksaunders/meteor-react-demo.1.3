import React, { Component, PropTypes } from 'react';

import SessionList from './SessionList.jsx';

import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// App component - represents the whole app
class App extends Component {
    getSessions() {
        return [
            {_id: 1, title: 'This is task 1', description: 'Task One Description'},
            {_id: 2, title: 'This is task 2', description: 'Task Two Description'}
        ];
    }

    renderList () {
        
        return ( <SessionList user={this.props.currentUser} ref={'sessionList'}/> );
    }

    render() {

        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="text-center">This is the Home Component</h1>
                        <p className="text-center">The fun starts here</p>
                    </div>
                </div>

                { this.renderList() }

                <div className="container">
                    <a className="btn btn-default btn-lg pull-right" href="/create-session">Add New Session</a>
                </div>
            </div>
        )
    }
}


export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, App);