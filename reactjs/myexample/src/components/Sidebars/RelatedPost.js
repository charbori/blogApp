import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class RelatedPost extends Component {
    constructor (props) {
        super (props);
        this.state = {
            title : [{'title':'no title'}, {'title':'no title2'}],
            post_type : 1
        }
    }
    componentDidMount () {
        fetch (NODE_SERVER + 'category/getSidebarRelatedData?post_type=' + this.state.post_type, {
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
        var relatedList = () => <ListGroupItem tag="a" key='0' href="">error</ListGroupItem>;
        try {
            relatedList = this.state.title.map((data) =>
                <ListGroupItem tag="a" key={data.idx} href={'post/' + data.title}>{data.title}</ListGroupItem>
            );
        } catch (e) {
            console.log(e);
        }
        return (
            <ListGroup className="mb-3">
                {relatedList}
            </ListGroup>
        );
    }
}

export default RelatedPost;
