import React, { Component } from "react";
import {Link} from "react-router-dom";
class ActivityDetails extends React.Component{
    state = {
        isLoading: true,
        users: [],
        error: null
      };
    
      fetchUsers() {
        fetch("http://localhost:8080/findById/1035")
          .then(response => response.json())
          .then(data =>
            this.setState({
              users: data,
              isLoading: false,
            })
          )
          .catch(error => this.setState({ error, isLoading: false }));
      }
    
      componentDidMount() {
        this.fetchUsers();
      }
      render() {
        const { isLoading, users, error } = this.state;
        return (
          <React.Fragment>
            <h1>Random User</h1>
            {error ? <p>{error.message}</p> : null}
            {!isLoading ? (
              users.map(user => {
                const { sessionId, status } = user;
                return (
                  <div key={sessionId}>
                    <p>Activity ID: {sessionId}</p>
                    <p>Status: {status}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <h3>Loading...</h3>
            )}
          </React.Fragment>
        );
      }
}

//ReactDOM.render(<ActivityList />,document.getElementById("root"));
export default ActivityDetails;