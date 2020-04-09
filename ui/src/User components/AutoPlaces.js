import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Menu from "./Menu";
import {response} from "./response";
import axios from "axios";
import Forecast from "./realtime_forecast";

export default function AutoPlaces() {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [detailedForecast, setForecast] = React.useState("");
  const [shortForecast, setshortForecast] = React.useState("");
  const [temperature, settemperature] = React.useState("");
  const [temperatureUnit, settemperatureUnit] = React.useState("");
  const [windDirection, setwindDirection] = React.useState("");
  const [windSpeed, setwindSpeed] = React.useState("");
  const [icon, seticon] = React.useState("");
  const [periods,setPeriods] = React.useState([]);
  const [fores,setFore] = React.useState([]);
  const [hidden, setHidden] = React.useState(true);
  // const reponsemy = JSON.parse(response);
  // console.log(reponsemy)

    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
      // console.log(lats);
      const selected = results[0]["formatted_address"];
      var temp = selected.split(",");
      var payload = {
        city: temp[0],
        state: temp[1].trim()
      };
      //console.log(payload);
      // const response = response;
      const response = sendSelected(payload);
    };

  async function sendSelected(payload) {
    let response = await axios.post("/gatewayserver/realtime", payload);
    console.log(response);
    // if (!response.data.data.forecast["detailedForecast"]){
    //   console.log("undefined response");
    //   // return(<h1>Real Time data not available currently. Please try again later.</h1>)
    // }else{
    // var fore = response.data.data.forecast;
    var period = response.data.forecast.properties.periods;
    console.log(periods);
    // setForecast(fore["detailedForecast"]);
    // setshortForecast(fore["shortForecast"]);
    // settemperature(fore["temperature"]);
    // settemperatureUnit(fore["temperatureUnit"]);
    // setwindDirection(fore["windDirection"]);
    // setwindSpeed(fore["windSpeed"]);
    // seticon(fore["icon"]);
    // setFore(fore);
    setPeriods(period);
    setHidden(false);
    // }
    
    // console.log(fores);   
  }

  return (
    <div>
      <Menu />
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="container" style={{ width: 500 }}>
              <form
                className="form-inline mt-3"
                style={{ justifyContent: "center" }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  aria-label="Search"
                  {...getInputProps({ placeholder: "Search address" })}
                />
              </form>

              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fafafa"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> 
      {/* <h1>detailed forecast: {detailedForecast}</h1> */}
      {!hidden ? 
      <div>
      {/* <Forecast detailedForecast={detailedForecast} shortForecast={shortForecast} temperature={temperature} temperatureUnit={temperatureUnit} windDirection={windDirection} windSpeed={windSpeed} icon={icon} /> */}
      {/* <p></p>  */}
      <h1>Weekly Forecast</h1> 
      <Forecast detailedForecast={periods[1]["detailedForecast"]} shortForecast={periods[1]["shortForecast"]} temperature={periods[1]["temperature"]} temperatureUnit={periods[1]["temperatureUnit"]} windDirection={periods[1]["windDirection"]} windSpeed={periods[1]["windSpeed"]} icon={periods[1]["icon"]} />
      <br/>
      <Forecast detailedForecast={periods[3]["detailedForecast"]} shortForecast={periods[3]["shortForecast"]} temperature={periods[3]["temperature"]} temperatureUnit={periods[3]["temperatureUnit"]} windDirection={periods[3]["windDirection"]} windSpeed={periods[3]["windSpeed"]} icon={periods[3]["icon"]} />
      <br/>
      <Forecast detailedForecast={periods[5]["detailedForecast"]} shortForecast={periods[5]["shortForecast"]} temperature={periods[5]["temperature"]} temperatureUnit={periods[5]["temperatureUnit"]} windDirection={periods[5]["windDirection"]} windSpeed={periods[5]["windSpeed"]} icon={periods[5]["icon"]} />
      <br/>
      <Forecast detailedForecast={periods[7]["detailedForecast"]} shortForecast={periods[7]["shortForecast"]} temperature={periods[7]["temperature"]} temperatureUnit={periods[7]["temperatureUnit"]} windDirection={periods[7]["windDirection"]} windSpeed={periods[7]["windSpeed"]} icon={periods[7]["icon"]} />
      <br/>
      <Forecast detailedForecast={periods[9]["detailedForecast"]} shortForecast={periods[9]["shortForecast"]} temperature={periods[9]["temperature"]} temperatureUnit={periods[9]["temperatureUnit"]} windDirection={periods[9]["windDirection"]} windSpeed={periods[9]["windSpeed"]} icon={periods[9]["icon"]} />
      <br/>
      <Forecast detailedForecast={periods[11]["detailedForecast"]} shortForecast={periods[11]["shortForecast"]} temperature={periods[11]["temperature"]} temperatureUnit={periods[11]["temperatureUnit"]} windDirection={periods[11]["windDirection"]} windSpeed={periods[11]["windSpeed"]} icon={periods[11]["icon"]} /> 
      </div>
      : null}
         
      
    </div>
  );
}