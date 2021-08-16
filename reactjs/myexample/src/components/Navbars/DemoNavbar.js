/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, Route, NavLink as NavLinkPath } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import './DemoNavbar.css';
import "@/assets/vendor/font-awesome/css/font-awesome.min.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";
// reactstrap components
import { Home, About, Post, TodoList, Sample, Board, Prepare, TaskList } from '@/pages';
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  handleSubmit = () => {
    console.log("handle search event");
  };

  render() {
    return (
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <Link to="/">
                <b className="navbar-theme-title">DEV</b>
              </Link>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text navbar-theme-menu">Post</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Link to="/board" className="d-flex align-items-center mb-3">
                            <Media body className="ml-3">
                              <h6 className="heading text-primary mb-md-1">
                                mysql db
                              </h6>
                              <p className="description d-none d-md-inline-block mb-0">
                                mysql DB의 동작방식을 알아봅니다
                              </p>
                            </Media>
                        </Link>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              php
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              php script 공부해봅시다
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              JavaScript
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              JavaScript에 대해서 알아봅니다
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Dev-tools
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Docker, github에 대해서 알아봅니다
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text navbar-theme-menu">Logs</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/landing-page" tag={Link}>
                        Server
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Algorithm
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Job
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Dev-tools
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/charbori/blogApp"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Star us on Github
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <FormGroup className="mt-4">
                      <InputGroup className="mb-4" size="sm">
                        <Input placeholder="Search" type="text"/>
                        <InputGroupAddon addonType="append">
                          <InputGroupText className="border-0 p-0">
                            <Button className="btn-sm ni ni-zoom-split-in" onClick={this.handleSubmit}></Button>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
    );
  }
}

export default DemoNavbar;
