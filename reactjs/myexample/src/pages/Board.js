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
    componentDidMount () {
        fetch ('/api/board/post', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({
                user_data: data.data.user_data,
                post_data: data.data.post_data,
                content_data: data.data.content_data
            });
        });
        /*
        const post_test = {
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
                detail: "detail"
            }
        };
        */
    }
    render () {
        const { user_data, post_data, content_data } = this.state;
        return (
            <>
                <BoardList user_data={user_data} post_data={post_data} content_data={content_data}/>
            </>
        );
    }
}

export default Board;
