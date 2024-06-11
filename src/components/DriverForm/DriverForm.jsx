import React, { useEffect, useState, useContext } from "react";
import "./DriverForm.css";
import { useNavigate } from "react-router-dom";
import { DriverContext } from "../../contexts/DriverContext";
import MyDatePickerComponent from "../DatePickerComponents/DatePickerComponentDriver/MyDatePickerComponent";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// const baseUrl = "http://localhost:5000";

const DriverForm = () => {
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
  } = useContext(DriverContext);

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeNameDriver) {
      console.log("Please choose a destination");
      return;
    }

    // if (!isChecked) {
    //   console.log("Please accept the terms and conditions");
    //   return;
    // }

    try {
      await addDestinationDriver(
        placeNameDriver,
        arrivalDriver,
        seatsDriver,
        originalSeatsDriver
      );
      navigate(`/driverconfirmation`);
      console.log("Destination added successfully");
    } catch (error) {
      console.error("Error");
    }
  };

  const formatTime = (time) => {
    if (time) {
      return time.slice(0, -3); // Trims the last ":00"
    }
    return time;
  };

  const disabled = !placeNameDriver;

  return (
    <div className="driver-form-container">
      <form
        onSubmit={handleSubmit}
        className={`driver-form ${disabled ? "disabled" : ""}`}
      >
        <div className="driver-form-group-destination-choice">
          <p>
            Vald destination:{" "}
            <span>{placeNameDriver || "Ingen destination vald"}</span>
          </p>
        </div>
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
        {/* <div>
          <input
            type="checkbox"
            name="driver-terms-condition"
            id="driver-terms-condition"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            disabled={disabled}
          />
          <label htmlFor="driver-terms-condition">Acceptera villkoren</label>
        </div> */}
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
