import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class Prepare extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: props.match.params.id,
            content: ''
        };
        this.handleChangeHome = this.handleChangeHome.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
    }

    handleChangeHome(event) {
        this.setState({ value: event.target.value });
        event.preventDefault();
        history.push('/Board');
    }
    handleChangeTask(event) {
        this.setState({ value: event.target.value });
        event.preventDefault();
        history.push('/TaskList');
    }

    render () {
        return (
            <form>
                <div>
                    <ul>
                        <li>요청이 완료되었습니다.</li>
                        <li>요청이 수락되면 대화창이 활성화됩니다!</li>
                    </ul>
                </div>
                <button value="홈으로" onChange={this.handleChangeHome}/>
                <button value="TASK 목록" onChange={this.handleChangeTask}/>
            </form>
        );
    }
}

export default Prepare;
