import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class Board extends Component {
    constructor (props) {
        super (props);
        this.state = {
            posts: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit (event) {
        alert('submit data:' + this.state.id);
        history.push('/prepare');
    }
    componentWillMount () {
        fetch ('http://13.209.68.188/api/board/post', {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then (response => response.json())
            .then (data => {
                    console.log(data);
                    this.setState({
                        posts: data.data
                    })
                }
            );
    }
    render () {
        const { posts } = this.state;
        const postsList = posts.map((post) => (
            <div key={post.idx}>
                <h4>{post.title}</h4>
                <h4>{post.contents}</h4>
                <p>{post.reg_date}</p>
            </div>
        ));
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {postsList}
                </div>
                <label>
                    <input type="hidden" value={this.state.id} onChange={this.handleChange} />
                    <input type="submit" value="요청"/>
                </label>
            </form>
        );
    }
}

export default Board;
