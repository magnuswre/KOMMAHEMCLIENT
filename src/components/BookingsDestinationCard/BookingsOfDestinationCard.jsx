import React from "react";
import "./BookingsOfDestinationCard.css";

const BookingsOfDestinationCard = ({ bookings }) => {
  return (
    <div className="bookings-destination-card">
      {bookings.map((booking, id) => (
        <div className="bookings-destination-card-item" key={id}>
          <p>E-post: {booking.email}</p>
          <p> Telefon: {booking.phone} </p>
          <p> Bokade platser: {booking.seats} </p>
        </div>
      ))}
    </div>
  );
};

export default BookingsOfDestinationCard;
