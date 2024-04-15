import "./ReactMapComponent.css";
import { useContext } from "react";
import { set } from "date-fns";
import { PassengerContext } from "../../contexts/PassengerContext";
import { DriverContext } from "../../contexts/DriverContext";
// import 'dotenv/config'


import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  useMarkerRef,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const ReactMapComponent = () => {
  //MAP
  const [markerRef, marker] = useMarkerRef();
  const [open, setOpen] = useState(false);
  const { placeNameDriver, setPlaceNameDriver } = useContext(DriverContext);
  const { placeNamePassenger, setPlaceNamePassenger } = useContext(PassengerContext);

    
  // VISBY
  const InitPosition = { lat: 57.6348, lng: 18.29484 };
  const mapId = "e7b9c1e6b6c3c6a7";
  const [position, setPosition] = useState(InitPosition);
  const mapOptions = {
    gestureHandling: "none", // Disable scroll and other gestures
  };

  //  const { value, setValue } = usePlacesAutocomplete();

  //  const handleInput = (e) => {
  //    // Place a "string" to update the value of the input element
  //    setValue(e.target.value);
  //  };

  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);

  // INPUT
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "UserActivationcallback",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      setPlaceNameDriver(description);
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setPosition({ lat, lng });
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

    useEffect(() => {
      console.log(placeNameDriver);
    }, [placeNameDriver]);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li className="li-tag-destination-suggestions" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <div className="google-maps-container">
        <div className="user-input-map-container">
          <div ref={ref}>
            <input
              className="input-destination-search-bar"
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="Vart vill du köra?"
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
          </div>
        </div>

        <div className="user-map-container">
          <div>
            <APIProvider apiKey={'AIzaSyDLHfQX07NkjfywxgLF_Z-RhVCeOGbNWqA'}>
              <div style={{ height: "40vh " }}>
                <Map zoom={12} center={position} mapId={mapId}>
                  <AdvancedMarker
                    position={position}
                    onClick={() => setOpen(true)}
                  >
                    <Pin background={"gray"} borderColor={"yellow"} />
                    <div>
                      <input value={value} onChange={handleInput} />
                      {/* Render dropdown */}
                    </div>
                  </AdvancedMarker>

                  {/* <Marker ref={markerRef} position={position} /> */}
                  {open && (
                    <InfoWindow
                      position={position}
                      onCloseClick={() => setOpen(false)}
                    >
                      <p>Im in Visby</p>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </APIProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReactMapComponent;
