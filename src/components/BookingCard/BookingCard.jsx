import "./BookingCard.css";
import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card-container">
      <p>Datum: {booking.traveldate}</p>
      <p>Avresetid: {booking.arrivalTime}</p>
      <p>Slutdestination: {booking.enddestination}</p>
      <p>Sittplatser: {booking.seats}</p>
      <p>Förarens nummer: {booking.driverPhone}</p>
      <p>Förarens email: {booking.driverEmail}</p>
      <p>status: {booking.status} </p>
      <button>Ändra</button>
      <button>Avboka</button>
    </div>
  );
};

export default BookingCard;
