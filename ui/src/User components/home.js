import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/index";
import "./home.css";

class home extends Component {
  render() {
    return (
      <div>
        <Menu />
        <br />
        <br />

        <div
          className="row ml-auto mr-auto outerContainer"
          style={{ marginLeft: 200 + "px !important" }}
        >
          <div className="col-sm-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Real-time data</h5>
                <p className="card-text">
                  Get real-time weather of any place at the go!
                </p>
                <Link to="/real-time" className="btn btn-primary">
                  Get data
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">NEXRAD data</h5>
                <p className="card-text">
                  Get customized weather of any place!
                </p>
                {!isAuthenticated() && (
                  <p>
                    Requires <Link to="/signin">Sign in</Link>
                  </p>
                )}
                {isAuthenticated() && (
                  <Link to="/nexrad-data" className="btn btn-primary">
                    Get data
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default home;
