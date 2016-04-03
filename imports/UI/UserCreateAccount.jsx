
import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import AuthErrors from './AuthErrors.jsx';


export default class UserCreateAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };
    }

    onSubmit(event) {
        event.preventDefault();

        var email = $(event.target).find("[name=email]").val();
        var password = $(event.target).find("[name=password]").val();
        var firstName = $(event.target).find("[name=firstname]").val();
        var lastName = $(event.target).find("[name=lastname]").val();
        var userType = $(event.target).find("[name=usertype]").val();

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        if (!firstName) {
            errors.fname = "First Name Required"
        }

        if (!lastName) {
            errors.lname = "Last Name Required"
        }

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        var profile = {
            firstName: firstName,
            lastName: lastName,
            userType : userType,
            created: new Date()
        };

        var that = this;

        Accounts.createUser({
            username: email,
            email: email,
            password: password,
            profile: profile
        }, (_error) => {
            if (_error) {
                that.setState({
                    errors: {'none': _error.reason}
                });

                return;
            } else {
                FlowRouter.go('Home',{});
            }
        });
    }

    render() {

        let userTypesArray = [{
            name: "Student",
            value: "STUDENT"
        },{
            name: "Tutor",
            value: "TUTOR"
        },{
            name: "Administrator",
            value: "ADMIN"
        }];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Create Account</h1>

                        <form onSubmit={this.onSubmit.bind(this)}>
                            <AuthErrors errors={this.state.errors}/>

                            <div>
                                <label htmlFor="FirstName" className="control-label">First Name</label>
                                <input type="text" id="FirstName" name="firstname" className="form-control"
                                       placeholder="First Name"
                                       autofocus/>
                            </div>
                            <div>
                                <label htmlFor="LastName" className="control-label">Last Name</label>
                                <input type="text" id="LastName" name="lastname" className="form-control"
                                       placeholder="Last Name"
                                       autofocus/>
                            </div>
                            <div>
                                <label htmlFor="email" className="control-label">Email address</label>
                                <input type="email" id="email" name="email" className="form-control"
                                       placeholder="Email address"
                                       autofocus/>
                            </div>

                            <div>
                                <label htmlFor="password" className="control-label">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password"
                                />
                            </div>

                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};