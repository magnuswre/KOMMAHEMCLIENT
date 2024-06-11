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
import PriceCalculator from "../PriceCalculator/PriceCalculator";

const predefinedPlaces = [
  {
    name: "Akebäck",
    lat: 57.54754931574185,
    lng: 18.392084848319442,
    distance: 15,
    comment: "Akebäck Kyrka",
  },
  {
    name: "Ala",
    lat: 57.4190297,
    lng: 18.6351653,
    distance: 36,
    comment: "Ala Kyrka",
  },
  {
    name: "Alskog",
    lat: 57.3314785,
    lng: 18.6273462,
    distance: 51,
    comment: "Alskogs Kyrka",
  },
  {
    name: "Alva",
    lat: 57.2075059,
    lng: 18.3613878,
    distance: 55,
    comment: "Alva Kyrka",
  },
  {
    name: "Anga",
    lat: 57.4804026,
    lng: 18.7063973,
    distance: 39,
    comment: "Anga Kyrka",
  },
  {
    name: "Ardre",
    lat: 57.37953,
    lng: 18.69694,
    distance: 44,
    comment: "Ardre Kyrka",
  },
  {
    name: "Atlingbo",
    lat: 57.479938,
    lng: 18.3907773,
    distance: 22,
    comment: "Atlingbo Kyrka",
  },
  {
    name: "Bara",
    lat: 57.5899021,
    lng: 18.608066,
    distance: 23,
    comment: "Bara Trekanten 120",
  },
  {
    name: "Barlingbo",
    lat: 57.564493,
    lng: 18.463129,
    distance: 19,
    comment: "Barlingbo Kyrka",
  },
  {
    name: "Björke",
    lat: 57.5074482,
    lng: 18.421306,
    distance: 20,
    comment: "Björke Kyrka",
  },
  {
    name: "Boge",
    lat: 57.6870433,
    lng: 18.7628646,
    distance: 34,
    comment: "Boge Kyrka ",
  },
  {
    name: "Bro",
    lat: 57.6700497,
    lng: 18.4748443,
    distance: 14,
    comment: "Bro kyrka",
  },
  { name: "Bunge", lat: 57.8746, lng: 19.0167, distance: 45, comment: "" },
  { name: "Burs", lat: 57.3139, lng: 18.5019, distance: 50, comment: "" },
  { name: "Buttle", lat: 57.4358, lng: 18.5122, distance: 30, comment: "" },
  { name: "Bäl", lat: 57.6717, lng: 18.6333, distance: 15, comment: "" },
  { name: "Dalhem", lat: 57.5514, lng: 18.6008, distance: 15, comment: "" },
  { name: "Eke", lat: 57.3158, lng: 18.3844, distance: 50, comment: "" },
  { name: "Ekeby", lat: 57.6067, lng: 18.4917, distance: 15, comment: "" },
  { name: "Eksta", lat: 57.2817, lng: 18.2675, distance: 50, comment: "" },
  { name: "Endre", lat: 57.5736, lng: 18.4414, distance: 15, comment: "" },
  { name: "Eskelhem", lat: 57.5267, lng: 18.2394, distance: 15, comment: "" },
  { name: "Etelhem", lat: 57.3478, lng: 18.5725, distance: 50, comment: "" },
  { name: "Fardhem", lat: 57.3042, lng: 18.4369, distance: 50, comment: "" },
  { name: "Fide", lat: 57.0025, lng: 18.2817, distance: "", comment: "" },
  { name: "Fleringe", lat: 57.9239, lng: 19.0242, distance: "", comment: "" },
  { name: "Fole", lat: 57.6406, lng: 18.6317, distance: "", comment: "" },
  { name: "Follingbo", lat: 57.6011, lng: 18.4569, distance: "", comment: "" },
  { name: "Fröjel", lat: 57.3031, lng: 18.2083, distance: "", comment: "" },
  { name: "Fårö", lat: 57.9425, lng: 19.1378, distance: "", comment: "" },
  { name: "Gammelgarn", lat: 57.4428, lng: 18.7289, distance: "", comment: "" },
  { name: "Ganthem", lat: 57.5156, lng: 18.5722, distance: "", comment: "" },
  { name: "Garde", lat: 57.3725, lng: 18.5706, distance: "", comment: "" },
  { name: "Gerum", lat: 57.2981, lng: 18.2922, distance: "", comment: "" },
  { name: "Gothem", lat: 57.5764, lng: 18.7297, distance: "", comment: "" },
  { name: "Grötlingbo", lat: 57.1303, lng: 18.3928, distance: "", comment: "" },
  { name: "Guldrupe", lat: 57.4408, lng: 18.4342, distance: "", comment: "" },
  { name: "Hablingbo", lat: 57.2297, lng: 18.2753, distance: "", comment: "" },
  { name: "Halla", lat: 57.4036, lng: 18.4392, distance: "", comment: "" },
  { name: "Halls", lat: 57.7053, lng: 18.7342, distance: "", comment: "" },
  { name: "Hamra", lat: 57.0208, lng: 18.2908, distance: "", comment: "" },
  { name: "Hangvar", lat: 57.7861, lng: 18.6542, distance: "", comment: "" },
  { name: "Havdhem", lat: 57.1878, lng: 18.3797, distance: "", comment: "" },
  { name: "Hejde", lat: 57.4517, lng: 18.4106, distance: "", comment: "" },
  { name: "Hejdeby", lat: 57.6244, lng: 18.4828, distance: "", comment: "" },
  { name: "Hejnum", lat: 57.6994, lng: 18.6189, distance: "", comment: "" },
  { name: "Hellvi", lat: 57.8325, lng: 18.9194, distance: "", comment: "" },
  {
    name: "Hemse",
    lat: 57.23791110037961,
    lng: 18.37674318413476,
    distance: "",
    comment: "",
  },
  { name: "Hogrän", lat: 57.4494, lng: 18.4472, distance: "", comment: "" },
  { name: "Hörsne", lat: 57.5547, lng: 18.5736, distance: "", comment: "" },
  {
    name: "Klintehamn",
    lat: 57.387169155005395,
    lng: 18.203785299605766,
    distance: "",
    comment: "",
  },
  { name: "Kräklingbo", lat: 57.4436, lng: 18.7106, distance: "", comment: "" },
  { name: "Källunge", lat: 57.5639, lng: 18.6628, distance: "", comment: "" },
  { name: "Lau", lat: 57.3061, lng: 18.7136, distance: "", comment: "" },
  { name: "Levide", lat: 57.3161, lng: 18.3736, distance: "", comment: "" },
  { name: "Linde", lat: 57.3614, lng: 18.3422, distance: "", comment: "" },
  { name: "Lojsta", lat: 57.3339, lng: 18.3836, distance: "", comment: "" },
  { name: "Lokrume", lat: 57.6717, lng: 18.5958, distance: "", comment: "" },
  { name: "Lummelunda", lat: 57.6908, lng: 18.5478, distance: "", comment: "" },
  { name: "Lye", lat: 57.3117, lng: 18.5978, distance: "", comment: "" },
  { name: "Lärbro", lat: 57.7644, lng: 18.7253, distance: "", comment: "" },
  { name: "Martebo", lat: 57.6842, lng: 18.5756, distance: "", comment: "" },
  { name: "Mästerby", lat: 57.5094, lng: 18.4081, distance: "", comment: "" },
  { name: "Norrlanda", lat: 57.4867, lng: 18.6714, distance: "", comment: "" },
  { name: "När", lat: 57.275, lng: 18.6947, distance: "", comment: "" },
  { name: "Näs", lat: 57.1181, lng: 18.3056, distance: "", comment: "" },
  { name: "Othem", lat: 57.6994, lng: 18.7353, distance: "", comment: "" },
  { name: "Roma", lat: 57.515, lng: 18.5161, distance: "", comment: "" },
  {
    name: "Rone",
    lat: 57.20972703562073,
    lng: 18.44305733807873,
    distance: "",
    comment: "",
  },
  { name: "Rute", lat: 57.8417, lng: 18.8703, distance: "", comment: "" },
  { name: "Sanda", lat: 57.4208, lng: 18.2267, distance: "", comment: "" },
  { name: "Sjonhem", lat: 57.5297, lng: 18.5058, distance: "", comment: "" },
  { name: "Sproge", lat: 57.2592, lng: 18.2522, distance: "", comment: "" },
  { name: "Stenkumla", lat: 57.5522, lng: 18.3314, distance: "", comment: "" },
  { name: "Stenkyrka", lat: 57.7381, lng: 18.6533, distance: "", comment: "" },
  { name: "Stånga", lat: 57.2622, lng: 18.5047, distance: "", comment: "" },
  { name: "Sundre", lat: 56.9306, lng: 18.2892, distance: "", comment: "" },
  { name: "Tingstäde", lat: 57.7042, lng: 18.5778, distance: "", comment: "" },
  { name: "Tofta", lat: 57.5581, lng: 18.1897, distance: "", comment: "" },
  { name: "Träkumla", lat: 57.5423, lng: 18.3098, distance: "", comment: "" },
  { name: "Valls", lat: 57.5513, lng: 18.6395, distance: "", comment: "" },
  { name: "Vallstena", lat: 57.6098, lng: 18.6368, distance: "", comment: "" },
  { name: "Vamlingbo", lat: 56.9992, lng: 18.2874, distance: "", comment: "" },
  { name: "Viklau", lat: 57.4592, lng: 18.4948, distance: "", comment: "" },
  { name: "Vänge", lat: 57.5402, lng: 18.5703, distance: "", comment: "" },
  { name: "Väskinde", lat: 57.6787, lng: 18.4732, distance: "", comment: "" },
  { name: "Västergarn", lat: 57.4283, lng: 18.1604, distance: "", comment: "" },
  {
    name: "Västerhejde",
    lat: 57.5898,
    lng: 18.2908,
    distance: "",
    comment: "",
  },
  { name: "Väte", lat: 57.3933, lng: 18.4817, distance: "", comment: "" },
  { name: "Öja", lat: 57.1932, lng: 18.2463, distance: "", comment: "" },
  { name: "Östergarn", lat: 57.4133, lng: 18.7554, distance: "", comment: "" },
];

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
