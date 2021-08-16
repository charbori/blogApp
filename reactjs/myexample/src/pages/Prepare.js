import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Board, TaskList } from '@/pages';
/*
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.min.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";
*/
import { Button, Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

class Prepare extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: this.props.id,
            content: ''
        };
        this.handleChangeHome = this.handleChangeHome.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
    }
    handleChangeHome(event) {
        this.props.history.push("/Board");
    }
    handleChangeTask(event) {
        this.props.history.push("/TaskList");
    }
    render () {
        return (
            <Container>
                <Card>
                    <CardHeader>{this.state.id}님의 taskname</CardHeader>
                    <CardBody>~님을 기다리는 중...</CardBody>
                </Card>
                <Button onClick={this.handleChangeHome}>홈으로</Button>
                <Button onClick={this.handleChangeTask}>TASK 목록</Button>
            </Container>
        );
    }
}

export default Prepare;
