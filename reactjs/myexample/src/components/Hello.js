import React from 'react';
import './Hello.css';
import { Answer } from '@/components';

function Hello() {
    const name = 'name';
    const style = {
        backgroundColor : 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }

/*
inline tag vs block tag
https://sas-study.tistory.com/122


*/
    return (
        <div className="wrapper">
            <div className="content-name" id="content_hello">안녕하세요</div>
            <div className="content-name" id="content_diff">이름은 홍길동입니다.</div>
            <p className="wrapper_child">조상</p>
            <div className="parent1">
                <p>부모1</p>
                <span className="child1">
                    <b>자식1-1</b>
                    <b>자식1-2</b>
                </span>
                <div className="parent2">
                    <p>부모2</p>
                    <div className="child2-1">
                        <b>자식2</b>
                    </div>
                    <div className="child2-2">
                        <b>자식2</b>
                    </div>
                </div>
            </div>
            <div style={style}>나이는:29</div>
            <Answer announcer="sol" interviewer="hyeok" isSpecial={true} />
        </div>
    );
}

export default Hello;
