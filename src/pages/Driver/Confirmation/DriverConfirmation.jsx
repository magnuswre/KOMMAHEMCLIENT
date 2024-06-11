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

  const formatTime = (time) => {
    if (time) {
      return time.slice(0, -3); // Trims the last ":00"
    }
    return time;
  };

  return (
    <div className="driver-confirmation-page-container">
      <div className="driver-confirmation-page-wrapper">
        <div className="driver-confirmation-page-bookinginformation">
          <p>Tack för din körning till:</p>
          <p>
            <span>{placeNameDriver}</span>
          </p>
          <p>
            <span>{selectedDateDriver}</span>
          </p>
          <p>
            Avgångstid: <span> {formatTime(arrivalDriver.departure_time)}</span>
          </p>
          <p>
            Ankomsttid: <span> {formatTime(arrivalDriver.arrival_time)}</span>
          </p>
          <p>
            Rutt: <span> {arrivalDriver.route}</span>
          </p>

          <p>
            Antal platser: <span> {seatsDriver} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverConfirmation;
