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
    actionSignUp = (e) => {
        if (false === this.state.userIdChk) {
            this.setState.msg = '아이디를 확인해주세요';
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw, userName: this.state.userName })
        }
        fetch ("http://192.168.219.109:8888/api/auth/signUp", requestOptions)
        .then (response => response.json())
        .then (data => {
            window.location.href = '/';
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

    checkUserId = (e) => {
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json'}
        }
        if (this.state.userId.length < 2) {
            return ;
        } 

        console.log(this.props.location);

        const url = "http://192.168.219.109:8888/api/auth/signUp/" + this.state.userId;
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
                                <span><b className="ct-title">Signup</b></span>
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
                                <Button onClick={this.checkUserId}>{this.state.userIdChkText}</Button>
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
                                    <Button onClick={this.actionSignUp}>SignUp</Button>
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