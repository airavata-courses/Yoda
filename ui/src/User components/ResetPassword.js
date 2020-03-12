import React, { Component } from "react";
import { Link } from "react-router-dom";
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      message: "",
      error: ""
    };
  }

  resetPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });

    this.resetPassword({
      newPassword: this.state.newPassword,
      resetPasswordLink: this.props.match.params.resetPasswordToken
    }).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message, newPassword: "" });
      }
    });
  };

  resetPassword = resetInfo => {
    return fetch("http://localhost:3200/reset-password/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resetInfo)
    })
      .then(response => {
        console.log("forgot password response: ", response);
        return response.json();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Reset your Password</h2>

        {this.state.message && (
          <h4 className="bg-success">{this.state.message}</h4>
        )}
        {this.state.error && <h4 className="bg-warning">{this.state.error}</h4>}

        <form>
          <div className="form-group mt-5">
            <input
              type="password"
              className="form-control"
              placeholder="Your new password"
              value={this.state.newPassword}
              name="newPassword"
              onChange={e =>
                this.setState({
                  newPassword: e.target.value,
                  message: "",
                  error: ""
                })
              }
              autoFocus
            />
          </div>
          <button
            onClick={this.resetPassword}
            className="btn btn-raised btn-primary"
          >
            Reset Password
          </button>
          <Link className="nav-link mx-auto" to="/signin">
            Sign in
          </Link>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
