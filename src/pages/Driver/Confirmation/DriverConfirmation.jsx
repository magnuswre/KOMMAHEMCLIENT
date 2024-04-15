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
    startDateDriver, 
    setUserDriver,
    setIsLoggedInDriver 
  } =
    useContext(DriverContext);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    console.log(placeNameDriver, arrivalDriver, seatsDriver, startDateDriver);
  }, []);

  const handleChange = () => {
    navigate(`/driverchange/${userId}`);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  const handleLogout = () => {
    console.log("Logout");
    setUserDriver({});
    setIsLoggedInDriver(false);
    navigate("/");
  };

  return (
    <div className="driver-confirmation-page-container">
      <div className="driver-confirmation-page-wrapper">
        <div className="driver-confirmation-page-bookinginformation">
          <h2>Tack för din körning!</h2>
          <h2>
            <span>{placeNameDriver}</span>
          </h2>
          <h2>
            <span>{startDateDriver.toLocaleDateString()}</span>
          </h2>
          <h2>
            Ankomsttid: <span> {arrivalDriver}</span>
          </h2>
          <h2>
            Antal platser: <span> {seatsDriver}</span>
          </h2>
        </div>
        <div>
          <button
            onClick={() => handleChange()}
            className="driver-confirmation-page-btn"
          >
            Vill du ändra senaste?
          </button>
        </div>
        <div>
          <button
            onClick={() => handleDelete()}
            className="driver-confirmation-page-btn"
          >
            Vill du ta bort senaste?
          </button>
          {isDeleteModalOpen && (
            <div className="delete-modal">
              <p>Är du säker på att du vill ta bort?</p>
              <button onClick={handleDeleteConfirm}>Ja</button>
              <button onClick={handleDeleteCancel}>Nej</button>
            </div>
          )}
        </div>

        <div>
          <h2>Alla mina körningar:</h2>
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
