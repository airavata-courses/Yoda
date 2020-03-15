import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Menu from "./Menu";
import response from "./response";
import axios from "axios";

export default function AutoPlaces() {
  const [address, setAddress, forecast] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    const selected = results[0]["formatted_address"];
    var temp = selected.split(",");
    var payload = {
      city: temp[0],
      state: temp[1].trim()
    };
    console.log(payload);
    const response = sendSelected(payload);
    // renderResponse(response);
  };

  async function sendSelected(payload) {
    let response = await axios.post("/gatewayservice/realtime", payload);
    console.log(response.data);
    return response.data;
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
            {/* <p>Longitude: {coordinates.lng}</p> */}

            <div className="container" inline style={{ width: 500 }}>
              <form
                className="form-inline mt-3"
                inline
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
            {/* <p>Selected value: {suggestion}</p> */}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
