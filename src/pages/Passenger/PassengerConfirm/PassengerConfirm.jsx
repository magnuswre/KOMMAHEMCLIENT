import React, { useContext } from "react";
import "./PassengerConfirm.css";
import { useNavigate } from "react-router-dom";
import { PassengerContext } from "../../../contexts/PassengerContext";
// import BookingCard from "../../../components/BookingCard/BookingCard";

const PassengerConfirm = () => {
  const navigate = useNavigate();
  const { bookings } = useContext(PassengerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    localStorage.setItem("user-driver", "");
  };

  const handleChange = () => {
    navigate("/passengerdashboard");
  };

  return (
    <div className="Passenger-confirm-container">
      <div className="Passenger-confirm-wrapper">
        <h2>Tack för din bokning!</h2>
        <p>Bekräftelse skickas även till din angivna mejladress</p>
      </div>
    </div>
  );
};

export default PassengerConfirm;
