import React, { Component } from 'react';

const BoardContent = ({ src, type }) => {
    if (type) {
        return (
            <img src={src}/>
        );
    } else {
        return (
            <span>{src}</span>
        );
    }
}

export default BoardContent;
