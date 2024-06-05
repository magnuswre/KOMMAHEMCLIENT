import { DriverContext } from "../../../contexts/DriverContext";
import "./DriverDashboard.css";
import React, { useContext, useEffect, useState } from "react";

const DriverDashboard = () => {
  const {
    // getBookingsByUserId,
    currentPasswordDriver,
    setCurrentPasswordDriver,
    newPasswordDriver,
    setNewPasswordDriver,
    handleChangePasswordDriver,
    deleteUserDriver,
  } = useContext(DriverContext);
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-driver"));
  const userEmail = user.user.email;
  const userPhone = user.user.phone;
  const userId = user.user.id;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     const user = JSON.parse(localStorage.getItem("user-driver"));
  //     if (user && user.user && "id" in user.user) {
  //       const userId = user.user.id;
  //       const userBookings = await getBookingsByUserId(userId);
  //       setBookings(userBookings);
  //     } else {
  //       console.log(
  //         "User not found in local storage or user object does not have an id property"
  //       );
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  return (
    <div className="Driver-dashboard-container">
      <div className="Driver-dashboard-wrapper">
        <div className="Driver-dashboard-account-container">
          <h2>Mina kontouppgifter:</h2>
          <div className="Driver-dashboard-account-group">
            <p>Email: </p>
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
          <div className="Driver-dashboard-btns">
            <button
              className="Driver-dashboard-change-password-btn"
              onClick={handleChangePasswordDriver}
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

        {/* <h2>Alla mina bokningar:</h2>
        {bookings.map((booking, id) => (
          <BookingCard key={id} booking={booking} />
        ))} */}
      </div>
    </div>
  );
};

export default DriverDashboard;
