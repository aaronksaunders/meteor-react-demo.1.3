import React, { Component, PropTypes } from 'react';
import { Sessions } from '../api/sessions.js';
import Session from './Session.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class SessionList extends Component {

    constructor(props) {
        super(props);
        this.state = {user: props.user};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }

    componentDidMount() {
        console.log("mounted");
    }
    
    renderSessions() {
        // Get tasks from this.data.tasks
        return this.props.sessions.map((_session) => {
            const currentUserId = this.props.user && this.props.user._id;

            return <Session
                key={_session._id}
                session={_session}/>;
        });
    }


    render() {
        return (
            <div className="container">
                <table className="table">
                    <tbody>
                    { this.props.user && this.renderSessions() }
                    </tbody>
                </table>
            </div>
        )
    }
}

SessionList.propTypes = {
    user: React.PropTypes.object
};


export default createContainer(() => {
    Meteor.subscribe('sessions');
    return {
        sessions: Sessions.find({}, { sort: { createdAt: -1 } }).fetch()
    };
}, SessionList);