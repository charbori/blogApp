import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class Logs extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: '1',
            content: ''
        };
        this.handleShowList = this.handleShowList.bind(this);
    }

    handleShowList(event) {
        this.setState({ content: event.target.id });
    }

    render () {
        return (
            <div>
                <ul>
                    <li>로그 생성된 프로그램</li>
                    <li>로그 내용</li>
                </ul>
            </div>
        );
    }
}

export default Logs;
