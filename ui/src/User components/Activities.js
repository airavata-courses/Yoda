import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
import { isAuthenticated } from "../auth/index";

class Activities extends Component {
    constructor(){
        super()
        this.state = {
            activities: [],
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user ? isAuthenticated().user._id : "";
        this.setState({activities: this.fetchActivities(userId)});        
      }

    fetchActivities = userId => {
        return fetch("http://localhost:3100/retrieveactivities",{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userId)
        })
        .then(response => {
            return response.json();
          })
          .catch(err => console.log(err));
    }

    renderActivities = activities => {
        return(
            <div className="row">
            {activities.map((activity, i) => {
                return(
                    <div className="col-md-4 col-xs-6 mb-2" key={i}>
                    <h6 class="card-subtitle">{activity.sessionId}</h6>
                    <h4 class="card-title">{activity.status}</h4>
                    </div>
                )
            })}
            </div>
        )
    }

    render(){
        const {email, password, error, redirectToReferer, loading} = this.state;

        if(redirectToReferer){
            return <Redirect to="/" />
        }

        return(
            <div className="container">
            <h2 className="mt-5 mb-5">Login</h2>

            <div className="alert alert-primary"
                style={{display: error? "": "none"}}
            >
            {error}
            </div>
            
        {loading ? (<div className="jumbotron text-center"><h2>Loading ...</h2></div>) : ("")}

            <form>
                <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={this.handleChange("email")} 
                    type="email" 
                    className="form-control"
                    value = {email}
                />
                </div>
                <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={this.handleChange("password")} 
                    type="password" 
                    className="form-control"
                    value = {password}
                />
                </div>
                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                <div className="form-group">
                    <Link className="nav-link text-muted" to="/signup">
                        Don't have an account? Sign Up
                    </Link>
                    <Link
                        to="/forgot-password"
                        className=" nav-link mx-auto text-muted"
                    >
                        Forgot Password? Reset it
                    </Link>
                </div>
            </form>
            </div>
        );
    }
}


export default Activities;