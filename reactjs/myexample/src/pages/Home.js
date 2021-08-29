import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.min.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";

import { About, Post, TodoList, MyPageApp, Sample, Board, Prepare, TaskList } from '@/pages';
import { Menu, Hello, SidebarTab } from '@/components';
import { Landing, Profile, Login, Register } from '@/examples';
import { Logs } from '@/admin';
import DemoNavbar from "@/components/Navbars/DemoNavbar.js";
import SimpleFooter from "@/components/Footers/SimpleFooter.js";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./Home.css";

class Home extends Component {
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
                type: false
            }
        };
    }
    render () {
        return (
            <>
            <DemoNavbar />
            <Container id="main-container" className="mb-3">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    <Col md="8" xs="12">
                        <Board />
                    </Col>
                    <Col md="4" id="sidebar-col">
                        <SidebarTab />
                    </Col>
                </Row>
            </Container>
            <SimpleFooter />
            </>
        );
    }
}

export default Home;
