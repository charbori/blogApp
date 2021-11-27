import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class CategoryTab extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name : [{name:'notitle'}, {name: 'notitle2'}],
            xcode : '1'
        }
    }
    componentDidMount () {
        fetch (NODE_SERVER + 'category/getSidebarCategoryData?xcode=1', {
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
        var nameList = () => <ListGroupItem tag="a" key='0' href="">error</ListGroupItem>;
        try {
            nameList = this.state.name.map((data) =>
                <ListGroupItem tag="a" key={data.idx} href={data.name}>{data.name}</ListGroupItem>
            );
        } catch (e) {
            console.log(e);
        }

        return (
            <ListGroup className="mb-3">
                {nameList}
            </ListGroup>
        );
    }
};

export default CategoryTab;
