import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function UseFriendStatus(props) {
    const [isOnline, setIsOnline] = useState(0);
    const isRefStatus = useRef('0');

    useEffect(() => {
        fetch('/api/user/set', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
             body: JSON.stringify({
                 id: 'hello',
                 content: 'jaehyeok'
             })
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                isRefStatus.status = response;
            });
    });

    if (isOnline != '1' && isRefStatus.status == '0') {
        console.log(isRefStatus.status);
        return <div>Loading...</div>
    }
    return (
        <div>
            { props.userName } log on <FontAwesomeIcon icon={["fal", "coffee"]} />
        </div>
    );
}

export default UseFriendStatus;
