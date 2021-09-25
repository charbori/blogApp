import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Post, TodoList, Sample, Board, Prepare, TaskList, Login, SignUp } from '@/pages';
import { Menu, Hello } from '@/components';
import { Landing, Profile, Register } from '@/examples';
import { Logs } from '@/admin';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/board">
                        <Board />
                    </Route>
                </div>
                <div>
                    <Route path="/menu" component={Menu}/>
                    <Switch>
                        <Route path="/about" component={About}/>
                        <Route path="/about/:name" component={About}/>
                    </Switch>
                    <Route path="/todoList" component={TodoList}/>
                    <Route path="/hello" component={Hello}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/Sample" component={Sample}/>
                    <Route path="/examples/landing-page" component={Landing}/>
                    <Route path="/examples/profile-page" component={Profile}/>
                    <Route path="/examples/login-page" component={Login}/>
                    <Route path="/examples/register-page" component={Register}/>
                    <Route path="/prepare" component={Prepare}/>
                    <Route path="/tasklist" component={TaskList}/>
                    <Route path="/Logs" component={Logs}/>
                </div>
            </div>
        );
    };
}

export default App;
