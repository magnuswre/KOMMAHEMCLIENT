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

  // console.log(bookings);
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
