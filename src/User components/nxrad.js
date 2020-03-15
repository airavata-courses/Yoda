import React, { Component } from "react";
import Menu from "./Menu";
import radars from "../radar";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAuthenticated } from "../auth/index";

class nexrad extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: "",
      date: new Date(),
      selectedDate: this.date,
      user_id: "",
      session_id: ""
    };
  }

  componentDidMount() {
    this.setState({
      user_id: isAuthenticated() ? isAuthenticated().user._id : "",
      session_id: ""
    });
  }

  clickSubmit = event => {
    event.preventDefault();
    var radar = this.state.selectValue;
    //Date selectedDate = this.Date;
    var selectedDate = this.state.selectedDate;
    var user_id = this.state.user_id;
    // console.log(radar, selectedDate);
    const requested = {
      radar: radar,
      date: selectedDate,
      user_id: user_id
    };
    console.log(requested);
    const response = this.sendSelected(requested);
    console.log(this.session_id);
  };

  async sendSelected(requested) {
    let response = await axios.post("/gatewayservice/retrievedata", requested);
    this.setState({ session_id: response.data });
    console.log(response.data);
    return response.data;
  }

  handleRadar = e => {
    this.setState({ selectValue: e.target.value });
  };

  handleChange = date => {
    this.setState({
      Date: date
    });
    var temp = String(date).split(" ");
    var payload = {
      month: temp[1],
      date: temp[2],
      year: temp[3]
    };
    this.setState({ selectedDate: payload });
  };

  render() {
    const session_id = this.state.session_id;
    return (
      <div>
        <Menu />
        <div
          className="input-group ml-3 mt-3"
          inline
          style={{ width: 650, justifyContent: "center" }}
        >
          <select
            className="custom-select"
            id="inputGroupSelect04"
            value={this.state.selectValue}
            onChange={this.handleRadar}
          >
            <option selected>Choose radar ID</option>
            {radars.radars &&
              radars.radars.map((radar, i) => {
                return <option selected>{radar.radar}</option>;
              })}
          </select>
          <DatePicker
            {...{ placeholder: "Select date" }}
            selected={this.state.Date}
            onChange={this.handleChange}
            maxDate={new Date()}
          />
          <div className="input-group-append">
            <button
              onClick={this.clickSubmit}
              className="btn btn-outline-secondary"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
        <br />
        <br />
        {session_id ? (
          <div>
            <p>An activity was created with ID: {session_id}</p>
            <h3>
              Please go to <Link to="/activities">Activities</Link> to view the
              results of the job
            </h3>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default nexrad;
