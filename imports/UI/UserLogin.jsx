import React, {Component, PropTypes} from 'react';
import AuthErrors from './AuthErrors.jsx';

export default class UserLogin extends Component {

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

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        var that = this;

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                that.setState({
                    errors: {'none': err.reason}
                });

                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h1>Login</h1>

                        <form onSubmit={this.onSubmit.bind(this)}>
                            <AuthErrors errors={this.state.errors}/>
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
                            <div className="col-md-6 text-right">
                                <button type="submit" className="btn btn-default">Login</button>
                                <a className="btn btn-default" style={{margin:5}} href="/create-account">Create
                                    Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
