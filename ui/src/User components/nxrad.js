import React, {Component} from "react";
import Menu from "./Menu";
import radars from "../radar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class nexrad extends Component {
    constructor(){
        super()
        this.state = {
            selectValue: "",
            Date: new Date(),
            selectedDate: ""
        };
    }

    clickSubmit = event => {
        event.preventDefault();
        var radar = this.state.selectValue;
        //Date selectedDate = this.Date;
        var selectedDate = this.state.selectedDate;
        console.log(radar,selectedDate);
        const requested = {
            radar: radar,
            date: selectedDate
        }
        console.log(requested)
        //const response = this.sendSelected(radar, payload);
      };

      sendSelected = requested => {
        return fetch("http://localhost:3100/retrievedata",{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requested)
        })
        .then(response => {
            return response.json();
          })
          .catch(err => console.log(err));
    }

      handleRadar = e =>{
        this.setState({selectValue:e.target.value});
      }

    handleChange = date => {
        this.setState({
          Date: date
          
        });
        var temp = String(date).split(' ');
        var payload = {
            "month": temp[1],
            "date": temp[2],
            "year": temp[3]
        }
        this.setState({selectedDate: payload})
      };

    render(){
        
        return(
            <div>
                <Menu />
                <DatePicker {...({ placeholder: "Select date" })}
        selected={this.state.Date}
        onChange={this.handleChange}
      />
            <div className="input-group ml-3 mt-3" inline style={{ width: 300, justifyContent: 'center' }}>
                <select className="custom-select" id="inputGroupSelect04" value={this.state.selectValue} 
        onChange={this.handleRadar}>
                    <option selected>Choose...</option>
                    {radars.radars && radars.radars.map((radar,i) => {
                return <option selected>{radar.radar}</option>;
            })}
                </select>
                <div className="input-group-append">
                    <button onClick={this.clickSubmit} className="btn btn-outline-secondary" type="button">Get Data</button>
                </div>
            </div>
            </div>

        );
    }
}

export default nexrad;