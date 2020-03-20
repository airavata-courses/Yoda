import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
    const userId = isAuthenticated() ? isAuthenticated().user._id : "";
    const userName = isAuthenticated() ? isAuthenticated().user.name : "";
    const token = isAuthenticated() ? isAuthenticated().token : "";
    // if (this.state.reloadPage) {
    //   window.location.reload();
    // }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" >
              Hello {userName}
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/`}>
              Dash Board
            </Link>
          </li>

          {isAuthenticated() && (
            <li className="nav-item">
              <Link className="nav-link" to={`/activities`}>
                {" "}
                Activities{" "}
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/signin`}>
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/signup`}>
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <div>
              <li className="nav-item">
                <Link className="nav-link" to={`/signout`}>
                  Log out
                </Link>
              </li>
            </div>
          )}
        </ul>
      </Navbar>
    );
  }
}

export default Menu;
