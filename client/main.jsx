
import React from 'react';
import {mount} from 'react-mounter';
// load Layout and Welcome React components
import App from '../imports/UI/App.jsx';
import SessionNew from '../imports/UI/SessionNew.jsx';
import MainHeader from '../imports/UI/MainHeader.jsx';
import UserLogin from '../imports/UI/UserLogin.jsx';
import UserCreateAccount from '../imports/UI/UserCreateAccount.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

// define and export our Layout component
export const Layout = ({content, header, footer}) => (
    <div>
        {header}
        {content}
        {footer}
    </div>
);


FlowRouter.route("/", {
    name: "Home",
    action() {
        renderMainLayoutWith(<App/>)
    }
});

FlowRouter.route("/create-session", {
    name: "CreateSession",
    subscriptions(_params) {

    },
    action() {
        renderMainLayoutWith(<SessionNew/>)
    }
});



FlowRouter.route("/login", {
    name: "Login",
    subscriptions(_params) {

    },
    action(_params) {
        renderMainLayoutWith(<UserLogin />);
    }
});

FlowRouter.route("/create-account", {
    name: "CreateAccount",
    subscriptions(_params) {

    },
    action(_params) {
        renderMainLayoutWith(<UserCreateAccount />);
    }
});




FlowRouter.route("/profile", {
    name: "UserProfile",
    subscriptions(_params) {

    },
    action() {

        //if not logged in the go to login page
        checkLoginStatus();

        renderMainLayoutWith(<UserProfile />);
    }
});

/**
 *
 */
function checkLoginStatus() {
    if (!Meteor.userId()) {
        FlowRouter.go('Login')
    }
}

/**
 *
 * @param component
 */
function renderMainLayoutWith(component) {
    mount(Layout, {
        header: (<MainHeader/>),
        content: component,
        footer: (
            <div className="footer container">
                <div className="footer-content">
                </div>
                <div className="footer-footer">
                </div>
            </div>
        )
    });
}