import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class RecommendPost extends Component {
    constructor (props) {
        super (props);
        this.state = {
            data: [{'name' : 'no title1'}, {'name' : 'no title2'}]
        }
    }
    componentDidMount () {
        fetch ('/api/category/getSidebarRecommendData', {
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
        const recommendList = this.state.data.map((data) =>
            <ListGroupItem tag="a" key={data.idx} href={data.name}>{data.name}</ListGroupItem>
        );
        return (
            <ListGroup className="mb-3">
                {recommendList}
            </ListGroup>
        );
    }
}

export default RecommendPost;
