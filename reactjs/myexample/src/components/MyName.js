import React, { Component } from 'react';

class MyName extends Component {
    static defaultProps = {
        name: '기본이름'
    }
    render() {
        return (
            <div>
             Hello world! <b>{this.props.name}</b>
            </div>
        );
    }
}

export default MyName;
