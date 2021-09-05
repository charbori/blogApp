import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import { Comment, Shared, Settings } from '@/components/buttons';
import { BoardContent, Post } from '@/components';
import "./BoardList.css";

const BoardList = (user_data, post_data, content_data) => {
    if (typeof content_data == 'undefined' || Object.keys(content_data).includes('type')) {
        content_data = {};
        content_data.type = "detail";
        content_data.src = 'src';
    }
    const { time, like, rate, action } = post_data;
    const type = content_data.type;
    const detail = content_data.detail;
    const { id, name } = user_data;
    let button_action;
    let data = { comment_count : 10 };
    // test datas
    if (action == 'Join')   button_action = <span>Join</span>;
    else    button_action = <span>test</span>

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
};

export default BoardList;
