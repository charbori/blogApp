import React, { Component, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Button, Container } from 'reactstrap';
import { Profile, UseFriendStatus, AlertMark } from '@/components';
import { AuthRoute, signIn } from '@/lib';
import './Login.css';
import { useCookies } from 'react-cookie';
import { setCookie, getCookie } from '@/admin/cookie';
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class Login extends Component {
    constructor (props) {
        super (props);
        this.state = {
            userId : '',
            userPw : '',
            alertType : '',
            alertMsg : '',
        }
    }

    handleAction = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw, authType: 'guest' })
        };
        fetch (NODE_SERVER + "auth/login", requestOptions)
        .then (response => response.json())
        .then (data => {
            console.log(data);
            if (data.success === false) {
                this.setState({
                    alertType: false,
                    alertMsg: data.msg
                });
                console.log('fail');
            } else {
                this.setState({
                    alertType: true,
                    alertMsg: ''
                });
                setCookie('auth', data, { path: '/' });
                setCookie('chatApp_user_id', this.state.userId, { path: '/' });
                console.log('done');
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            alertType: '',
            alertMsg: '',
            [e.target.id]: e.target.value
        })
    }

    handleMove = (e) => {
        this.props.history.push('/signUp');
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
                            <Col md="3">
                                <FormGroup>
                                    <Button onClick={this.handleMove}>SignUp</Button>
                                    <Button onClick={this.handleAction}>ok</Button>
                                    <Button><Link to="/signUp" onClick={() => { this.props.history.push('/login'); }}>SignUp</Link></Button>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                {
                                    this.state.alertType === false ? <AlertMark msg={this.state.alertMsg} type={this.state.alertType}/> : <div></div>
                                }
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Login;
