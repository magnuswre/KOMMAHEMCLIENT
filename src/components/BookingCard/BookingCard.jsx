import { PassengerContext } from "../../contexts/PassengerContext";
import "./BookingCard.css";
import React, { useContext, useEffect, useState } from "react";

const BookingCard = ({ booking: initialBooking }) => {
  const { updateBooking } = useContext(PassengerContext);
  const [showButtons, setShowButtons] = useState(false);
  const [booking, setBooking] = useState(initialBooking);
  const [isActive, setIsActive] = useState(booking.status === "active");

  const mapStatusToSwedish = (status) => {
    switch (status) {
      case "active":
        return "aktiv";
      case "Booking cancelled":
      case "cancelled":
        return "avbokad";
      default:
        return status;
    }
  };

  useEffect(() => {
    setIsActive(booking.status === "active");
  }, [booking.status]);

  const handleCancelBooking = () => {
    setShowButtons(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await updateBooking(booking.id, booking.user_id);
      const updatedStatus = response.message;
      setBooking((prevBooking) => ({ ...prevBooking, status: updatedStatus }));
    } catch (error) {
      console.error(error);
    }
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
      <p>status: {mapStatusToSwedish(booking.status)} </p>
      {isActive && !showButtons && (
        <button className="booking-card-btns" onClick={handleCancelBooking}>
          Avboka
        </button>
      )}

      {isActive && showButtons && (
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
