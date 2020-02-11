import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
//import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Nav from "react-bootstrap/Nav";
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';


class Menu extends Component {
  constructor() {
    super();
    this.state = {
      reloadPage: false
    };
  }

  componentDidMount = () => {
    if (!isAuthenticated()) {
      this.setState({ reloadPage: true });
    }
  };

  render() {
    const userId = isAuthenticated().user ? isAuthenticated().user._id : "";
    const userName = isAuthenticated().user ? isAuthenticated().user.name : "";
    const token = isAuthenticated().token ? isAuthenticated().token : "";
    if (this.state.reloadPage) {
      window.location.reload();
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link active" href="#">Hello {userName}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Dash Board</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Activities</a>
        </li>
        <li class="nav-item">
        <Link class = "nav-link" to={`/signout`}>Log out</Link>
        </li>
        
      </ul>
      </Navbar>
    );
  }
}

export default Menu;
