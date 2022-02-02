import React from "react";
import { useEffect, useState } from "react";
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

import "./Comment.css";

const Comment = ({post_idx}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        var get_param = 'post_id=' + post_idx + '&type=count';

        fetch(NODE_SERVER + 'board/reply?' + get_param, {
            method : 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            console.log(data);
            setCount(data[0].cnt);
        });

    });
    return (
        <span className="txt-vert-center">
            <i className="ni ni-chat-round"></i>
            <span className="ft-text-sm pad-6">{count}</span>
        </span>
    );
};

export default Comment;
