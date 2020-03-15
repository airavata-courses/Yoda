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
      "/gatewayservice/retrieveactivities",
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
          <h2>Activity List for {userName} </h2>
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
              <br />
              <p>No activity has been created yet!</p>
              <p>
                Please create a new job from <Link to={`/`}>Dashboard!</Link>
              </p>
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

//ReactDOM.render(<ActivityList />,document.getElementById("root"));
export default ActivityList;
