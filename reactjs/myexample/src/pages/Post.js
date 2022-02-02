import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Config } from '@/admin/config';
import { Comment, Shared, Settings } from '@/components/buttons';
import { LoginPopup } from "@/components";
import DemoNavbar from "@/components/Navbars/DemoNavbar.js";
import SimpleFooter from "@/components/Footers/SimpleFooter.js";
import { setCookie, getCookie, removeCookie } from '@/admin/cookie';
import { BoardContent, Reply} from '@/components';

//css load
import { Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.min.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";
import "@/pages/Home.css";
import "@/assets/css/board.css";

const NODE_SERVER = Config.NODE_SERVER;

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '',
            post_data: '',
            user_id: '',
            post_idx : this.props.match.params.view,
        }
        this.handleChange = this.handleChange.bind(this);
        this.likeList = new Map();
    }

    addLikeListRef (type, val) {
        this.likeList.set(type + val, React.createRef());
        return this.likeList.get(type + val);
    }
    
    handleClickLike (post_idx, type, event) {
        if (type == undefined || post_idx == undefined) {
            console.log('error');
            return ;
        }
        if (getCookie('chatApp_user_id') == undefined) {
            this.setState({useModalState : true});
            
            return;
        }

        var cookie_like = getCookie('like_' + post_idx);
        var set_type = '';

        if (cookie_like != undefined) {
            set_type = (cookie_like.substring(0, 7) == type) ? 'add' : 'sub';
            this.likeList.get("c_like_" + post_idx).current.style.color = '#bbbbbb';
            this.likeList.get("c_dislike_" + post_idx).current.style.color = '#bbbbbb';
        } else {
            set_type = (type == 'like') ? 'add' : 'sub';
            if (type == 'like') {
                this.likeList.get("c_like_" + post_idx).current.style.color = '#5e72e4';
            } else {
                this.likeList.get("c_dislike_" + post_idx).current.style.color = '#5e72e4';
            }
        }
        
        if (set_type.length > 0) {
            fetch (NODE_SERVER + 'board/like', { 
                method: "POST",
                body: JSON.stringify({ post_idx: post_idx, type: set_type }),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            .then (response => response.json())
            .then (data => {
                if (data.success == true) {
                    const like_val = this.state.post_data;
                    const like_figure = 1;
                    like_val.forEach (ele => {
                        if (ele.idx == post_idx) {
                            if (cookie_like != undefined) { // 초기화
                                ele.post_like = (cookie_like.substring(0, 7) == type) ? ele.post_like + like_figure : ele.post_like - like_figure;
                                removeCookie("like_" + ele.idx);
                            } else {
                                ele.post_like = (type == 'like') ? ele.post_like + like_figure : ele.post_like - like_figure;
                                setCookie("like_" + ele.idx, type + "_" + ele.post_like, { path: '/' });
                            }
                        }
                    });
                    this.setState({
                        post_data: like_val
                    });
                }
            });
        }
    }

    handleChange = (htmlElement) => {
        this.setState({ text : htmlElement });
    }

    componentDidMount () {
        fetch (NODE_SERVER + 'board/post?post_idx=' + this.props.match.params.view, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            console.log(data);
            this.setState({
                post_data: data.data
            });
        })
        .then(() => {
            var cookie_like = '';
            var temp_like_type = '';
            this.state.post_data.forEach(post_data => {
                cookie_like = getCookie('like_' + post_data.idx);
                if (cookie_like != undefined) {
                    temp_like_type = (cookie_like.substring(0, 4) == 'like') ? 'c_like_' : 'c_dislike_';
                    this.likeList.get(temp_like_type + post_data.idx).current.style.color = '#5e72e4';
                }
            });
        });
    }

    render() {
        var post_list = '';
        if (this.state.post_data == '') {
            post_list = this.state.post_data;
        } else {
            post_list = this.state.post_data.map((val, i) => 
                <div className="shadow card mb-12">
                    <div className="board-body">
                        <Row id={val.idx}>
                            <Col md="1" xs="1">
                                <Row>
                                    <Col id="promote_like">
                                        <Row>
                                            <a href="#none" ref={ this.addLikeListRef('c_like_', val.idx) } 
                                                onClick={ (e) => this.handleClickLike(val.idx, 'like', e) }
                                                id={"like_" + val.idx} style={{color:'#bbbbbb'}}>
                                                <i className="fa fa-sort-asc fa-2x" aria-hidden="true"></i>
                                                </a>
                                        </Row>
                                        <Row>
                                            <span className="post_like_content">{val.post_like}</span>
                                        </Row>
                                        <Row>
                                            <a href="#none" ref={ this.addLikeListRef('c_dislike_', val.idx) } 
                                                onClick={ (e) =>  this.handleClickLike(val.idx, 'dislike', e) }
                                                id={"dislike_" +val.idx} style={{color:'#bbbbbb'}}>
                                                <i className="fa fa-sort-desc fa-2x" name="dislike"></i>
                                                </a>
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
                                                            ? <>guest none</>
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
                                        <Comment id="board_interaction_content" post_idx={val.idx}/>
                                        <Shared id="board_interaction_content"/>
                                        <Settings id="board_interaction_content"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="1" xs="1"></Col>
                            <Col md="10" xs="10">
                                <Row>
                                    <Col id="board_interaction">
                                        <Reply post_idx={val.idx}/>
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
                <DemoNavbar />
                <Container id="main-container" className="mb-3">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <span onClick={ () => this.moveHome(this.props) }>Home</span>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Row>
                        <Col md="8" xs="12">
                            <>
                                {post_list}
                            </>
                        </Col>
                    </Row>
                </Container>
                <SimpleFooter />
            </>
        )
    }
}

export default Post;