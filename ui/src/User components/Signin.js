import React, {Component} from "react";

class Signin extends Component {
    constructor(){
        super()
        this.state = {

            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            errorMessage: ""

        }
    }

    handleChange = (name) => event => {
        this.setState({error: ""})
        this.setState({ [name]: event.target.value});
    };

    authenticate = (jwt, next) => {
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
          email: email,
          password: password
        };
        // console.log(user);
        this.signin(user).then(data => {
          if (data && data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ errorMessage: "" });
            // authenticate user
            this.authenticate(data, () => {
              this.setState({ redirectToReferer: true });
            });
    
            // redirect
          }
        });
      };

    signin = user => {
        return fetch("http://localhost:8080/signin",{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:8080"

            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
          })
          .catch(err => console.log(err));
    }

    render(){
        const {email, password, error, redirectToReferer, loading} = this.state;
        return(
            <div className="container">
            <h2 className="mt-5 mb-5">Login</h2>

            <div className="alert alert-primary"
                style={{display: error? "": "none"}}
            >
            {error}
            </div>

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
            </form>
            </div>
        );
    }
}


export default Signin;