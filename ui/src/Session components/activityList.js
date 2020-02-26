import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import Menu from "../User components/Menu";
import axios from "axios";

class ActivityList extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  async fetchUsers(payload) {
    let response = await axios.post(
      "http://localhost:3100/retrieveactivities",
      payload
    );
    console.log(response.data);
    if (response.data.length != 0) {
      this.setState({
        users: response.data,
        isLoading: false
      });
    } else {
      this.setState({
        users: null,
        isLoading: false
      });
    }
  }

  componentDidMount() {
    const userId = isAuthenticated() ? isAuthenticated().user._id : "";
    // const userName = isAuthenticated() ? isAuthenticated().user.name : "";
    const payload = {
      user_id: userId
    };
    this.fetchUsers(payload);
  }
  render() {
    const { isLoading, users, error } = this.state;
    const userName = isAuthenticated() ? isAuthenticated().user.name : "";
    return (
      <div>
        <Menu />
        <React.Fragment>
          <h1>Activity List for {userName} </h1>
          <hr />
          {error ? <p>{error.message}</p> : null}
          {!isLoading && users ? (
            users.map((user, index) => {
              return (
                <div key={index}>
                  <Link to={`/ActivityDetails/${user.sessionId}`}>
                    Activity ID: {user.sessionId}
                  </Link>
                  <p>Status: {user.status}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <div>
              <h3>
                Please create a new job from <Link to={`/`}>Dashboard!</Link>
              </h3>
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

//ReactDOM.render(<ActivityList />,document.getElementById("root"));
export default ActivityList;
