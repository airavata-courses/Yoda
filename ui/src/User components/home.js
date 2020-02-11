import React, {Component} from "react";
import { Link  } from "react-router-dom";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/index";

class home extends Component {
    render(){
        return(
            <div>
                <Menu/>
            <div class="row ml-auto mr-auto">
            <div class="col-sm-5">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Real-time data</h5>
                    <p class="card-text">Get real-time of weather of any place at the go!</p>
                    <Link to="/real-time" class="btn btn-primary">Get data</Link>
                </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">NEXRAD data</h5>
                    <p class="card-text">Get customized weather of any place!</p>
                    {!isAuthenticated() && (
                        <p>Requires <Link to ="/signin">Sign in</Link></p>
                    )}
                    {isAuthenticated() && (
                        <Link to="/nexrad-data" class="btn btn-primary">Get data</Link>
                    )}
                    
                </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default home;