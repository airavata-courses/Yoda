import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Menu from "./Menu";

export default function AutoPlaces() {
  const [address, setAddress, value, selected] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    const selected = results[0]['formatted_address'];
    var temp = selected.split(',');
    var payload = {
        "city": temp[0],
        "state": temp[1]
    }
    const response = this.sendSelected(payload)

  };

  const sendSelected = payload => {
    return fetch("http://localhost:3100/realtime",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
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

            <div className="container" inline style={{width:500}}>
            <form class="form-inline mt-3" inline style={{ justifyContent: 'center' }}>
            <input class="form-control mr-sm-2" type="search" aria-label="Search" {...getInputProps({ placeholder: "Search address" })} />
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