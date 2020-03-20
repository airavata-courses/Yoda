import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Menu from "./Menu";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    //console.log(user);
    this.signup(user).then(data => {
      console.log(data);
      // console.log(data.data.error);
      if (data.data.error) {
        console.log("in if");
        this.setState({ error: data.data.error });
      } else {
        console.log("in else");
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
      }
    });
  };

  async signup(user) {
    // return fetch("/user/signup", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "http://localhost:8080"
    //   },
    //   body: JSON.stringify(user)
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .catch(err => console.log(err));

    return await axios
      .post("/user/signup", user)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log(err.response);
        return err.response;
      });

    // console.log(axiosResponse.data);
    // return axiosResponse.data;
  }

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div>
        <Menu />

        <div className="container">
          <h2 className="mt-5 mb-5">Signup..</h2>

          <div
            className="alert alert-primary"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          <div
            className="alert alert-info"
            style={{ display: open ? "" : "none" }}
          >
            New account is successfully created. Please{" "}
            <Link to="/signin">Sign in!</Link>
          </div>

          <form>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                onChange={this.handleChange("name")}
                type="text"
                className="form-control"
                value={name}
              />
            </div>
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
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
