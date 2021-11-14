import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

const AlertMark = ({ type, msg }) => {
    var colorType = '';
   
    if (type == false) {
        colorType = 'danger';
    } else {
        colorType = '';
    }
    return (
        <div>
            <Alert color={colorType}>
                {msg}
            </Alert>
        </div>
    );
}

export default AlertMark;