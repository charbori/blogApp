import React from 'react';
import { Link, Route } from 'react-router-dom';
import { FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Button, Container } from 'reactstrap';

class Signup extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            userId : '',
            userPw : '',
            userName : '',
            userIdChk : false,
            userIdChkText : 'check',
            msg : ''
        }
    }

    // 회원 가입
    handleAction = (e) => {
        // fetch
        // sign token get return
        console.log('userId:' + this.state.userId);
        console.log('userPw:' + this.state.userPw);
        if (false === this.state.userIdChk) {
            this.setState.msg = '아이디를 확인해주세요';
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw, userName: this.state.userName })
        }
        fetch ("/api/auth/signUp", requestOptions)
        .then (response => response.json())
        .then (data => {
            //https://velog.io/@devstone/react-router-dom-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0
            //페이지 이동 관련
        });
    }
    
    handleChange = (e) => {
        if (e.target.id == 'userId' && this.state.userId != e.target.value) {
            this.setState.userIdChkText = 'check';
            this.setState.userIdChk = false;
        }
        this.setState({
          [e.target.id]: e.target.value
        });
    }

    handleCheckUserId = (e) => {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json'}
        }
        if (this.state.userId.length < 2) {
            return ;
        }
        const url = "/api/auth/signUp/" + this.state.userId;
        fetch (url, requestOptions)
        .then (response => response.json())
        .then (data => {
            console.log(data);
            if (data.success) {
                this.setState({
                    userIdChk: true,
                    userIdChkText: 'ok',
                    msg: data.msg
                });
            } else {
                this.setState({
                    userIdChk: false,
                    userIdChkText: 'check',
                    msg: data.msg
                });
            }
        });
    }

    render () {
        return (
            <>
                <Container className="mb-3">
                    <Form>
                        <Row id="page_title">
                            <Col md="6">
                                <span><b className="ct-title">Login</b></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <FormGroup>
                                <Input
                                className="userId"
                                id="userId"
                                name="userId"
                                placeholder="userId"
                                type="text"
                                value={this.state.userId}
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            </Col>
                            <Col md="2">
                                <Button onClick={this.handleCheckUserId}>{this.state.userIdChkText}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <span>
                                    {this.state.msg}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <FormGroup>
                                <Input
                                className="userName"
                                id="userName"
                                name="userName"
                                placeholder="name"
                                type="text"
                                value={this.state.userName}
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                            <FormGroup>
                                <Input
                                className="userPw"
                                id="userPw"
                                name="userPw"
                                placeholder="password"
                                type="password"
                                value={this.state.userPw}
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Button onClick={this.handleAction}>SignUp</Button>
                                    <Button><Link to="/">Cancel</Link></Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Signup;