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
    navigate("/passengerchange");
  };

  return (
    <div className="Passenger-confirm-container">
      <div className="Passenger-confirm-wrapper">
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="passenger-confirm-page-btn"
          >
            Logga ut
          </button>
        </div>
        <div>
          <p>Bekräftelse skickas även till din angivna mejladress</p>
        </div>
        <div>
          <p>Gå till alla mina bokningar</p>
          <div>
            {/* {bookings.map((booking, index) => (
              <BookingCard key={index} booking={booking} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerConfirm;
