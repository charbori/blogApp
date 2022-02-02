import React, { Component, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col, Table } from "reactstrap";
import { Comment, Shared, Settings } from '@/components/buttons';
import { setCookie, getCookie, removeCookie } from '@/admin/cookie';
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

function Reply(props) {
    const [idx, setIdx] = useState(0);
    const [postIdx, setPostIdx] = useState(props.post_idx);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        var user_id = (getCookie('chatApp_user_id') != undefined) ? getCookie('chatApp_user_id') : '##GUEST';
        var get_param = 'post_id=' + props.post_idx;
        //get_param = (user_id == '##GUEST') ? get_param : get_param + '&user_id=' + user_id;

        console.log ('use effect run');
        fetch(NODE_SERVER + 'board/reply?' + get_param, {
            method : 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            console.log (data);
            setContents(data);
        });
    }, []);
    
    return (
        <>
            <Table>
                <tbody>
                    {   contents.length > 0 && 
                    contents.map((item) => (
                        <>
                            <tr className="replyName" key={item.reply_id}>
                                <td width="80%">
                                    {(item.user_id == '') ? 'GUEST' : item.user_id}&nbsp;{item.reply_date}
                                    <div className="replyContent">
                                        {item.reply_contents}
                                    </div>
                                </td>
                                <td width="20%">
                                    {   (item.user_id != '' && item.user_id == getCookie('chatApp_user_id')) &&
                                        <i class="far fa-trash-alt"></i>
                                    }
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Reply;