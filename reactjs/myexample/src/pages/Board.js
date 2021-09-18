import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Prepare } from '@/pages';
import { BoardList } from '@/components';

class Board extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: "jaehyeok",
            user_data: {
                name: "test",
                id: "cjh93"
            },
            post_data: {
                time: "6 hour ago",
                rate: "1|1|1",
                action: "Join",
                like: 1200
            },
            content_data: {
                detail: "detail",
                src: "",
                comment_count: 0,
                type: false
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit (event) {
        this.props.history.push({
            pathname: "/prepare",
            state: {id: this.state.id}
        });
    }
    
    render () {
        return (
            <>
                <BoardList user_data={this.state.user_data} post_data={this.state.post_data} content_data={this.state.content_data}/>
            </>
        );
    }
}

export default Board;
