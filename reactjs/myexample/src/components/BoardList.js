import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import { Comment, Shared, Settings } from '@/components/buttons';
import { BoardContent, Post } from '@/components';
import "./BoardList.css";
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class BoardList extends Component {
    constructor (props) {
        super (props);
        this.state = {
            user_data: props.user_data,
            post_data: '',
            content_data: props.content_data,
            auth: ''
        }

        if (typeof content_data == 'undefined' || Object.keys(content_data).includes('type')) {
            this.state.content_data = {};
            this.state.content_data.type = "detail";
            this.state.content_data.src = 'src';
        }
    }

    // login popup > return
    handleLogin (resultAuth) {
        this.setState({ auth: resultAuth });
    }

    componentDidMount () {
        fetch (NODE_SERVER + 'board/post', {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            console.log(data);
            this.setState({
                post_data: data.data
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
        var post_list = '';
        if (this.state.post_data == '') {
            post_list = this.state.post_data;
        } else {
            post_list = this.state.post_data.map((val) => 
                <div className="shadow card mb-12">
                    <div className="board-body">
                        <Row>
                            <Col md="1" xs="1">
                                <Row>
                                    <Col id="promote_like">
                                        <Row>
                                            <i className="fa fa-sort-asc fa-2x" aria-hidden="true"></i>
                                        </Row>
                                        <Row>
                                            <span class="post_like_content">{val.post_like}</span>
                                        </Row>
                                        <Row>
                                            <i className="fa fa-sort-desc fa-2x" aria-hidden="true"></i>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="10" xs="10">
                                <Row>
                                    <Col id="content_body">
                                        <div id="content_state" className="justify-content-center row">
                                            <div className="col-10">
                                                <div id="user_detail">
                                                    <span className="mr-1 ft-text-sm" id="user_name">
                                                        { val.name == undefined
                                                            ? <>guest</>
                                                            : val.name
                                                        }
                                                    </span>
                                                    <span className="mr-1 ft-text-sm" id="post_time">
                                                        { val.reg_date == undefined
                                                            ? <>최근</>
                                                            : val.reg_date
                                                        }
                                                    </span>
                                                    <span className="mr-1 ft-text-sm" id="post_rate">
                                                        { val.post_rate == undefined
                                                            ? <>not rating</>
                                                            : val.post_rate
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                            </div>
                                        </div>
                                        <div id="content_detail" className="description">
                                            <BoardContent src={val.contents} type={val.post_type} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col id="board_interaction">
                                        <Comment id="board_interaction_content" count={val.comment_count}/>
                                        <Shared id="board_interaction_content"/>
                                        <Settings id="board_interaction_content"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }

        return (
            <>
                {post_list}
            </>
        );
    }
}

export default BoardList;
