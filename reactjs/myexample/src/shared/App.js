import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Post, Posts, TodoList, MyPageApp, Login } from 'pages';
import { Menu, Hello } from 'components';

class App extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Menu}/>
                <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/about/:name" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
                <Route path="/todoList" component={TodoList}/>
                <Route path="/myPageApp" component={MyPageApp}/>
                <Route path="/hello" component={Hello}/>
                <Route path="/login" component={Login}/>
            </div>
        );
    };
}

export default App;
