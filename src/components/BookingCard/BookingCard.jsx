import "./BookingCard.css";
import React, { useState } from "react";

const BookingCard = ({ booking }) => {
  const [showButtons, setShowButtons] = useState(false);

  const handleCancelBooking = () => {
    setShowButtons(true);
  };

  const handleConfirm = () => {
    // Handle the booking cancellation here
    setShowButtons(false);
  };

  const handleCancel = () => {
    setShowButtons(false);
  };

  return (
    <div className="booking-card-container">
      <p>Datum: {booking.traveldate}</p>
      <p>Avresetid: {booking.arrivalTime}</p>
      <p>Slutdestination: {booking.enddestination}</p>
      <p>Sittplatser: {booking.seats}</p>
      <p>Förarens nummer: {booking.driverPhone}</p>
      <p>Förarens email: {booking.driverEmail}</p>
      <p>status: {booking.status} </p>
      {/* <button>Ändra</button> */}
      {!showButtons && (
        <button className="booking-card-btns" onClick={handleCancelBooking}>
          Avboka
        </button>
      )}

      {showButtons && (
        <>
          <button className="booking-card-btns" onClick={handleConfirm}>
            Ja, ta bort min bokning
          </button>
          <button className="booking-card-btns" onClick={handleCancel}>
            Avbryt
          </button>
        </>
      )}
    </div>
  );
};

export default BookingCard;
