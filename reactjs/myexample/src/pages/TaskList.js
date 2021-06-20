import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class TaskList extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: props.match.params.id,
            desc: props.match.params.desc
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render () {
        return (
            <div>
                <ul>
                    <li>task1{this.state.id}</li>
                    <li>task desc : {this.state.desc}</li>
                </ul>
            </div>
        );
    }
}

export default TaskList;
