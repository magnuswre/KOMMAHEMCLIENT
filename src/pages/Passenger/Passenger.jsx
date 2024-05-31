import React, { useContext, useEffect, useState } from "react";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
import { PassengerContext } from "../../contexts/PassengerContext";
import MyDatePickerComponentPassenger from "../../components/DatePickerComponents/DatePickerComponentPassenger/MyDatePickerComponentPassenger";

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
  const [destinationSelected, setDestinationSelected] = useState(false);
  const debouncedDestination = useDebounce(destination, 500);
  const user = JSON.parse(localStorage.getItem("user-passenger"));
  const userId = user.user.id;

  const {
    selectedDate,
    getDestinationsByDateNameSeatsAndRoute,
    destinationsByDateNameSeatsAndRoute,
    setDestinationsByDateNameSeatsAndRoute,
    fetchRoutes,
    createBooking,
    selectedDestination,
    setSelectedDestination,
  } = useContext(PassengerContext);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (selectedDate && debouncedDestination) {
      fetchRoutes(selectedDate, debouncedDestination)
        .then((routes) => {
          setRoutes(routes);
        })
        .catch((error) => console.error(error));
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
    }
  }, [selectedDate, debouncedDestination, selectedSeats, selectedDestination]);

  useEffect(() => {
    if (routes.length > 0) {
      setSelectedDestination(routes[0]);
    }
  }, [routes]);

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
    navigate("/passengerconfirmation");
  };

  const handleButtonClick = (destination) => {
    setSelectedDestination(destination);
    console.log(destination);
    setDestinationSelected(true);
  };

  const handleDashboardClick = () => {
    navigate("/PassengerDashboard");
  };

  return (
    <div className="passenger-page-container">
      <div className="passenger-page-wrapper">
        <button onClick={handleDashboardClick}>till dashboard</button>
        <form onSubmit={onSubmit}>
          <div>
            <h2>Välj datum:</h2>
            <MyDatePickerComponentPassenger
              onInputClick={() => setInputClicked(true)}
            />
          </div>
          <div>
            <h2>Välj slutdestination:</h2>
            <input
              type="text"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Ange din slutdestination"
              className="passenger-destination-picker"
            />
          </div>
          <div>
            <h2>Välj avgång:</h2>
            <select
              className="passenger-arrival-selection-picker"
              onChange={(e) => {
                const selectedDestination = routes.find(
                  (route) => route.arrival_time === e.target.value
                );
                console.log(selectedDestination);
                setSelectedDestination(selectedDestination);
              }}
            >
              {routes.map((route, id) => (
                <option key={id} value={route.arrival_time}>
                  {route.route}, avgång: {route.departure_time}, ankomst:{" "}
                  {route.arrival_time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2>Välj platser:</h2>
            <select
              className="passenger-selection-picker"
              value={selectedSeats}
              onChange={(e) => setSelectedSeats(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            {Array.isArray(destinationsByDateNameSeatsAndRoute) &&
            destinationsByDateNameSeatsAndRoute.length > 0 ? (
              destinationsByDateNameSeatsAndRoute.map((destination) => (
                <button
                  type="button"
                  key={destination.id}
                  id="Passenger-destinations-btn"
                  className="Passenger-destinations-btn"
                  onClick={() => handleButtonClick(destination)}
                >
                  {destination.enddestination}
                </button>
              ))
            ) : (
              <p>
                Tyvärr, inga körningar för detta datum med detta antal platser.
              </p>
            )}
          </div>

          {destinationSelected && (
            <button id="Passenger-Submit-Btn">Boka</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Passenger;
