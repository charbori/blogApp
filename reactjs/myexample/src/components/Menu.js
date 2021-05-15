import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Go Post</NavLink></li>
                <li><NavLink to="/login" activeStyle={activeStyle}>Login</NavLink></li>
                <li><NavLink to="/todoList" activeStyle={activeStyle}>TodoList</NavLink></li>
                <li><NavLink to="/myPageApp" activeStyle={activeStyle}>MyPage</NavLink></li>
                <li><NavLink to="/hello" activeStyle={activeStyle}>Hello</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;
