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

class LoginPopup extends React.Component {
  state = {
    exampleModal: false,
    userId : '',
    userPw : '',
    alertType : '',
    alertMsg : '',
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  checkLogin = (e) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: this.state.userId, userPw: this.state.userPw, authType: 'guest' })
      };

      fetch ("http://192.168.219.109:8888/api/auth/login", requestOptions)
      .then (response => response.json())
      .then (data => {
          console.log(data);
          if (data.success === true) {
              this.setState({
                  alertType: true,
                  alertMsg: ''
              });
              setCookie('auth', data, { path: '/' });
              console.log('done');
              this.toggleModal("exampleModal");
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
    return (
      <>
        {/* Button trigger modal */}
        <span
          color="primary"
          type="button"
          onClick={() => this.toggleModal("exampleModal")}
        >
            <i className="fas fa-user navIconStyle"></i>
        </span>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
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
              onClick={() => this.toggleModal("exampleModal")}
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
            <span className="base-align-right">
                <Button onClick={this.checkLogin}>ok</Button>
                <Button onClick={() => this.toggleModal("exampleModal")}>cancel</Button>
                {
                    this.state.alertType === false ? <AlertMark msg={this.state.alertMsg} type={this.state.alertType}/> : <div></div>
                }
            </span>
          </div>
          <div className="modal-footer">
          </div>
        </Modal>
      </>
    );
  }
}

export default LoginPopup;