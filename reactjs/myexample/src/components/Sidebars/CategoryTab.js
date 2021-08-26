import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

class CategoryTab extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name : [{name:'notitle'}, {name: 'notitle2'}],
            xcode : '1'
        }
    }
    componentDidMount () {
        fetch ('/api/category/getSidebarCategoryData?xcode=1', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({
                name: data.data
            });
        });
    }
    render () {
        const nameList = this.state.name.map((data) =>
            <ListGroupItem tag="a" key={data.idx} href={data.name}>{data.name}</ListGroupItem>
        );

        return (
            <ListGroup className="mb-3">
                {nameList}
            </ListGroup>
        );
    }
};

export default CategoryTab;
