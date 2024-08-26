import React, { useContext, useState, useEffect } from "react";
import "./DestinationCard.css";
import { DriverContext } from "../../contexts/DriverContext";
import BookingsOfDestinationCard from "../BookingsDestinationCard/BookingsOfDestinationCard";

const DestinationCard = ({ destination }) => {
  const { getBookingsForDestination } = useContext(DriverContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchInitialBookings = async () => {
      try {
        const initialBookings = await getBookingsForDestination(
          destination.DestinationId
        );
        setBookings(initialBookings);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchInitialBookings();
  }, []);

  const handleClick = async () => {
    try {
      const fetchedBookings = await getBookingsForDestination(
        destination.DestinationId
      );
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const formatTime = (time) => {
    return time ? time.slice(0, -3) : time;
  };

  return (
    <div className="destination-card-container" onClick={handleClick}>
      <div className="destination-card-notice">
        <p>{bookings.length > 0 ? "!" : "-"}</p>
      </div>
      <p>Datum: {destination.DestinationTravelDate}</p>
      <p>Destination: {destination.EndDestination}</p>
      <p>Bookingsid: {destination.DestinationId}</p>
      <p>
        Platser kvar: {destination.DestinationSeats} av{" "}
        {destination.OriginalSeats}
      </p>
      <p>Båttur: {destination.Route}</p>
      <p>Avgångstid: {formatTime(destination.DepartureTime)}</p>
      <p>Ankomsttid: {formatTime(destination.ArrivalTime)}</p>
      <p>Pris: {destination.Price} kr</p>
      <BookingsOfDestinationCard bookings={bookings} />
    </div>
  );
};

export default DestinationCard;
