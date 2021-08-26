import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class RelatedPost extends Component {
    constructor (props) {
        super (props);
        this.state = {
            title : [{'title':'no title'}, {'title':'no title2'}],
            post_type : 1
        }
    }
    componentDidMount () {
        fetch ('/api/category/getSidebarRelatedData?post_type=' + this.state.post_type, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                title: data.data
            });
        });
    }
    render () {
        const relatedList = this.state.title.map((data) =>
            <ListGroupItem tag="a" key={data.idx} href={'post/' + data.title}>{data.title}</ListGroupItem>
        );
        return (
            <ListGroup className="mb-3">
                {relatedList}
            </ListGroup>
        );
    }
}

export default RelatedPost;
