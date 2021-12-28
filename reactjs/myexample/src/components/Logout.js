import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
  Container
} from "reactstrap";
import { Link, Route } from 'react-router-dom';
import AlertMark from "@/components/alertMark";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/css/base.css";
import { Config } from '@/admin/config';
import { setCookie, getCookie, removeCookie } from '@/admin/cookie';

const Logout = () => {
    const [modalState, setModalState] = useState(false); 
    function logout () {
        removeCookie('chatApp_user_id');
        setModalState(!modalState);
        window.location.href = '/';
    }
    const modalClick = () => {
        setModalState(!modalState);
    }
    return (
        <>
            {
                <span
                color="primary"
                type="button"
                onClick={modalClick}
                >
                    <i className="fas fa-user navIconStyle"></i>
                </span>
            }

            <Modal
            className="modal-dialog-centered"
            isOpen={modalState}
            toggle={modalClick}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                    Logout
                    </h5>
                    <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={modalClick}
                    >
                    <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="base-align-between">
                        <span>
                            <Button onClick={logout}>logout</Button>
                            <Button onClick={modalClick}>cancel</Button>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Logout;