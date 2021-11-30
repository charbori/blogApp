import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Config } from '@/admin/config';
import ReactQuill from 'react-quill';
import DemoNavbar from "@/components/Navbars/DemoNavbar.js";
import SimpleFooter from "@/components/Footers/SimpleFooter.js";
import { getCookie } from '@/admin/cookie';

//css load
import { Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.min.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";
import "@/pages/Home.css";
import "@/assets/css/board.css";

const NODE_SERVER = Config.NODE_SERVER;

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '',
            user_id: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (htmlElement) => {
        this.setState({ text : htmlElement });
    }

    handleSubmit = () => {
        const set_user_id = (getCookie('chatApp_user_id')) ? getCookie('chatApp_user_id') : 'guest';
        this.setState({ user_id : set_user_id });

        fetch(NODE_SERVER + 'board/post', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ title: 'test title', contents: this.state.text, user_id: this.state.user_id })
        })
        .then (response => response.json())
        .then (data => {
            console.log (data);
            if (data.success == true) {
                this.moveHome(this.props);
            }
        });
    }

    moveHome (props) {
        window.location.href = '/';
    }

    render() {
        let contents = <ReactQuill value={this.state.text} onChange={(content, delta, source, editor) => this.handleChange(editor.getHTML())} />;
        var post_idx = 0;
        if (Object.keys(this.props).includes('post_idx')) {
            post_idx = this.props.post_idx;
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
                            { contents }
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8" xs="12">
                            <Card className="board_insert_top text-center">
                                <Button onClick={this.handleSubmit}>
                                    { post_idx > 0
                                        ? <span>PUBLISH POST</span>
                                        : <span>UPDATE POST</span>                                
                                    }
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <SimpleFooter />
            </>
        )
    }
}

export default Editor;