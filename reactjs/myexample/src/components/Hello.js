import React from 'react';
import './Hello.css';
import { Answer } from 'components';

function Hello() {
    const name = 'name';
    const style = {
        backgroundColor : 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }

    return (
        <div className="wrapper">
            <div className="content-name">안녕하세요</div>
            <div style={style}>나이는:29</div>
            <Answer announcer="sol" interviewer="hyeok" isSpecial={true} />
        </div>
    );
}

export default Hello;
