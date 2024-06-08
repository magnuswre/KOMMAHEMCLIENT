import "./ReactMapComponent.css";
import { useContext, useEffect, useState } from "react";
import { PassengerContext } from "../../contexts/PassengerContext";
import { DriverContext } from "../../contexts/DriverContext";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMarkerRef,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const predefinedPlaces = [
  { name: "Akebäck", lat: 57.54754931574185, lng: 18.392084848319442 },
  { name: "Ala", lat: 57.42354184171825, lng: 18.632247869463818 },
  { name: "Alskog", lat: 57.33197570635875, lng: 18.628600538182596 },
  { name: "Alva", lat: 57.20777538482792, lng: 18.36089236876532 },
  { name: "Ardre", lat: 57.3928, lng: 18.7279 },
  { name: "Atlingbo", lat: 57.4461, lng: 18.3963 },
  { name: "Bara", lat: 57.4778, lng: 18.4734 },
  { name: "Barlingbo", lat: 57.5711, lng: 18.4418 },
  { name: "Björke", lat: 57.5278, lng: 18.4767 },
  { name: "Boge", lat: 57.7369, lng: 18.7658 },
  { name: "Bro", lat: 57.6633, lng: 18.4654 },
  { name: "Bunge", lat: 57.8746, lng: 19.0167 },
  { name: "Burs", lat: 57.3139, lng: 18.5019 },
  { name: "Buttle", lat: 57.4358, lng: 18.5122 },
  { name: "Bäl", lat: 57.6717, lng: 18.6333 },
  { name: "Dalhem", lat: 57.5514, lng: 18.6008 },
  { name: "Eke", lat: 57.3158, lng: 18.3844 },
  { name: "Ekeby", lat: 57.6067, lng: 18.4917 },
  { name: "Eksta", lat: 57.2817, lng: 18.2675 },
  { name: "Endre", lat: 57.5736, lng: 18.4414 },
  { name: "Eskelhem", lat: 57.5267, lng: 18.2394 },
  { name: "Etelhem", lat: 57.3478, lng: 18.5725 },
  { name: "Fardhem", lat: 57.3042, lng: 18.4369 },
  { name: "Fide", lat: 57.0025, lng: 18.2817 },
  { name: "Fleringe", lat: 57.9239, lng: 19.0242 },
  { name: "Fole", lat: 57.6406, lng: 18.6317 },
  { name: "Follingbo", lat: 57.6011, lng: 18.4569 },
  { name: "Fröjel", lat: 57.3031, lng: 18.2083 },
  { name: "Fårö", lat: 57.9425, lng: 19.1378 },
  { name: "Gammelgarn", lat: 57.4428, lng: 18.7289 },
  { name: "Ganthem", lat: 57.5156, lng: 18.5722 },
  { name: "Garde", lat: 57.3725, lng: 18.5706 },
  { name: "Gerum", lat: 57.2981, lng: 18.2922 },
  { name: "Gothem", lat: 57.5764, lng: 18.7297 },
  { name: "Grötlingbo", lat: 57.1303, lng: 18.3928 },
  { name: "Guldrupe", lat: 57.4408, lng: 18.4342 },
  { name: "Hablingbo", lat: 57.2297, lng: 18.2753 },
  { name: "Halla", lat: 57.4036, lng: 18.4392 },
  { name: "Halls", lat: 57.7053, lng: 18.7342 },
  { name: "Hamra", lat: 57.0208, lng: 18.2908 },
  { name: "Hangvar", lat: 57.7861, lng: 18.6542 },
  { name: "Havdhem", lat: 57.1878, lng: 18.3797 },
  { name: "Hejde", lat: 57.4517, lng: 18.4106 },
  { name: "Hejdeby", lat: 57.6244, lng: 18.4828 },
  { name: "Hejnum", lat: 57.6994, lng: 18.6189 },
  { name: "Hellvi", lat: 57.8325, lng: 18.9194 },
  { name: "Hemse", lat: 57.23791110037961, lng: 18.37674318413476 },
  { name: "Hogrän", lat: 57.4494, lng: 18.4472 },
  { name: "Hörsne", lat: 57.5547, lng: 18.5736 },
  { name: "Klintehamn", lat: 57.387169155005395, lng: 18.203785299605766 },
  { name: "Kräklingbo", lat: 57.4436, lng: 18.7106 },
  { name: "Källunge", lat: 57.5639, lng: 18.6628 },
  { name: "Lau", lat: 57.3061, lng: 18.7136 },
  { name: "Levide", lat: 57.3161, lng: 18.3736 },
  { name: "Linde", lat: 57.3614, lng: 18.3422 },
  { name: "Lojsta", lat: 57.3339, lng: 18.3836 },
  { name: "Lokrume", lat: 57.6717, lng: 18.5958 },
  { name: "Lummelunda", lat: 57.6908, lng: 18.5478 },
  { name: "Lye", lat: 57.3117, lng: 18.5978 },
  { name: "Lärbro", lat: 57.7644, lng: 18.7253 },
  { name: "Martebo", lat: 57.6842, lng: 18.5756 },
  { name: "Mästerby", lat: 57.5094, lng: 18.4081 },
  { name: "Norrlanda", lat: 57.4867, lng: 18.6714 },
  { name: "När", lat: 57.275, lng: 18.6947 },
  { name: "Näs", lat: 57.1181, lng: 18.3056 },
  { name: "Othem", lat: 57.6994, lng: 18.7353 },
  { name: "Roma", lat: 57.515, lng: 18.5161 },
  { name: "Rone", lat: 57.20972703562073, lng: 18.44305733807873 },
  { name: "Rute", lat: 57.8417, lng: 18.8703 },
  { name: "Sanda", lat: 57.4208, lng: 18.2267 },
  { name: "Sjonhem", lat: 57.5297, lng: 18.5058 },
  { name: "Sproge", lat: 57.2592, lng: 18.2522 },
  { name: "Stenkumla", lat: 57.5522, lng: 18.3314 },
  { name: "Stenkyrka", lat: 57.7381, lng: 18.6533 },
  { name: "Stånga", lat: 57.2622, lng: 18.5047 },
  { name: "Sundre", lat: 56.9306, lng: 18.2892 },
  { name: "Tingstäde", lat: 57.7042, lng: 18.5778 },
  { name: "Tofta", lat: 57.5581, lng: 18.1897 },
  { name: "Träkumla", lat: 57.5423, lng: 18.3098 },
  { name: "Valls", lat: 57.5513, lng: 18.6395 },
  { name: "Vallstena", lat: 57.6098, lng: 18.6368 },
  { name: "Vamlingbo", lat: 56.9992, lng: 18.2874 },
  { name: "Viklau", lat: 57.4592, lng: 18.4948 },
  { name: "Vänge", lat: 57.5402, lng: 18.5703 },
  { name: "Väskinde", lat: 57.6787, lng: 18.4732 },
  { name: "Västergarn", lat: 57.4283, lng: 18.1604 },
  { name: "Västerhejde", lat: 57.5898, lng: 18.2908 },
  { name: "Väte", lat: 57.3933, lng: 18.4817 },
  { name: "Öja", lat: 57.1932, lng: 18.2463 },
  { name: "Östergarn", lat: 57.4133, lng: 18.7554 },
];

const ReactMapComponent = () => {
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
    console.log("📍 Coordinates: ", { lat: place.lat, lng: place.lng });
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
