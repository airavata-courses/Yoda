import React, {Component} from "react";
import { Link  } from "react-router-dom";
import Menu from "./Menu";
import { isAuthenticated } from "../auth/index";
import {Button, Form} from 'react-bootstrap';
import LocationSearchInput from "./AutoPlaces";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";


class RealTime extends Component {
    constructor(props){
        super(props)
        this.state = {
            address: "",
            setAddress: "",
            coordinates: null,
            setCoordinates: null
        }
    }

    handleSelect = async(value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setState({setAddress: value});
        this.setState({setCoordinates: latLng});
      };

    render(){
        return(
            // <div>
            //     <Menu/>
            //     {/* <LocationSearchInput/> */}

            //     <form class="form-inline mt-3" inline style={{ justifyContent: 'center' }}>
            //         <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            //         <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            //     </form>
                
            
            // </div>
            <div>
            <PlacesAutocomplete
                value={this.address}
                onChange={this.setAddress}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>

                    <p>Latitude: {this.coordinates}</p>
                    <p>Longitude: {this.coordinates}</p>

                    <input  {...getInputProps({ placeholder: "Type address" })} />

                    <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                        const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
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
            </div>
        );
    }
}

export default RealTime;


// import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
 
// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }
 
//   handleChange = address => {
//     this.setState({ address });
//   };
 
//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };
 
//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }

// export default LocationSearchInput;