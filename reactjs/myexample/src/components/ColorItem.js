import React, { Component } from 'react';
import './ColorItem.css';

const ColorItem = ({color, onColorChange, colorItemStyle}) => {
    var styleObj = { background: color };
    return (
        <div className="colorItemContent" style={ styleObj }
        onClick={() => onColorChange(color)}>
        </div>
    );
}

export default ColorItem;
