import React from "react";
import "./BookingsOfDestinationCard.css";

const BookingsOfDestinationCard = ({ bookings }) => {
  const translateStatus = (status) => {
    switch (status) {
      case "active":
        return "aktiv";
      case "cancelled":
        return "avbokad";
      default:
        return status;
    }
  };

  return (
    <div className="bookings-destination-card">
      {bookings.map((booking, id) => (
        <div
          className={`bookings-destination-card-item ${
            booking.status === "cancelled" ? "cancelled" : ""
          }`}
          key={id}
        >
          <p>E-post: {booking.email}</p>
          <p> Telefon: {booking.phone} </p>
          <p> Bokade platser: {booking.seats} </p>
          <p> Status: {translateStatus(booking.status)} </p>
        </div>
      ))}
    </div>
  );
};

export default BookingsOfDestinationCard;
