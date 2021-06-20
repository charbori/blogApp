import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Post, Posts, TodoList, MyPageApp, Sample, Board } from '@/pages';
import { Menu, Hello } from '@/components';
import { Landing, Profile, Login, Register } from '@/examples';
import { Logs } from '@/admin';

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
                <Route path="/sample" component={Sample}/>
                <Route path="/Sample" component={Sample}/>
                <Route path="/examples/landing-page" component={Landing}/>
                <Route path="/examples/profile-page" component={Profile}/>
                <Route path="/examples/login-page" component={Login}/>
                <Route path="/examples/register-page" component={Register}/>
                <Route path="/Board" component={Board}/>
                <Route path="/Logs" component={Logs}/>
            </div>
        );
    };
}

export default App;
