import BookingCard from "../../../components/BookingCard/BookingCard";
import { PassengerContext } from "../../../contexts/PassengerContext";
import "./PassengerDashboard.css";
import React, { useContext, useEffect, useState } from "react";

const PassengerDashboard = () => {
  const { getBookingsByUserId } = useContext(PassengerContext);
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user-passenger"));
  const userEmail = user.user.email;
  const userPhone = user.user.phone;
  const userPassword = user.user.password;

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

  return (
    <div className="passenger-dashboard-container">
      <div className="passenger-dashboard-wrapper">
        <div className="passenger-dashboard-account-container">
          <h2>Mina kontouppgifter:</h2>
          <div className="passenger-dashboard-account-group">
            <p>Email: </p>
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
              />
              <input
                className="passenger-dashboard-change-password-input"
                type="password"
                placeholder="Ange nytt lösenord"
              />
            </div>
          </div>
          <div className="passenger-dashboard-btns">
            <button className="passenger-dashboard-change-password-btn">
              Uppdatera lösenord
            </button>
            <button className="passenger-dashboard-delete-account-btn">
              Radera mitt konto
            </button>
          </div>
        </div>

        <h2>Alla mina bokningar:</h2>
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default PassengerDashboard;
