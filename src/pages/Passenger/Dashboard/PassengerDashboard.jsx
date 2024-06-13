import BookingCard from "../../../components/BookingCard/BookingCard";
import { PassengerContext } from "../../../contexts/PassengerContext";
import "./PassengerDashboard.css";
import React, { useContext, useEffect, useState } from "react";

const PassengerDashboard = () => {
  const {
    getBookingsByUserId,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    deleteUser,
  } = useContext(PassengerContext);

  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-passenger"));
  const userEmail = user.user.email;
  const userPhone = user.user.phone;
  const userId = user.user.id;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("user-passenger"));
      if (user && user.user && "id" in user.user) {
        const userId = user.user.id;
        const userBookings = await getBookingsByUserId(userId);
        setBookings(userBookings);
      } else {
        console.log(
          "User not found in local storage or user object does not have an id property"
        );
      }
    };
    fetchBookings();
  }, []);

  const handlePasswordChange = async () => {
    const result = await handleChangePassword(
      userId,
      currentPassword,
      newPassword
    );
    setPasswordChangeMessage(result.message);
  };

  return (
    <div className="passenger-dashboard-container">
      <div className="passenger-dashboard-wrapper">
        <div className="passenger-dashboard-account-container">
          <h2>Mina kontouppgifter:</h2>
          <div className="passenger-dashboard-account-group">
            <p>E-post: </p>
            <p>{userEmail}</p>
          </div>
          <div className="passenger-dashboard-account-group">
            <p>Telefonnummer: </p>
            <p>{userPhone}</p>
          </div>

          <div>
            <p>Ändra lösenord:</p>
            <div className="passenger-dashboard-change-password">
              <input
                className="passenger-dashboard-change-password-input"
                type="password"
                placeholder="Ange nuvarande lösenord"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                className="passenger-dashboard-change-password-input"
                type="password"
                placeholder="Ange nytt lösenord"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          {passwordChangeMessage && (
            <div className="password-change-message">
              <p>{passwordChangeMessage}</p>
            </div>
          )}
          <div className="passenger-dashboard-btns">
            <button
              className="passenger-dashboard-change-password-btn"
              onClick={handlePasswordChange}
            >
              Uppdatera lösenord
            </button>
            {!showDeleteConfirm ? (
              <button
                className="passenger-dashboard-delete-account-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Radera mitt konto
              </button>
            ) : (
              <>
                <button
                  className="passenger-dashboard-delete-account-btn"
                  onClick={() => {
                    deleteUser(user.user.id);
                    setShowDeleteConfirm(false);
                  }}
                >
                  Ja, radera mitt konto
                </button>
                <button
                  className="passenger-dashboard-delete-account-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Avbryt
                </button>
              </>
            )}
          </div>
        </div>
        <div className="passenger-dashboard-bookingtitle-bookings">
          <h2>Alla mina bokningar:</h2>
          {bookings.map((booking, id) => (
            <BookingCard key={id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
