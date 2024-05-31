import BookingCard from "../../../components/BookingCard/BookingCard";
import { PassengerContext } from "../../../contexts/PassengerContext";
import "./PassengerDashboard.css";
import React, { useContext } from "react";

const PassengerDashboard = () => {
  const { bookings } = useContext(PassengerContext);
  const user = JSON.parse(localStorage.getItem("user-passenger"));
  const userEmail = user.user.email;
  const userPhone = user.user.phone;
  const userPassword = user.user.password;

  return (
    <>
      <div>
        <p>alla mina bokningar:</p>
        {/* render the bookings here */}
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
      <div>
        <p>Mina kontouppgifter:</p>
        <div>
          <p>Email: {userEmail}</p>
          <p>Telefonnummer: {userPhone}</p>
          <p>Ändra lösenord:</p>
        </div>
      </div>
    </>
  );
};

export default PassengerDashboard;
