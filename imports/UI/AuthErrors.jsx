import React, {Component, PropTypes} from 'react';

export default class AuthErrors extends Component {

    render() {
        var str = [];

        if (!_.isEmpty(this.props.errors)) {
            _.forEach(this.props.errors, function (_i) {
                str.push(_i);
            })

            return  (
                <ul className="list-group">
                    <li className="list-group-item alert alert-danger">{str.join(", ")}</li>
                </ul>
            );
        } else {
            return (<span></span>);
        }
    }
};


AuthErrors.propTypes = {
    errors: PropTypes.object
};



