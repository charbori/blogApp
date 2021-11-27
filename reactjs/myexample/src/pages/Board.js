import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Card, Button } from "reactstrap";
import { Prepare } from '@/pages';
import { BoardList, Editor } from '@/components';
import "@/assets/css/board.css";
import { Config } from '@/admin/config';

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
                detail: "detail",
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
    render () {
        const { history, match, location } = this.props;
        let show_menu = 'board';
        let contents = '';

        // menu action name
        if (Object.keys(this.props.match.params).includes('action') && this.props.match.params.action.length > 0) {
            const menu = this.props.match.params.action;
            switch (menu) {
                case 'edit':
                    show_menu = 'edit';
                    contents = <Editor></Editor>;
                    break;
            }
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
