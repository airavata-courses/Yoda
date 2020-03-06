import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

class Activities extends Component {
  constructor() {
    super();
    this.state = {
      activities: []
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user ? isAuthenticated().user._id : "";
    this.setState({ activities: this.fetchActivities(userId) });
  }

  fetchActivities = userId => {
    fetch("http://localhost:3100/retrieveactivities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3100"
      },
      body: JSON.stringify(userId)
    })
      .then(response => {
        console.log(response.json());
      })
      .then(data => {
        this.setState({ activities: data });
      })
      .catch(err => console.log(err));
  };

  renderActivities = activities => {
    return (
      <div className="row">
        {activities.map((activity, i) => {
          return (
            <div className="col-md-4 col-xs-6 mb-2" key={i}>
              <h6 class="card-subtitle">{activity.sessionId}</h6>
              <h4 class="card-title">{activity.status}</h4>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const activities = this.state;
    return this.renderActivities(activities);
  }
}

export default Activities;
