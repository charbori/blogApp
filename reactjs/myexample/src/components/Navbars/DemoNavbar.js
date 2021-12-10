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
import React, { Component } from "react";
import { Link, Route, NavLink as NavLinkPath } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import './DemoNavbar.css';
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/fontawesome_free_5.15.4/css/all.css";
import "@/assets/scss/argon-design-system-react.scss?v1.1.0";
import "@/assets/css/base.css";
import UncontrolledDropdownNav from "@/components/Navbars/UncontrolledDropdownNav.js";
// reactstrap components
import { Home, About, Post, TodoList, Sample, Board, Prepare, TaskList } from '@/pages';
import { LoginPopup } from "@/components";
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
import { Config } from '@/admin/config';

const NODE_SERVER = Config.NODE_SERVER;

class DemoNavbar extends Component {
    constructor (props) {
        super (props);
        this.state = {
              collapseClasses: "",
              collapseOpen: false,
              categoryData: '',
              modalState: false
        };
    }

    componentWillMount() {
        fetch (NODE_SERVER + 'category/getCategoryDataAll', {
            method:"GET",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then (response => response.json())
        .then (data => {
            this.setState({
                categoryData: data.data
            });
        });
    }

    componentDidMount() {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    }
  modalEvent = () => {
      console.log('run');
      this.setState({ modalState : !this.state.modalState });
  }
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
            <Container id="navbar-cont">
              <Link to="/">
                <b className="navbar-theme-title">DEV</b>
              </Link>
              <button className="navbar-toggler" id="navbar_global">
                <i className="fas fa-align-justify navIconStyle"></i>
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
                        <i className="fas fa-home fa-3x baseIconStyle"></i>
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <i className="fas fa-plus baseIconStyle"></i>
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdownNav navDatas={this.state.categoryData} />
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <LoginPopup modalState={this.state.modalState} modalEvent={this.modalEvent}/>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/charbori/blogApp"
                      id="tooltip112445449"
                      target="_blank"
                      >
                      <i class="fab fa-github  navIconStyle"></i>
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      blogApp project Github
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
