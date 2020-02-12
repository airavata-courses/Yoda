import React, { Component } from "react";
import Menu from "./Menu";
import radars from "../radar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAuthenticated } from "../auth/index";

class nexrad extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: "",
      Date: new Date(),
      selectedDate: "",
      user_id: ""
    };
  }

  componentDidMount() {
    this.setState({
      user_id: isAuthenticated() ? isAuthenticated().user._id : ""
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
    console.log(response);
  };

  async sendSelected(requested) {
    let response = await axios.post(
      "http://localhost:3100/retrievedata",
      requested
    );
    return response;
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
              Get Data
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default nexrad;
