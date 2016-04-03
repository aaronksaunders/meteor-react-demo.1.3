/**
 * Session component - represents a single Session item
 */
import React, {Component, PropTypes} from 'react';
import AuthErrors from './AuthErrors.jsx';
import {Meteor} from 'meteor/meteor';

export default class SessionNew extends Component {
    constructor(props) {
        super(props);
        this.state = {errors: {}};
    }

    /**
     * called to save the object to the Session Collection
     * @param event
     */
    onSubmit(event) {
        event.preventDefault();

        var title = $(event.target).find("[name=title]").val();
        var description = $(event.target).find("[name=description]").val();

        var errors = {};
        var that = this;


        !title && (errors.title = "Title required");

        !description && (errors.description = "Description required");

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        Meteor.call('sessions.insert', {
            title: title,
            description: description
        }, function (error, result) {
            if (error) {
                that.setState({
                    errors:  {
                        Insert : "Error Trying to Insert New Object: " + error.error
                    }
                });
            } else {
                FlowRouter.go('Home');
            }
        });

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Add New Session</h1>

                        <form onSubmit={this.onSubmit.bind(this)} ref="inputForm">
                            <AuthErrors errors={this.state.errors}/>

                            <div>
                                <label htmlFor="title" className="control-label">Title</label>
                                <input type="text" id="title" name="title" className="form-control"
                                       placeholder="Title"
                                       autofocus/>
                            </div>
                            <div>
                                <label htmlFor="description" className="control-label">Description</label>
                                <input type="text" id="description" name="description" className="form-control"
                                       placeholder="Description"/>
                            </div>

                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}