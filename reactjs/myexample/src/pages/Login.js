import React, { Component, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Button, Container } from 'reactstrap';
import { Profile, UseFriendStatus } from '@/components';
import { AuthRoute, signIn } from '@/lib';
import './Login.css';

class Login extends Component {
    constructor (props) {
        super (props);
        this.state = {
            userId : '',
            userPw : ''
        }
    }

    handleAction = (e) => {
        // fetch
        // sign token get return
        console.log('userId:' + this.state.userId);
        console.log('userPw:' + this.state.userPw);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw })
        };
        fetch ("/api/login/auth", requestOptions)
        .then (response => response.json())
        .then (data => {
            console.log (data);
        });
    }
    
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    render () {
        return (
            <>
                <Container className="mb-3">
                    <Form onClick={this.handleAction}>
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
                        <Col md="6">
                            <FormGroup>
                                <Button>ok</Button>
                                <Button><Link to="/signUp">SignUp</Link></Button>
                            </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Login;
