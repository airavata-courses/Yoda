import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import response from "./response";
import Menu from "./Menu";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      errorMessage: "",
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password,
    };
    // console.log(user);
    this.signin(user).then((data) => {
      console.log(data);
      if (data && data.data != null && data.data.error != null) {
        this.setState({ error: data.data.error, loading: false });
      } else if (data && data.token != null) {
        this.setState({ errorMessage: "" });
        // authenticate user
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });

        // redirect
      }
    });
  };

  async signin(user) {
    return await axios
      .post("/user/signin", user)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err.response);
        return err.response;
      });
    // console.log(axiosRes);
    // return axiosRes.data;
  }

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Menu />
        <div className="container">
          <h2 className="mt-5 mb-5">Login-New</h2>

          <div
            className="alert alert-primary"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          {loading ? (
            <div className="jumbotron text-center">
              <h2>Loading ...</h2>
            </div>
          ) : (
            ""
          )}

          <form>
            <div className="form-group">
              <label className="text-muted">Email</label>
              <input
                onChange={this.handleChange("email")}
                type="email"
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Password</label>
              <input
                onChange={this.handleChange("password")}
                type="password"
                className="form-control"
                value={password}
              />
            </div>
            <button
              onClick={this.clickSubmit}
              className="btn btn-raised btn-primary"
            >
              Submit
            </button>
            <div className="form-group">
              <Link className="nav-link text-muted" to="/signup">
                Don't have an account? Sign Up
              </Link>
              <Link
                to="/forgot-password"
                className=" nav-link mx-auto text-muted"
              >
                Forgot Password? Reset it
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
