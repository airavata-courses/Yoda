import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import axios from "axios";
import Menu from "../User components/Menu";

class ActivityDetails extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  async fetchUsers(payload) {
    let response = await axios.post(
      "http://localhost:3100/getactivity",
      payload
    );
    console.log(response.data);
    if (response.data) {
      this.setState({
        users: response.data,
        isLoading: false
      });
    } else {
      const newData = [
        {
          sessionId: "1",
          status: "No activities yet for the user!!"
        }
      ];
      this.setState({
        users: newData,
        isLoading: false
      });
    }
  }

  componentDidMount() {
    const userId = isAuthenticated() ? isAuthenticated().user._id : "";
    console.log(this.props);
    const sessionId = this.props.match.params.session_id;
    const payload = {
      user_id: userId,
      session_id: sessionId
    };
    console.log(sessionId);
    console.log(payload);
    this.fetchUsers(payload);
  }
  render() {
    const { isLoading, users, error } = this.state;
    const userName = isAuthenticated() ? isAuthenticated().user.name : "";
    return (
      <div>
        <React.Fragment>
          <Menu />
          <h1>Nexrad Job Details</h1>
          <br />
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            users.map((user, index) => {
              // const { sessionId, status } = user;
              let data = JSON.parse(user);
              return (
                <div key={index}>
                  <p>Activity ID: {data.sessionId}</p>
                  <p>Year: {data.year}</p>
                  <p>Month: {data.month}</p>
                  <p>Day: {data.day}</p>
                  <p>Radar ID: {data.radar}</p>
                  <img src={data.image} alt="NEXRAD JOB" />
                  <hr />
                </div>
              );
            })
          ) : (
            <h3>Loading..</h3>
          )}
        </React.Fragment>
      </div>
    );
  }
}

//ReactDOM.render(<ActivityList />,document.getElementById("root"));
export default ActivityDetails;
