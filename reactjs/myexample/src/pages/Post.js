import React, { Component } from 'react';

class Post extends Component {
    constructor (props) {
        super (props);
        this.state = {
            id: props.match.params.id,
            content: ''
        }
    }

    componentDidMount() {
        fetch ('http://couhensoft.com:8888/api')
            .then (response => response.json())
            .then (response => this.setState({content: response.title}));
    }

    render () {
        return (
            <div>
                포스트 {this.state.id}
                포스트내용 {this.state.content}
            </div>
        );
    };
}

export default Post;
