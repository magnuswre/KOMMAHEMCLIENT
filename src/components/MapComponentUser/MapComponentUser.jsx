// import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
// import { APIProvider, Map } from "@vis.gl/react-google-maps";

// const MapComponentUser = ({ lat, lng }) => {
//   const position = { lat, lng };

//   return (
//     <APIProvider apiKey={"YOUR_GOOGLE_MAPS_API_KEY"}>
//       <Map zoom={12} center={position} mapId={"e7b9c1e6b6c3c6a7"}>
//         <AdvancedMarker position={position}>
//           <Pin background={"gray"} borderColor={"yellow"} />
//         </AdvancedMarker>
//       </Map>
//     </APIProvider>
//   );
// };

// export default MapComponentUser;

// import "./ReactMapComponent.css";
import "./MapComponentUser.css";
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

const MapComponentUser = ({ lat, lng }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useMarkerRef();
  const [open, setOpen] = useState(false);
  const { placeNameDriver, setPlaceNameDriver } = useContext(DriverContext);
  const { placeNamePassenger, setPlaceNamePassenger } =
    useContext(PassengerContext);
  const [isClicked, setIsClicked] = useState(false);
  const position = { lat, lng };

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const ref = useOnclickOutside(() => {
    setSuggestions([]);
  });

  return (
    <>
      <div className="passenger-google-maps-container">
        <div className="-passenger-user-input-map-container">
          <div ref={ref} className="passenger-google-map-ref"></div>
        </div>
        {/* {isClicked && ( */}
        <div className="passenger-user-map-container">
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
        {/* )} */}
      </div>
    </>
  );
};

export default MapComponentUser;
