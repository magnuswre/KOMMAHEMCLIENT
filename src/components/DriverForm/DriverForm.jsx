import React, { useEffect, useState, useContext } from "react";
import "./DriverForm.css";
import { useNavigate } from "react-router-dom";
import { DriverContext } from "../../contexts/DriverContext";
import MyDatePickerComponent from "../DatePickerComponents/DatePickerComponentDriver/MyDatePickerComponent";
const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";
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

    if (!isChecked) {
      console.log("Please accept the terms and conditions");
      return;
    }

    try {
      await addDestinationDriver(placeNameDriver, arrivalDriver, seatsDriver);
      navigate(`/driverconfirmation`);
      console.log("Destination added successfully");
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div className="driver-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            Vald destination: <span>{placeNameDriver}</span>
          </p>
        </div>
        <div>
          <p>När vill du köra?</p>
        </div>
        <div>
          <MyDatePickerComponent />
        </div>
        <div>
          <p>Båttur:</p>
          <select
            className="driver-arrival-selection-picker"
            value={routes.arrival_time}
            onChange={(e) => {
              const selectedRoute = routes[e.target.selectedIndex];
              console.log(selectedRoute);
              setArrivalDriver(selectedRoute);
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
          <p>Antal platser:</p>
          <select
            className="driver-selection-picker"
            value={seatsDriver}
            onChange={(e) => setSeatsDriver(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            name="driver-terms-condition"
            id="driver-terms-condition"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="driver-terms-condition">Acceptera villkoren</label>
        </div>
        <div>
          <button className="driver-form-btn">Godkänn</button>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;
