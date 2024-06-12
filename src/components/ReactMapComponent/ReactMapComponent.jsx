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
  {
    name: "Bunge",
    lat: 57.8542712,
    lng: 19.0271289,
    distance: 56,
    comment: "Bunge Kyrka",
  },
  {
    name: "Burs",
    lat: 57.2456637,
    lng: 18.5087328,
    distance: 54,
    comment: "Burs Kyrka",
  },
  {
    name: "Buttle",
    lat: 57.402707,
    lng: 18.5299135,
    distance: 35,
    comment: "Buttle Kyrka",
  },
  {
    name: "Bäl",
    lat: 57.644762,
    lng: 18.6329275,
    distance: 25,
    comment: "Bäl Kyrka",
  },
  {
    name: "Dalhem",
    lat: 57.5523951,
    lng: 18.5341297,
    distance: 22,
    comment: "Dalhem Kyrka",
  },
  {
    name: "Eke",
    lat: 57.1680263,
    lng: 18.3791032,
    distance: 60,
    comment: "Eke Kyrka",
  },
  {
    name: "Ekeby",
    lat: 57.5950047,
    lng: 18.5138582,
    distance: 17,
    comment: "Ekeby Kyrka",
  },
  {
    name: "Eksta",
    lat: 57.2865623,
    lng: 18.2064705,
    distance: 45,
    comment: "Eksta Kyrka",
  },
  {
    name: "Endre",
    lat: 57.6102629,
    lng: 18.4654433,
    distance: 14,
    comment: "Endre Kyrka",
  },
  {
    name: "Eskelhem",
    lat: 57.4896549,
    lng: 18.2099661,
    distance: 21,
    comment: "Eskelhem Kyrka",
  },
  {
    name: "Etelhem",
    lat: 57.33721,
    lng: 18.49599,
    distance: 42,
    comment: "Etelhem Kyrka",
  },
  {
    name: "Fardhem",
    lat: 57.2639659,
    lng: 18.3415401,
    distance: 49,
    comment: "Fardhem Kyrka",
  },
  {
    name: "Fide",
    lat: 57.0737547,
    lng: 18.3163262,
    distance: "71",
    comment: "Fide Kyrka",
  },
  {
    name: "Fleringe",
    lat: 57.86965,
    lng: 18.8769676,
    distance: "55",
    comment: "Fleringe Kyrka",
  },
  {
    name: "Fole",
    lat: 57.6505563,
    lng: 18.5449671,
    distance: "20",
    comment: "Fole Kyrka",
  },
  {
    name: "Follingbo",
    lat: 57.5822936,
    lng: 18.3833597,
    distance: "11",
    comment: "Follingbo Kyrka",
  },
  {
    name: "Fröjel",
    lat: 57.33554400666943,
    lng: 18.189990520477295,
    distance: "39",
    comment: "Fröjel Kyrka",
  },
  {
    name: "Fårö",
    lat: 57.9157989,
    lng: 19.1333609,
    distance: "66",
    comment: "Fårö Kyrka",
  },
  {
    name: "Fårösund",
    lat: 57.863338116378,
    lng: 19.054863452911377,
    distance: "58",
    comment: "Fårösund tötort",
  },
  {
    name: "Gammelgarn",
    lat: 57.4045736,
    lng: 18.8044502,
    distance: "48",
    comment: "Gammelgarn Kyrka",
  },
  {
    name: "Ganthem",
    lat: 57.5145543,
    lng: 18.5817937,
    distance: "29",
    comment: "Ganthem Kyrka",
  },
  {
    name: "Garde",
    lat: 57.3171551,
    lng: 18.5823562,
    distance: "49",
    comment: "Garde Kyrka",
  },
  {
    name: "Gerum",
    lat: 57.2945169,
    lng: 18.3295887,
    distance: "48",
    comment: "Gerum Kyrka",
  },
  {
    name: "Gothem",
    lat: 57.5754294,
    lng: 18.7350379,
    distance: "35",
    comment: "Gothem Kyrka",
  },
  {
    name: "Grötlingbo",
    lat: 57.1335251,
    lng: 18.3466566,
    distance: "64",
    comment: "Grötlingbo Kyrka",
  },
  {
    name: "Guldrupe",
    lat: 57.4302994,
    lng: 18.4266233,
    distance: "31",
    comment: "Guldrupe Kyrka",
  },
  {
    name: "Hablingbo",
    lat: 57.1872755,
    lng: 18.2627875,
    distance: "59",
    comment: "Hablingo Kyrka",
  },
  {
    name: "Halla",
    lat: 57.5108979,
    lng: 18.4971176,
    distance: "25",
    comment: "Halla Kyrka",
  },
  {
    name: "Hall",
    lat: 57.8920784,
    lng: 18.7158841,
    distance: "44",
    comment: "Hall Kyrka",
  },
  {
    name: "Hamra",
    lat: 56.9761298,
    lng: 18.3134917,
    distance: "83",
    comment: "Hamra Kyrka",
  },
  {
    name: "Hangvar",
    lat: 57.8393249,
    lng: 18.6885794,
    distance: "41",
    comment: "Hangvar Kyrka",
  },
  {
    name: "Havdhem",
    lat: 57.162583,
    lng: 18.3233234,
    distance: "61",
    comment: "Havdhem Kyrka",
  },
  {
    name: "Hejde",
    lat: 57.4127557,
    lng: 18.3460964,
    distance: "30",
    comment: "Hejde Kyrka",
  },
  {
    name: "Hejdeby",
    lat: 57.6304523,
    lng: 18.4427863,
    distance: "12",
    comment: "Hejdeby Kyrka",
  },
  {
    name: "Hejnum",
    lat: 57.680155,
    lng: 18.631976,
    distance: "26",
    comment: "Hejnum Kyrka",
  },
  {
    name: "Hellvi",
    lat: 57.7751123,
    lng: 18.8952254,
    distance: "46",
    comment: "Hellvi Kyrka",
  },
  {
    name: "Hemse",
    lat: 57.23791110037961,
    lng: 18.37674318413476,
    distance: "51",
    comment: "Hemse tätort",
  },
  {
    name: "Hogrän",
    lat: 57.504645,
    lng: 18.3078778,
    distance: "18",
    comment: "Hogrän Kyrka",
  },
  {
    name: "Hörsne",
    lat: 57.5584638,
    lng: 18.5975056,
    distance: "25",
    comment: "Hörsne Kyrka",
  },
  {
    name: "Kappelshamn",
    lat: 57.84872496813164,
    lng: 18.785762786865234,
    distance: "47",
    comment: "Kappelshamn",
  },
  {
    name: "Katthammarsvik",
    lat: 57.435728328437655,
    lng: 18.85279655456543,
    distance: "50",
    comment: "Katthammarsvik",
  },
  {
    name: "Klinte",
    lat: 57.3784026,
    lng: 18.2322328,
    distance: "33",
    comment: "Klinte Kyrka",
  },
  {
    name: "Klintehamn",
    lat: 57.387169155005395,
    lng: 18.203785299605766,
    distance: "33",
    comment: "Klintehamn tätort",
  },
  {
    name: "Kräklingbo",
    lat: 57.4452213,
    lng: 18.7113396,
    distance: "41",
    comment: "Kräklingbo Kyrka",
  },
  {
    name: "Källunge",
    lat: 57.6078196,
    lng: 18.5848371,
    distance: "26",
    comment: "Källunge Kyrka",
  },
  {
    name: "Lau",
    lat: 57.2829031,
    lng: 18.6201527,
    distance: "54",
    comment: "Lau Kyrka",
  },
  {
    name: "Levide",
    lat: 57.2821555,
    lng: 18.2663961,
    distance: "45",
    comment: "Levide Kyrka",
  },
  {
    name: "Linde",
    lat: 57.2796814,
    lng: 18.3797463,
    distance: "46",
    comment: "Linde Kyrka",
  },
  {
    name: "Ljugarn",
    lat: 57.337530110882994,
    lng: 18.699910640716553,
    distance: "49",
    comment: "Ljugarn tätort",
  },
  {
    name: "Lojsta",
    lat: 57.312828,
    lng: 18.3839146,
    distance: "42",
    comment: "Lojsta Kyrka",
  },
  {
    name: "Lokrume",
    lat: 57.6878006,
    lng: 18.5389758,
    distance: "19",
    comment: "Lokrume Kyrka",
  },
  {
    name: "Lummelunda",
    lat: 57.738204,
    lng: 18.405876,
    distance: "17",
    comment: "Lummelundsväg, Lummelundsbruk 520",
  },
  {
    name: "Lye",
    lat: 57.2979165,
    lng: 18.5264525,
    distance: "47",
    comment: "Lye Kyrka",
  },
  {
    name: "Lärbro",
    lat: 57.7871487,
    lng: 18.7937149,
    distance: "40",
    comment: "Lärbro Kyrka",
  },
  {
    name: "Martebo",
    lat: 57.748212,
    lng: 18.4945039,
    distance: "25",
    comment: "Martebo Kyrka",
  },
  {
    name: "Mästerby",
    lat: 57.4699286,
    lng: 18.3040287,
    distance: "23",
    comment: "Mästerby Kyrka",
  },
  {
    name: "Norrlanda",
    lat: 57.50154,
    lng: 18.6598248,
    distance: "34",
    comment: "Norrlanda Kyrka",
  },
  {
    name: "När",
    lat: 57.2573548,
    lng: 18.625288,
    distance: "58",
    comment: "När Kyrka",
  },
  {
    name: "Näs",
    lat: 57.1101605,
    lng: 18.2623751,
    distance: "68",
    comment: "Näs Kyrka",
  },
  {
    name: "Othem",
    lat: 57.7473949,
    lng: 18.7387852,
    distance: "35",
    comment: "Othem Kyrka",
  },
  {
    name: "Roma",
    lat: 57.5073932,
    lng: 18.4506134,
    distance: "21",
    comment: "Roma tätort",
  },
  {
    name: "Rone",
    lat: 57.2089847,
    lng: 18.4412239,
    distance: "57",
    comment: "Rone Kyrka",
  },
  {
    name: "Ronehamn",
    lat: 57.172836460188776,
    lng: 18.488429491076637,
    distance: "63",
    comment: "Ronehamn tätort",
  },
  {
    name: "Rute",
    lat: 57.8337091,
    lng: 18.9235283,
    distance: "50",
    comment: "Rute Kyrka",
  },
  {
    name: "Sanda",
    lat: 57.4292823,
    lng: 18.2232368,
    distance: "28",
    comment: "Sanda Kyrka",
  },
  {
    name: "Silte Kyrka",
    lat: 57.2210454,
    lng: 18.2361766,
    distance: "53",
    comment: "Silte Kyrka",
  },
  {
    name: "Sjonhem",
    lat: 57.485587,
    lng: 18.5207452,
    distance: "25",
    comment: "Sjonhem Kyrka",
  },
  {
    name: "Slite",
    lat: 57.704376526508945,
    lng: 18.80335807800293,
    distance: "38",
    comment: "Slite tätort",
  },

  {
    name: "Sproge",
    lat: 57.2536408,
    lng: 18.210903,
    distance: "50",
    comment: "Sproge Kyrka",
  },
  {
    name: "Stenkumla",
    lat: 57.5477512,
    lng: 18.2684501,
    distance: "12",
    comment: "Stenkumla Kyrka",
  },
  {
    name: "Stenkyrka",
    lat: 57.7932357,
    lng: 18.5314757,
    distance: "28",
    comment: "Stenkyrka kyrka",
  },
  {
    name: "Stånga",
    lat: 57.2830727,
    lng: 18.4659479,
    distance: "51",
    comment: "Stånga Kyrka",
  },
  {
    name: "Sundre",
    lat: 56.9359072,
    lng: 18.1818291,
    distance: "89",
    comment: "Sudre Kyrka",
  },
  {
    name: "Tingstäde",
    lat: 57.7363773,
    lng: 18.615048,
    distance: "26",
    comment: "Tingstäde Kyrka",
  },
  {
    name: "Tofta",
    lat: 57.488569,
    lng: 18.140681,
    distance: "19",
    comment: "Tofta tätort, Bjärs, Eskelhem Toftavägen",
  },
  {
    name: "Träkumla",
    lat: 57.5603322,
    lng: 18.312995,
    distance: "10",
    comment: "Träkumla Kyrka",
  },
  {
    name: "Vall",
    lat: 57.5207874,
    lng: 18.3451712,
    distance: "15",
    comment: "Vall Kyrka",
  },
  {
    name: "Vallstena",
    lat: 57.6098333,
    lng: 18.6367913,
    distance: "27",
    comment: "Vallstena Kyrka",
  },
  {
    name: "Vamlingbo",
    lat: 56.969683,
    lng: 18.2302388,
    distance: "84",
    comment: "Vamlingbo Kyrka",
  },
  {
    name: "Viklau",
    lat: 57.4655467,
    lng: 18.4565424,
    distance: "26",
    comment: "Viklau Kyrka",
  },
  {
    name: "Vänge",
    lat: 57.4519946,
    lng: 18.5115075,
    distance: "29",
    comment: "Vänge Kyrka",
  },
  {
    name: "Väskinde",
    lat: 57.6787,
    lng: 18.4732,
    distance: "14",
    comment: "Väskinde Kyrka",
  },
  {
    name: "Västergarn",
    lat: 57.4408411,
    lng: 18.1509931,
    distance: "26",
    comment: "Västergarn Kyrka",
  },
  {
    name: "Västerhejde",
    lat: 57.587813,
    lng: 18.239429,
    distance: "6",
    comment: "Västerhejde tätort",
  },
  {
    name: "Väte",
    lat: 57.4490975,
    lng: 18.3640622,
    distance: "",
    comment: "Väte kyrka",
  },
  {
    name: "Öja",
    lat: 57.0355308,
    lng: 18.299906,
    distance: "76",
    comment: "Öja Kyrka",
  },
  {
    name: "Östergarn",
    lat: 57.4217746,
    lng: 18.8588004,
    distance: "50",
    comment: "Östergarn Kyrka",
  },
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
