import React, { Component } from 'react';
import './ColorItem.css';
/*
class ColorItem extends Component {

    render() {
        const { color, onColorChange, colorItemStyle } = this.props;


    }
}
*/

const ColorItem = ({color, onColorChange, colorItemStyle}) => {

    var styleObj = { background: color };

    return (
        <div className="colorItemContent" style={ styleObj }
        onClick={() => onColorChange(color)}>
        </div>
    );
}

export default ColorItem;
