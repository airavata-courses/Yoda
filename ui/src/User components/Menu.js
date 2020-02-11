import React, { Component } from "react";
import { Link  } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
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
    // if (this.state.reloadPage) {
    //   window.location.reload();
    // }
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
        
        {!isAuthenticated() && (
            <>
            <li class="nav-item">
            <Link class = "nav-link" to={`/signin`}>Sign in</Link>
            </li>
            <li class="nav-item">
            <Link class = "nav-link" to={`/signup`}>Sign up</Link>
            </li>
            </>
        )}
        {isAuthenticated() && (
            <div>
                <li class="nav-item">
                <Link class = "nav-link" to={`/signout`}>Log out</Link>
                </li>
            </div>
        )}
        
        
      </ul>
      </Navbar>
    );
  }
}

export default Menu;
