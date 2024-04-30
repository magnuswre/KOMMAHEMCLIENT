import React, { useEffect, useState } from "react";
import "./DriverForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { DriverContext } from "../../contexts/DriverContext";
import { useContext } from "react";
import MyDatePickerComponent from "../DatePickerComponents/DatePickerComponentDriver/MyDatePickerComponent";

const DriverForm = () => {
  const {
    placeNameDriver,
    arrivalDriver,
    startDateDriver,
    setArrivalDriver,
    seatsDriver,
    addDestinationDriver,
    setUserDriver,
  } = useContext(DriverContext);

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user-driver");
    const parsedToken = JSON.parse(token);
    const { user } = parsedToken;
    console.log(user);
    const userDriverId = user.id;
    console.log(userDriverId);
    setUserDriver(userDriverId);
    console.log(startDateDriver.toISOString().slice(0, 10));
  }, []);

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

    console.log(placeNameDriver);
    console.log("Selected Arrival:", arrivalDriver);
    console.log("Selected Seats:", seatsDriver);
    console.log("Checkbox Status:", isChecked);
  };

  console.log(arrivalDriver)

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
          <p>Vilken avgång:</p>
          <select
            className="driver-arrival-selection-picker"
            value={arrivalDriver}
            onChange={(e) => setArrivalDriver(e.target.value)}
          >
            <option value="11.25">11.25</option>
            <option value="20.45">20.45</option>
          </select>
        </div>
        <div>
          <p>Antal platser:</p>
          <select
            className="driver-selection-picker"
            value={seatsDriver}
            onChange={(e) => setSeats(e.target.value)}
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
