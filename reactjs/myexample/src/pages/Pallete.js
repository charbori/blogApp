import React, { Component } from 'react';
import { ColorItem } from 'components';
import './Pallete.css';

class Pallete extends Component {

    componentDidUpdate () {
        /*
        fetch ('https://couhensoft.com/mysqlApi/userSetData.php')
            .then (response => response.json ())
            .then (response => this.setState ({users: res}));
        */
        console.log('componentDidUpdate');
    }
    render() {
        const colors = ['#555555', '#777777', '#999999'];
        const { color, handleColor } = this.props;
        const colorItemStyle = { background: color };
        const colorList = colors.map(
            (value) => (
                <ColorItem
                    color={value}
                    onColorChange={handleColor}
                    colorItemStyle={colorItemStyle}
                />
            )
        )

        return (
            <div className="ColorListWrapper">
                { colorList }
            </div>
        );
    }
}

export default Pallete;
