import React, { useContext, useEffect, useState } from "react";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
import { PassengerContext } from "../../contexts/PassengerContext";
import MyDatePickerComponentPassenger from "../../components/DatePickerComponents/DatePickerComponentPassenger/MyDatePickerComponentPassenger";
import MapComponentUser from "../../components/MapComponentUser/MapComponentUser";
import { predefinedPlaces } from "../../components/data/predefinedPlaces/predefinedPlaces";

const Passenger = () => {
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const navigate = useNavigate();

  const [inputClicked, setInputClicked] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("1");
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const debouncedDestination = useDebounce(destination, 500);
  const user = JSON.parse(localStorage.getItem("user-passenger"));
  const userId = user.user.id;
  const recipient_email = user.user.email;
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const {
    selectedDate,
    setSelectedDate,
    getDestinationsByDateNameSeatsAndRoute,
    destinationsByDateNameSeatsAndRoute,
    setDestinationsByDateNameSeatsAndRoute,
    fetchRoutes,
    createBooking,
    selectedDestination,
    setSelectedDestination,
    bookingConfirmation,
  } = useContext(PassengerContext);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (selectedDate && debouncedDestination) {
      fetchRoutes(selectedDate, debouncedDestination)
        .then((routes) => {
          setRoutes(routes);
        })
        .catch((error) => console.error(error));
    } else {
      setRoutes([]);
      setSelectedDestination(null);
    }
  }, [selectedDate, debouncedDestination]);

  useEffect(() => {
    if (selectedDate && debouncedDestination && selectedDestination) {
      getDestinationsByDateNameSeatsAndRoute(
        selectedDate,
        debouncedDestination,
        selectedSeats,
        selectedDestination.arrival_time,
        selectedDestination.departure_time,
        selectedDestination.route
      ).then((destinations) => {
        setDestinationsByDateNameSeatsAndRoute(destinations);
      });
    } else {
      setDestinationsByDateNameSeatsAndRoute([]);
    }
  }, [selectedDate, debouncedDestination, selectedSeats, selectedDestination]);

  useEffect(() => {
    if (routes.length > 0) {
      setSelectedDestination(routes[0]);
    } else {
      setSelectedDestination(null);
    }
  }, [routes]);

  useEffect(() => {
    setRoutes([]);
  }, [selectedDate, destination]);

  const onSubmit = (e) => {
    const destinationId = selectedDestination.id;
    e.preventDefault();
    createBooking(
      selectedDate,
      destination,
      selectedSeats,
      selectedDestination.arrival_time,
      selectedDestination.departure_time,
      selectedDestination.route,
      userId,
      destinationId
    );
    bookingConfirmation(
      recipient_email,
      selectedDate,
      destination,
      selectedSeats,
      selectedDestination.arrival_time,
      selectedDestination.departure_time,
      selectedDestination.route,
      userId,
      destinationId
    );
    navigate("/passengerconfirmation");
  };

  const handleButtonClick = (destination) => {
    setSelectedDestination(destination);
    setSelectedDestinationId(destination.id); // Update the state with the clicked destination ID
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    setSelectedSeats("1");
    setSelectedDestination(null);
    setSelectedDestinationId(null); // Reset the selected destination ID

    const place = predefinedPlaces.find(
      (place) => place.name.toLowerCase() === event.target.value.toLowerCase()
    );
    if (place) {
      setLat(place.lat);
      setLng(place.lng);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDestination("");
    setSelectedSeats("1");
    setSelectedDestination(null);
    setSelectedDestinationId(null); // Reset the selected destination ID
    setRoutes([]);
  };

  const formatTime = (time) => {
    if (time) {
      return time.slice(0, -3); // Trims the last ":00"
    }
    return time;
  };

  return (
    <div className="passenger-page-container">
      <div className="passenger-page-wrapper">
        <form onSubmit={onSubmit}>
          <div className="passenger-form-group">
            <h2>Välj datum:</h2>
            <MyDatePickerComponentPassenger
              onDateChange={handleDateChange}
              onInputClick={() => setInputClicked(true)}
            />
          </div>
          <div className="passenger-form-group">
            <h2>Välj slutdestination:</h2>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Ange din slutdestination"
              className="passenger-destination-picker"
            />

            {lat !== null &&
              lng !== null &&
              destinationsByDateNameSeatsAndRoute &&
              destinationsByDateNameSeatsAndRoute.length > 0 && (
                <MapComponentUser lat={lat} lng={lng} />
              )}
          </div>
          <div className="passenger-form-group">
            <h2>Välj båttur:</h2>
            <select
              className="passenger-arrival-selection-picker"
              value={
                selectedDestination ? selectedDestination.arrival_time : ""
              }
              onChange={(e) => {
                const selectedDestination = routes.find(
                  (route) => route.arrival_time === e.target.value
                );
                setSelectedDestination(selectedDestination);
              }}
              disabled={!routes.length}
            >
              <option value="" disabled>
                Välj en båttur
              </option>
              {routes.map((route, id) => (
                <option key={id} value={route.arrival_time}>
                  {route.route}, avgång: {formatTime(route.departure_time)},
                  ankomst: {formatTime(route.arrival_time)}
                </option>
              ))}
            </select>
          </div>

          <div className="passenger-form-group">
            <h2>Välj platser:</h2>
            <select
              className="passenger-selection-picker"
              value={selectedSeats}
              onChange={(e) => setSelectedSeats(e.target.value)}
              disabled={!selectedDestination}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="passenger-destinationsByDateNameSeatsAndRoute">
            {Array.isArray(destinationsByDateNameSeatsAndRoute) &&
            destinationsByDateNameSeatsAndRoute.length > 0 ? (
              <>
                <p>Tillgängliga körningar</p>
                {destinationsByDateNameSeatsAndRoute.map((destination) => (
                  <div className="button-container" key={destination.id}>
                    <button
                      type="button"
                      id="Passenger-destinations-btn"
                      className="Passenger-destinations-btn"
                      onClick={() => handleButtonClick(destination)}
                    >
                      {destination.enddestination}
                    </button>
                    {selectedDestinationId === destination.id && (
                      <button id="Passenger-Submit-Btn" onClick={onSubmit}>
                        Boka
                      </button>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>Tyvärr, inga tillgängliga körningar:</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Passenger;
