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
                <li><NavLink to="/" activeStyle={activeStyle}>AppTestPage</NavLink></li>
                <li><NavLink to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
                <li><NavLink to="/login" activeStyle={activeStyle}>Login</NavLink></li>
                <li><NavLink to="/todoList" activeStyle={activeStyle}>TodoList</NavLink></li>
                <li><NavLink to="/myPageApp" activeStyle={activeStyle}>MyPage</NavLink></li>
                <li><NavLink to="/hello" activeStyle={activeStyle}>Hello</NavLink></li>
                <li><NavLink to="/Sample" activeStyle={activeStyle}>Sample</NavLink></li>
                <li><NavLink to="/Board" activeStyle={activeStyle}>Board</NavLink></li>
                <li><NavLink to="/Logs" activeStyle={activeStyle}>Logs</NavLink></li>
                <li><NavLink to="/Home" activeStyle={activeStyle}>Home</NavLink></li>
            </ul>
        </div>
    );
};

export default Menu;
