import React, { Component } from 'react';
import { MyName, MyIcon } from 'components';
import { Counter } from 'pages';

class MyPageApp extends Component {
    render() {
        return (
            <div>
                <MyName name="리액트"/>
                <MyIcon iconName="iconNameData"/>
                <Counter />
            </div>
        );
    }
}

export default MyPageApp;
