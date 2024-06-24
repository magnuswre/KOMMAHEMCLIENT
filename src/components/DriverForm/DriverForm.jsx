import React, { useEffect, useState, useContext } from "react";
import "./DriverForm.css";
import { useNavigate } from "react-router-dom";
import { DriverContext } from "../../contexts/DriverContext";
import MyDatePickerComponent from "../DatePickerComponents/DatePickerComponentDriver/MyDatePickerComponent";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const DriverForm = ({ disabled }) => {
  const {
    placeNameDriver,
    arrivalDriver,
    setArrivalDriver,
    seatsDriver,
    setSeatsDriver,
    addDestinationDriver,
    setUserDriver,
    selectedDateDriver,
    originalSeatsDriver,
    setOriginalSeatsDriver,
    setSelectedDateDriver,
    destinationPrice,
  } = useContext(DriverContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-driver");
    const parsedToken = JSON.parse(token);
    const { user } = parsedToken;
    const userDriverId = user.id;
    setUserDriver(userDriverId);
  }, [setUserDriver]);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (selectedDateDriver) {
      fetch(`${baseUrl}/timetable/${selectedDateDriver}`)
        .then((response) => response.json())
        .then((data) => setRoutes(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [selectedDateDriver]);

  useEffect(() => {
    if (routes.length > 0) {
      setArrivalDriver(routes[0]);
    }
    setSeatsDriver("1");
  }, [routes]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setSelectedDateDriver(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeNameDriver) {
      console.log("Please choose a destination");
      return;
    }

    console.log({
      placeNameDriver,
      arrivalDriver,
      seatsDriver,
      originalSeatsDriver,
      destinationPrice,
    });

    try {
      await addDestinationDriver(
        placeNameDriver,
        arrivalDriver,
        seatsDriver,
        originalSeatsDriver,
        destinationPrice
      );
      navigate(`/driverconfirmation`);
      console.log("Destination added successfully");
    } catch (error) {
      console.error("Error");
    }
  };

  const formatTime = (time) => {
    if (time) {
      return time.slice(0, -3);
    }
    return time;
  };

  return (
    <div className="driver-form-container">
      <form
        onSubmit={handleSubmit}
        className={`driver-form ${disabled ? "disabled" : ""}`}
      >
        <div className="driver-form-group driver-form-date-picker">
          <p>När vill du köra?</p>
          <MyDatePickerComponent disabled={disabled} />
        </div>
        <div className="driver-form-group">
          <p>Båttur:</p>
          <select
            className="driver-arrival-selection-picker"
            value={routes.arrival_time}
            onChange={(e) => {
              const selectedRoute = routes[e.target.selectedIndex];
              setArrivalDriver(selectedRoute);
            }}
            disabled={disabled}
          >
            {routes.map((route, id) => (
              <option key={id} value={route.arrival_time}>
                {route.route}, avgång: {formatTime(route.departure_time)},
                ankomst: {formatTime(route.arrival_time)}
              </option>
            ))}
          </select>
        </div>
        <div className="driver-form-group">
          <p>Antal platser:</p>
          <select
            className="driver-selection-picker"
            value={seatsDriver}
            onChange={(e) => {
              setSeatsDriver(e.target.value);
              setOriginalSeatsDriver(e.target.value);
            }}
            disabled={disabled}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div>
          <button className="driver-form-btn" disabled={disabled}>
            Godkänn
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;
