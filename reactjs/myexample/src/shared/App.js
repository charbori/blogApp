import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Post, Posts, TodoList, MyPageApp } from 'pages';
import { Menu, Hello, Sample } from 'components';
import { Login, Landing, Profile, Register } from 'components/examples';

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
                <Route path="/Sample" component={Sample}/>
                <Route path="/examples/landing-page" component={Landing}/>
                <Route path="/examples/profile-page" component={Profile}/>
                <Route path="/examples/login-page" component={Login}/>
                <Route path="/examples/register-page" component={Register}/>
            </div>
        );
    };
}

export default App;
