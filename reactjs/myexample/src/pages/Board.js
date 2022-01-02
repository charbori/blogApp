import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Card, Button } from "reactstrap";
import { Prepare } from '@/pages';
import { BoardList, Editor } from '@/components';
import "@/assets/css/board.css";
import { Config } from '@/admin/config';
import { setCookie, getCookie } from '@/admin/cookie';

const NODE_SERVER = Config.NODE_SERVER;

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
                detail: "",
                src: "",
                comment_count: 0,
                type: false
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event) {
        this.setState({ value: event.target.value });
    }
    componentDidMount () {
        var post_idx = '';

        if (Object.keys(this.props.match.params).includes('post_Eidx') && this.props.match.params.post_Eidx.length > 0) {
            const menu = this.props.match.params.post_Eidx;
            post_idx = this.props.match.params.post_Eidx;
        } else {
            post_idx = this.props.match.params.view;
        }

        fetch (NODE_SERVER + 'board/post?post_idx=' + post_idx, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({
                post_data: data.data
            });
        });
    }
    render () {
        const { history, match, location } = this.props;
        let show_menu = 'board';
        let contents = '';
        // menu action name
        if (Object.keys(this.props.match.params).includes('action') && this.props.match.params.action.length > 0) {
            const menu = this.props.match.params.action;
            if (menu == 'edit') {
                show_menu = 'edit';
                if (typeof this.props.match.params.post_idx == 'undefined') {
                    contents = <Editor></Editor>;
                }
            }
        }

        if (Object.keys(this.props.match.params).includes('post_Eidx') && this.props.match.params.post_Eidx.length > 0) {
            const menu = this.props.match.params.post_Eidx;
            show_menu = 'edit';
            contents = <Editor post_idx={menu} post_data={this.state.content_data.detail}></Editor>;
        }

        return (
            <>
                {show_menu == 'board' &&
                    <>
                        <Card className="board_insert text-center">
                            <Button onClick={() => { this.props.history.push('/board/post/edit')}}>(+) ADD POST</Button>
                        </Card>
                        <BoardList history={history}
                            match={match}
                            location={location}
                            user_data={this.state.user_data}
                            post_data={this.state.post_data} 
                            content_data={this.state.content_data}/>
                    </>
                }
                {show_menu == 'edit' &&
                    <>
                        {contents}
                    </>
                }
            </>
        );
    }
}

export default Board;