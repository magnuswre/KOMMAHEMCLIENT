import React, { useContext, useState } from "react";
import "./DestinationCard.css";
import { DriverContext } from "../../contexts/DriverContext";
import BookingsOfDestinationCard from "../BookingsDestinationCard/BookingsOfDestinationCard";

const DestinationCard = ({ destination, bookingsDestinations }) => {
  const { getBookingsForDestination } = useContext(DriverContext);
  const [bookings, setBookings] = useState([]);

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
    if (time) {
      return time.slice(0, -3);
    }
    return time;
  };

  console.log(destination);

  return (
    <div className="destination-card-container" onClick={handleClick}>
      <div className="destination-card-notice">
        <p>1</p>
      </div>
      <p>Datum: {destination.DestinationTravelDate}</p>
      <p>Destination: {destination.EndDestination}</p>
      <p>Bookingsid: {destination.DestinationId}</p>
      <p>
        Platser kvar: {destination.DestinationSeats} av <span> </span>
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
