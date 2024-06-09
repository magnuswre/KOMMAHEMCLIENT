import React from "react";
import "./DestinationCard.css";

const DestinationCard = ({ destination }) => {
  return (
    <div className="destination-card-container">
      <p>Datum: {destination.DestinationTravelDate}</p>
      <p>Destination: {destination.EndDestination}</p>
      <p>Bookingsid: {destination.DestinationId}</p>
      <p>Platser: {destination.DestinationSeats}</p>
      <p>Båttur: {destination.Route}</p>
      <p>Avgångstid: {destination.DepartureTime}</p>
      <p>Ankomsttid: {destination.ArrivalTime}</p>
    </div>
  );
};

export default DestinationCard;
