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
      setBookings(fetchedBookings); // Set the fetched bookings to the state
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="destination-card-container" onClick={handleClick}>
      <p>Datum: {destination.DestinationTravelDate}</p>
      <p>Destination: {destination.EndDestination}</p>
      <p>Bookingsid: {destination.DestinationId}</p>
      <p>
        Platser kvar: {destination.DestinationSeats} av
        {destination.OriginalSeats}
      </p>
      <p>Båttur: {destination.Route}</p>
      <p>Avgångstid: {destination.DepartureTime}</p>
      <p>Ankomsttid: {destination.ArrivalTime}</p>
      <BookingsOfDestinationCard bookings={bookings} />
    </div>
  );
};

export default DestinationCard;
