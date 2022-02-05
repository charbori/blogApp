import React, { Component, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Input, Label } from "reactstrap";
import { Comment, Shared, Settings } from '@/components/buttons';
import { setCookie, getCookie, removeCookie } from '@/admin/cookie';
import { Config } from '@/admin/config';
import './Reply.css';

const NODE_SERVER = Config.NODE_SERVER;

function Reply(props) {
    const [send, setSend] = useState(0);
    const [postIdx, setPostIdx] = useState(props.post_idx);
    const [contents, setContents] = useState([]);
    const [addReply, setAddReply] = useState('');
    const [modReply, setModReply] = useState('');
    const [ip, setIp] = useState('0.0.0.0');
    const [modId, setModId] = useState('');
    const [replyType, setReplyType] = useState('add');

    useEffect(() => {
        var user_id = (getCookie('chatApp_user_id') != undefined) ? getCookie('chatApp_user_id') : '##GUEST';
        var get_param = 'post_id=' + props.post_idx;
        //get_param = (user_id == '##GUEST') ? get_param : get_param + '&user_id=' + user_id;

        console.log (contents);
        fetch(NODE_SERVER + 'board/reply?' + get_param, {
            method : 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
        .then (response => response.json())
        .then (data => {
            console.log (data);
            setContents(data);
        });

        fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(json => {
            setIp(json.ip);
            console.log(json);
        });
    }, [send]);

    function submitReply() {
        if (send > 10) {
            alert('한 번에 너무 많은 댓글을 작성하여 제한됩니다.');
            return;
        }
        var user_id = (getCookie('chatApp_user_id') != undefined) ? getCookie('chatApp_user_id') : '##GUEST';
        if (postIdx == undefined || postIdx.length == 0) {
            alert('게시글 정보가 잘못되었습니다.');
            return;
        }

        if (replyType != 'mod') {
            if (addReply == undefined || addReply.length == 0) {
                alert('댓글을 작성해주세요.');
                return;
            }

            fetch (NODE_SERVER + 'board/reply/add', {
                method: "POST",
                body: JSON.stringify({
                    user_id: user_id,
                    post_id: postIdx,
                    contents: addReply,
                    ip_addr: ip,
                    reply_type: '0'
                }),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            .then (response => {
                if (response.statusCode === 404) {
                    throw new Error("Unexpected Http Status error : 404");
                } else if (response.statusCode === 200) {
                    response.json()
                } else {
                    throw new Error("Unexpected Http Status error : " + response.statusCode);
                }
            })
            .then (data => {
                console.log (data);
                if (data.success == false) {
                    alert('잠시후에 다시 시도해주세요.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {    // modify reply
            if (modReply == undefined || modReply.length == 0) {
                alert('댓글을 작성해주세요.');
                return;
            }
            if (modId == undefined || modId.length == 0) {
                alert('수정할 댓글을 다시 선택해주세요.');
                return;
            }
            console.log('modify reply');
            fetch (NODE_SERVER + 'board/reply/mod', {
                method: "POST",
                body: JSON.stringify({
                    post_id: postIdx,
                    contents: modReply,
                    reply_id: modId,
                    reply_type: '0'
                }),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            .then (response => {
                if (response.statusCode === 404) {
                    throw new Error("Unexpected Http Status error : 404");
                } else if (response.statusCode === 200) {
                    response.json()
                } else {
                    throw new Error("Unexpected Http Status error : " + response.statusCode);
                }
            })
            .then (data => {
                console.log (data);
                if (data.success == false) {
                    alert('잠시후에 다시 시도해주세요.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
            setModId('');
            setReplyType('add');
            setModReply('');
        }

        setAddReply('');
        setSend(send + 1);
    }

    function deleteReply(user_id, reply_id, ip_addr) {
        console.log (user_id + " / " + reply_id + " / " + postIdx + " / " + ip + " / " + ip_addr);

        if (ip.length == 0 || ip == undefined || ip == null) {
            fetch('https://geoip-db.com/json')
            .then(res => res.json())
            .then(json => {
                setIp(json);
            });
            alert('잠시후에 다시 시도해주세요.');
        } else if ((user_id == '##GUEST' && ip == ip_addr) || user_id == getCookie('chatApp_user_id')) {
            console.log('do del');
            fetch (NODE_SERVER + 'board/reply/del', {
                method: "POST",
                body: JSON.stringify({
                    reply_id: reply_id,
                    post_id: postIdx,
                    ip_addr: ip
                }),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            .then (response => response.json())
            .then (data => {
                console.log (data);
                if (data.success == false) {
                    alert('잠시후에 다시 시도해주세요.');
                }
            });
        }

        setSend(send + 1);
    }

    function modHandler (reply_id) {
        // todo modify fetch
        console.log('do mod');
        setModId(reply_id);
        setReplyType('mod');
        setSend(send + 1);
    }

    return (
        <>
            <Table>
                <tbody>
                    {   replyType != 'mod' && 
                        <tr className="replyName" key="submit_form">
                            <td width="90%">
                               <Input name="text" type="textarea" value={addReply} onChange={e => {
                                   setAddReply(e.target.value);
                               }}/>
                            </td>
                            <td width="10%">
                                <Button onClick={() => submitReply()}>send</Button>
                            </td>
                        </tr>
                    }
                    {   contents.length > 0 && 
                    contents.map((item) => (
                        <>
                            <tr className="replyName" key={item.reply_id}>
                                <td width="95%">
                                    {(item.user_id == '') ? 'GUEST' : item.user_id}&nbsp;{item.reply_date}
                                    <div className="replyContent">
                                        {item.reply_contents}
                                    </div>
                                </td>
                                <td width="5%">
                                    <a href="#none" class="reply-btn" onClick={() => modHandler(item.reply_id)}>M</a>
                                    <Button close onClick={() => deleteReply(item.user_id, item.reply_id, item.ip_addr)}/>
                                </td>
                            </tr>
                            {   replyType == 'mod' && item.reply_id == modId &&
                                <tr className="replyName" key="submit_form">
                                    <td width="90%">
                                    <Input name="text" type="textarea" value={modReply} onChange={e => {
                                        setModReply(e.target.value);
                                    }}/>
                                    </td>
                                    <td width="10%">
                                        <Button onClick={() => submitReply()}>send</Button>
                                    </td>
                                </tr>
                            }
                        </>
                    ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Reply;