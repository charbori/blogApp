import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import { Comment, Shared, Settings } from '@/components/buttons';
import { BoardContent, Post } from '@/components';
import "./BoardList.css";

class BoardList extends Component {
    constructor (props) {
        super (props);
        this.state = {
            user_data: props.user_data,
            post_data: props.post_data,
            content_data: props.content_data
        }

        if (typeof content_data == 'undefined' || Object.keys(content_data).includes('type')) {
            this.state.content_data = {};
            this.state.content_data.type = "detail";
            this.state.content_data.src = 'src';
        }
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
        console.log(this.state.user_data);
        console.log(this.state.post_data);
        console.log(this.state.content_data);
        var { time, like, rate, action } = this.state.post_data;
        var type = this.state.content_data.type;
        var detail = this.state.content_data.detail;
        var { id, name } = this.state.user_data;
        let button_action;
        let data = { comment_count : 10 };
        // test datas
        if (action == 'Join')   button_action = <span>Join</span>;
        else    button_action = <span>{id}</span>
        return (
            <div className="shadow card">
                <div className="board-body">
                    <Row>
                        <Col id="promote_like" md="1" xs="1">
                            <Row>
                                <i className="fa fa-sort-asc" aria-hidden="true"></i>
                            </Row>
                            <Row>
                                <span>{like}30</span>
                            </Row>
                            <Row>
                                <i className="fa fa-sort-desc" aria-hidden="true"></i>
                            </Row>
                        </Col>
                        <Col id="content_body" md="10" xs="10">
                            <div id="content_state" className="justify-content-center row">
                                <div className="col-10">
                                    <div id="user_detail">
                                        <span className="mr-1 ft-text-md" id="user_name">{name}</span>
                                        <span className="mr-1 ft-text-sm" id="post_time">{time}</span>
                                        <span className="mr-1 ft-text-sm" id="post_rate">{rate}</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="badge badge-success badge-pill" id="post_action">
                                        {button_action}
                                    </div>
                                </div>
                            </div>
                            <div id="content_detail" className="description">
                                <BoardContent src={detail} type={type} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="board_interaction">
                            <Comment count={data.comment_count}/>
                            <Shared />
                            <Settings />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default BoardList;
