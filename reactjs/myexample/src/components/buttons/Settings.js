import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Settings.css';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Config } from '@/admin/config';
import { setCookie, getCookie } from '@/admin/cookie';
const NODE_SERVER = Config.NODE_SERVER;

const Settings = ( props ) => {
    const [dropState, setDropState] = useState(false);
    const clickDrop = () => {
        setDropState(!dropState);
    }
    const history = useHistory();
    const editPost = () => {
        history.push('/postEdit/' + props.post_idx);
    }
    const deletePost = () => {
        // delete 
        fetch(NODE_SERVER + 'board/post/del', { 
            method: "POST",
            body: JSON.stringify({ post_idx: props.post_idx, user_id: getCookie('chatApp_user_id') }),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                console.log(data);
                history.push('/');
            } else {
                console.log(data);
            }
        });

        props.removeFunc(props.post_idx);
    }
    return (
        <>
            <Dropdown isOpen={dropState} toggle={clickDrop} tag="span">
                <DropdownToggle className="mgl-10 mgr-10 txt-vert-center" color={ '' }>
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </DropdownToggle>
                <DropdownMenu>
                <div onClick={editPost}>
                    Edit post
                </div>
                <div onClick={deletePost}>
                    Remove post
                </div>
                </DropdownMenu>
            </Dropdown>
        </>
    );

};

export default Settings;
