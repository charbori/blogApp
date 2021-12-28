import React from "react";
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
import { setCookie, getCookie } from '@/admin/cookie';

const NODE_SERVER = Config.NODE_SERVER;

class LoginPopup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId : '',
      userPw : '',
      alertType : '',
      alertMsg : '',
    };
  }

  toggleModal = this.props.modalEvent;

  checkLogin = (e) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw, authType: 'guest' })
      };

      fetch (NODE_SERVER + "auth/login", requestOptions)
      .then (response => response.json())
      .then (data => {
          if (data.success === true) {
              this.setState({
                  alertType: true,
                  alertMsg: ''
              });
              setCookie('auth', data, { path: '/' });
              setCookie('chatApp_user_id', this.state.userId, { path: '/' });
              console.log('done');
              this.toggleModal();
          } else {
              this.setState({
                  alertType: false,
                  alertMsg: data.msg
              });
              console.log('fail');
          }
      });
  }

  handleChange = (e) => {
    this.setState({
        alertType: '',
        alertMsg: '',
        [e.target.id]: e.target.value
    })
  }

  render() {
    var iconDisplay = true;
    if (Object.keys(this.props).includes('displayNot')) {
        iconDisplay = false;
    }
    return (
      <>
        {/* Button trigger modal */}
        {   iconDisplay &&
          <span
          color="primary"
          type="button"
          onClick={() => this.toggleModal()}
          >
            <i className="fas fa-user navIconStyle"></i>
          </span>
        }

        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.modalState}
          toggle={() => this.toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              SignIn
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
                <Row>
                    <Col>
                    <FormGroup>
                        <Input
                        className="userId"
                        id="userId"
                        name="userId"
                        placeholder="userId"
                        type="text"
                        value={this.state.userId}
                        onChange={this.handleChange}
                        />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormGroup>
                        <Input
                        className="userPw"
                        id="userPw"
                        name="userPw"
                        placeholder="password"
                        type="password"
                        value={this.state.userPw}
                        onChange={this.handleChange}
                        />
                    </FormGroup>
                    </Col>
                </Row>
            </Form>
            <div className="base-align-between">
                <span>
                    {
                        this.state.alertType === false ? <AlertMark msg={this.state.alertMsg} type={this.state.alertType}/> : <div></div>
                    }
                </span>
                <span>
                    <Button onClick={this.checkLogin}>ok</Button>
                    <Button onClick={() => this.toggleModal()}>cancel</Button>
                </span>
            </div>
          </div>
          <div className="modal-footer">
          </div>
        </Modal>
      </>
    );
  }
}

export default LoginPopup;