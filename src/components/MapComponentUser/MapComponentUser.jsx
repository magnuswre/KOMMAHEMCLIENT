import "./MapComponentUser.css";
import { useContext, useState } from "react";
import { DriverContext } from "../../contexts/DriverContext";
import { PassengerContext } from "../../contexts/PassengerContext";
// import useOnclickOutside from "react-cool-onclickoutside";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMarkerRef,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapComponentUser = ({ lat, lng }) => {
  const [open, setOpen] = useState(false);
  const { placeNameDriver, setPlaceNameDriver } = useContext(DriverContext);
  const { destinationsByDateNameSeatsAndRoute } = useContext(PassengerContext);
  const position = { lat, lng };

  // const ref = useOnclickOutside(() => {
  //   setSuggestions([]);
  // });

  console.log(destinationsByDateNameSeatsAndRoute);

  return (
    <>
      <div className="passenger-google-maps-container">
        {destinationsByDateNameSeatsAndRoute.length > 0 && (
          <p>
            Minsta rekommenderad ersättning per person:<span> </span>
            {destinationsByDateNameSeatsAndRoute[0].price}
            <span>kr</span>
          </p>
        )}
        <div className="passenger-user-input-map-container">
          {/* <div ref={ref} className="passenger-google-map-ref"></div> */}
        </div>
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
      </div>
    </>
  );
};

export default MapComponentUser;
