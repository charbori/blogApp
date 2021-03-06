import React, { Component } from 'react';

const BoardContent = ({ src, type }) => {
    if (typeof type == 'undefined' && type == "IMG") {
        return (
            <img src={src}/>
        );
    } else {
        return (
            <span dangerouslySetInnerHTML={ {__html: src} } ></span>
        );
    }
}

export default BoardContent;
