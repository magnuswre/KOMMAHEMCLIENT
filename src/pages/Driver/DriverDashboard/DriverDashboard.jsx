import DestinationCard from "../../../components/DestinationCard/DestinationCard";
import { DriverContext } from "../../../contexts/DriverContext";
import "./DriverDashboard.css";
import React, { useContext, useEffect, useState } from "react";

const DriverDashboard = () => {
  const {
    currentPasswordDriver,
    setCurrentPasswordDriver,
    newPasswordDriver,
    setNewPasswordDriver,
    handleChangePasswordDriver,
    deleteUserDriver,
    getDestinationsByUserId,
  } = useContext(DriverContext);

  const user = JSON.parse(localStorage.getItem("user-driver"));
  const userEmail = user.user.email;
  const userPhone = user.user.phone;
  const userId = user.user.id;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      const user = JSON.parse(localStorage.getItem("user-driver"));
      if (user && user.user && "id" in user.user) {
        const userId = user.user.id;
        const userDestinations = await getDestinationsByUserId(userId);
        setDestinations(userDestinations);
      } else {
        console.log(
          "User not found in local storage or user object does not have an id property"
        );
      }
    };
    fetchDestinations();
  }, []);

  const handlePasswordChange = async () => {
    const result = await handleChangePasswordDriver(
      userId,
      currentPasswordDriver,
      newPasswordDriver
    );
    setPasswordChangeMessage(result.message);
  };

  return (
    <div className="Driver-dashboard-container">
      <div className="Driver-dashboard-wrapper">
        <div className="Driver-dashboard-account-container">
          <h2>Mina kontouppgifter:</h2>
          <div className="Driver-dashboard-account-group">
            <p>E-post: </p>
            <p>{userEmail}</p>
          </div>
          <div className="Driver-dashboard-account-group">
            <p>Telefonnummer: </p>
            <p>{userPhone}</p>
          </div>

          <div>
            <p>Ändra lösenord:</p>
            <div className="Driver-dashboard-change-password">
              <input
                className="Driver-dashboard-change-password-input"
                type="password"
                placeholder="Ange nuvarande lösenord"
                value={currentPasswordDriver}
                onChange={(e) => setCurrentPasswordDriver(e.target.value)}
              />
              <input
                className="Driver-dashboard-change-password-input"
                type="password"
                placeholder="Ange nytt lösenord"
                value={newPasswordDriver}
                onChange={(e) => setNewPasswordDriver(e.target.value)}
              />
            </div>
          </div>
          {passwordChangeMessage && (
            <div className="password-change-message">
              <p>{passwordChangeMessage}</p>
            </div>
          )}
          <div className="Driver-dashboard-btns">
            <button
              className="Driver-dashboard-change-password-btn"
              onClick={handlePasswordChange}
            >
              Uppdatera lösenord
            </button>
            {!showDeleteConfirm ? (
              <button
                className="Driver-dashboard-delete-account-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Radera mitt konto
              </button>
            ) : (
              <>
                <button
                  className="Driver-dashboard-delete-account-btn"
                  onClick={() => {
                    deleteUserDriver(user.user.id);
                    setShowDeleteConfirm(false);
                  }}
                >
                  Ja, radera mitt konto
                </button>
                <button
                  className="Driver-dashboard-delete-account-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Avbryt
                </button>
              </>
            )}
          </div>
        </div>

        <div>
          <h2>Mina körningar:</h2>
          {destinations.map((destination, id) => (
            <DestinationCard key={id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
