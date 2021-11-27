import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class RecommendPost extends Component {
    constructor (props) {
        super (props);
        this.state = {
            data: [{'name' : 'no title1'}, {'name' : 'no title2'}]
        }
    }
    componentDidMount () {
        fetch (NODE_SERVER + 'category/getSidebarRecommendData', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({
                data : data.data
            });
        });
    }
    render () {
        var recommendList = () => <ListGroupItem tag="a" key='0' href="">error</ListGroupItem>;
        try {
            recommendList = this.state.data.map((data) =>
                <ListGroupItem tag="a" key={data.idx} href={data.name}>{data.name}</ListGroupItem>
            );
        } catch (e) {
            console.log(e);
        }
        return (
            <ListGroup className="mb-3">
                {recommendList}
            </ListGroup>
        );
    }
}

export default RecommendPost;
