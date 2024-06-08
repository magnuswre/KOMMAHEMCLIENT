import React, { useEffect, useState } from "react";
import "./DriverConfirmation.css";
import { useContext } from "react";
import { DriverContext } from "../../../contexts/DriverContext";
import { useNavigate, useParams } from "react-router-dom";

const DriverConfirmation = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    placeNameDriver,
    arrivalDriver,
    seatsDriver,
    selectedDateDriver,
    // setUserDriver,
    // setIsLoggedInDriver,
  } = useContext(DriverContext);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    console.log(
      placeNameDriver,
      arrivalDriver,
      seatsDriver,
      selectedDateDriver
    );
  }, []);

  const handleChange = () => {
    navigate(`/driverdashboard/`);
  };

  const handleLogout = () => {
    console.log("Logout");
    // setUserDriver({});
    // setIsLoggedInDriver(false);
    // localStorage.setItem("user-driver", "");
    navigate("/");
  };

  return (
    <div className="driver-confirmation-page-container">
      <div className="driver-confirmation-page-wrapper">
        <div className="driver-confirmation-page-bookinginformation">
          <h2>Tack för din körning till:</h2>
          <h2>
            <span>{placeNameDriver}</span>
          </h2>
          <h2>
            <span>{selectedDateDriver}</span>
          </h2>
          <h2>
            Avgångstid: <span> {arrivalDriver.departure_time}</span>
          </h2>
          <h2>
            Ankomsttid: <span> {arrivalDriver.arrival_time}</span>
          </h2>
          <h2>
            Rutt: <span> {arrivalDriver.route}</span>
          </h2>

          <h2>
            Antal platser: <span> {seatsDriver} </span>
          </h2>
        </div>
        <div>
          <button
            onClick={() => handleChange()}
            className="driver-confirmation-page-btn"
          >
            Alla mina körningar och konto
          </button>
        </div>

        <div>
          <button
            onClick={() => handleLogout()}
            className="driver-confirmation-page-btn"
          >
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverConfirmation;
