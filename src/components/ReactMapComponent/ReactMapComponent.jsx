import "./ReactMapComponent.css";
import { useContext, useEffect, useState } from "react";
import { PassengerContext } from "../../contexts/PassengerContext";
import { DriverContext } from "../../contexts/DriverContext";
import useOnclickOutside from "react-cool-onclickoutside";
import { predefinedPlaces } from "../data/predefinedPlaces/predefinedPlaces";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMarkerRef,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import PriceCalculator from "../PriceCalculator/PriceCalculator";

const ReactMapComponent = ({ onDestinationSelected }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useMarkerRef();
  const [open, setOpen] = useState(false);
  const { placeNameDriver, setPlaceNameDriver } = useContext(DriverContext);
  const { placeNamePassenger, setPlaceNamePassenger } =
    useContext(PassengerContext);
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({ lat: 57.6348, lng: 18.29484 });
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const ref = useOnclickOutside(() => {
    setSuggestions([]);
  });

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (inputValue) {
      const filteredSuggestions = predefinedPlaces.filter((place) =>
        place.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => () => {
    setIsClicked(true);
    setValue(place.name);
    setSuggestions([]);
    setPlaceNameDriver(place.name);
    setPosition({ lat: place.lat, lng: place.lng });
    onDestinationSelected();
    setSelectedPlace(place); // Store the selected place
  };

  const renderSuggestions = () =>
    suggestions.map((suggestion, index) => (
      <li
        className="li-tag-destination-suggestions"
        key={index}
        onClick={handleSelect(suggestion)}
      >
        <strong>{suggestion.name}</strong>
      </li>
    ));

  return (
    <>
      <div className="google-maps-container">
        <div className="user-input-map-container">
          <div ref={ref} className="google-map-ref">
            <input
              className="input-destination-search-bar"
              value={value}
              onChange={handleInput}
              placeholder="Din slutdestination:"
            />
            {suggestions.length > 0 && (
              <ul className="google-maps-renderSuggestions">
                {renderSuggestions()}
              </ul>
            )}
          </div>
        </div>
        {isClicked && (
          <div className="user-map-container">
            <div className="user-map-price-calculator">
              <PriceCalculator
                distance={selectedPlace.distance}
                rate={2.5}
                name={selectedPlace.name}
              />
            </div>
            <div>
              <APIProvider apiKey={"YOUR_GOOGLE_MAPS_API_KEY"}>
                <div style={{ height: "30vh " }}>
                  <Map zoom={12} center={position} mapId={"e7b9c1e6b6c3c6a7"}>
                    <AdvancedMarker
                      position={position}
                      onClick={() => setOpen(true)}
                    >
                      <Pin background={"gray"} borderColor={"yellow"} />
                    </AdvancedMarker>
                    {open && (
                      <InfoWindow
                        position={position}
                        onCloseClick={() => setOpen(false)}
                      >
                        <p>{placeNameDriver}</p>
                      </InfoWindow>
                    )}
                  </Map>
                </div>
              </APIProvider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReactMapComponent;

// import "./ReactMapComponent.css";
// import { useContext } from "react";
// import { set } from "date-fns";
// import { PassengerContext } from "../../contexts/PassengerContext";
// import { DriverContext } from "../../contexts/DriverContext";

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";

// import React, { useEffect, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Marker,
//   useMarkerRef,
//   Pin,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";

// const ReactMapComponent = () => {
//   //MAP
//   const [markerRef, marker] = useMarkerRef();
//   const [open, setOpen] = useState(false);
//   const { placeNameDriver, setPlaceNameDriver } = useContext(DriverContext);
//   const { placeNamePassenger, setPlaceNamePassenger } = useContext(PassengerContext);
//   const [isClicked, setIsClicked] = useState(false);

//   // VISBY
//   const InitPosition = { lat: 57.6348, lng: 18.29484 };
//   const mapId = "e7b9c1e6b6c3c6a7";
//   const [position, setPosition] = useState(InitPosition);
//   const mapOptions = {
//     gestureHandling: "none", // Disable scroll and other gestures
//   };

//   //  const { value, setValue } = usePlacesAutocomplete();

//   //  const handleInput = (e) => {
//   //    // Place a "string" to update the value of the input element
//   //    setValue(e.target.value);
//   //  };

//   useEffect(() => {
//     if (!marker) {
//       return;
//     }

//     // do something with marker instance here
//   }, [marker]);

//   // INPUT
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     callbackName: "UserActivationcallback",
//     requestOptions: {
//       /* Define search scope here */
//     },
//     debounce: 300,
//   });
//   const ref = useOnclickOutside(() => {
//     // When the user clicks outside of the component, we can dismiss
//     // the searched suggestions by calling this method
//     clearSuggestions();
//   });

//   const handleInput = (e) => {
//     // Update the keyword of the input element
//     setValue(e.target.value);

//   };

//   const handleSelect =
//     ({ description }) =>
//     () => {
//       // When the user selects a place, we can replace the keyword without request data from API
//       // by setting the second parameter to "false"
//       setIsClicked(true);
//       setValue(description, false);
//       clearSuggestions();
//       setPlaceNameDriver(description);
//       // Get latitude and longitude via utility functions
//       getGeocode({ address: description }).then((results) => {
//         const { lat, lng } = getLatLng(results[0]);
//         setPosition({ lat, lng });
//         console.log("📍 Coordinates: ", { lat, lng });
//       });
//     };

//     useEffect(() => {
//       console.log(placeNameDriver);
//     }, [placeNameDriver]);

//   const renderSuggestions = () =>
//     data.map((suggestion) => {
//       const {
//         place_id,
//         structured_formatting: { main_text, secondary_text },
//       } = suggestion;

//       return (
//         <li className="li-tag-destination-suggestions" key={place_id} onClick={handleSelect(suggestion)}>
//           <strong>{main_text}</strong> <small>{secondary_text}</small>
//         </li>
//       );
//     });

//   return (
//     <>
//       <div className="google-maps-container">
//         <div className="user-input-map-container">
//           <div ref={ref} className="google-map-ref">
//             <input
//               className="input-destination-search-bar"
//               value={value}
//               onChange={handleInput}
//               disabled={!ready}
//               placeholder="Ange din slutdestionation här:"
//             />
//             {/* We can use the "status" to decide whether we should display the dropdown or not */}
//             {status === "OK" && <ul className="google-maps-renderSuggestions">{renderSuggestions()}</ul>}
//           </div>
//         </div>
//         {isClicked && (
//         <div className="user-map-container">
//           <div>
//             <APIProvider apiKey={''}>
//               <div style={{ height: "40vh " }}>
//                 <Map zoom={12} center={position} mapId={mapId}>
//                   <AdvancedMarker
//                     position={position}
//                     onClick={() => setOpen(true)}
//                   >
//                     <Pin background={"gray"} borderColor={"yellow"} />
//                     <div>
//                       <input value={value} onChange={handleInput} />
//                       {/* Render dropdown */}
//                     </div>
//                   </AdvancedMarker>

//                   {/* <Marker ref={markerRef} position={position} /> */}
//                   {open && (
//                     <InfoWindow
//                       position={position}
//                       onCloseClick={() => setOpen(false)}
//                     >
//                       <p>Im in Visby</p>
//                     </InfoWindow>
//                   )}
//                 </Map>
//               </div>
//             </APIProvider>
//           </div>
//         </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ReactMapComponent;
