import React from "react";

import "./Comment.css";

const Comment = ({count}) => {
    return (
        <span className="txt-vert-center">
            <i className="ni ni-chat-round"></i>
            <span className="ft-text-sm pad-6">{count}</span>
        </span>
    );
};

export default Comment;
