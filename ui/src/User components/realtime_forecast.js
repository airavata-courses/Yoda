import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { isAuthenticated } from "../auth/index";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class Forecast extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     detailedForecast: this.props.detailedForecast,
  //     shortForecast: this.props.shortForecast,
  //     windSpeed: this.props.windSpeed,
  //     windDirection: this.props.windDirection,
  //     temperature: this.props.temperature,
  //     temperatureUnit: this.props.temperatureUnit
  //   };
  // }

  render() {
    //   const forecast = this.props.forecast;
      return(
    //     <div>
    //     <h1>{this.props.detailedForecast}</h1>
    // </div>
    <container>
    <div className="card" style={{width: 500, height: 500}}>
    <img src={this.props.icon} className="card-img-top" alt="..." style={{height: 300}}></img>
    <div className="card-body">
      {/* <h5 className="card-title">Forecast</h5> */}
      <h1 className="card-title">{this.props.shortForecast}</h1>
      <p className="card-text">{this.props.detailedForecast}</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Temperature : {this.props.temperature}{this.props.temperatureUnit}</li>
      <li className="list-group-item">Wind Speed: {this.props.windSpeed} </li>
      <li className="list-group-item">Wind Direction: {this.props.windDirection}</li>
    </ul>
  </div>
  </container>
 
      )
      
    
  }
}

export default Forecast;
