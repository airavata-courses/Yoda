import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

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
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };
    // console.log(user);
    this.signin(user).then(data => {
      if (data && data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.setState({ errorMessage: "" });
        // authenticate user
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });

        // redirect
      }
    });
  };

  signin = user => {
    return fetch("/user/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Login</h2>

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
    );
  }
}

export default Signin;
