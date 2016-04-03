import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class MainHeader extends Component {

    handleLogout() {
        Meteor.logout();
        FlowRouter.go("/");
    }

    render() {
        let loginButton;


        if (this.props.currentUser) {
            loginButton = (
                <li><a href="#" onClick={this.handleLogout}>Logout - {this.props.currentUser.username}</a></li>
            )
        } else {
            loginButton = (
                <li><a href="/login">Login</a></li>
            )
        }

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">React Meteor Demo - Tutor Management</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/">Home</a></li>
                            <li><a href="/session">Session</a></li>
                            <li><a href="/profile">Profile</a></li>
                            {loginButton}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, MainHeader);