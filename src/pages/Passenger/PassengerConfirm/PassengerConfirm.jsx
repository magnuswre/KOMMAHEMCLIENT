import React from "react";
import "./PassengerConfirm.css";
import { useNavigate, useLocation } from "react-router-dom";

const PassengerConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { destination, arrivalTime, selectedSeats } = location.state || {};

  console.log(destination)

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    // localStorage.setItem("user-driver", "");
    // localStorage.setItem("user", "");
  };

  const handleChange = () => {
    navigate("/passengerchange");
  };

  return (
    <div className="Passenger-confirm-container">
      <form onSubmit={handleSubmit}  className="Passenger-confirm-form">
        <div>
          <h2>
            <span>{destination.enddestination}, </span> 
            <span> {destination.traveldate} </span> 
          </h2>
        </div>
        <div>
          <h2>
            Ankomst:<span>{arrivalTime}</span>
          </h2>
        </div>
        <div>
          <h2>
            Antal passagerare:<span>{selectedSeats}</span>
          </h2>
        </div>
        <div>
          <h2>
            Telefonnummer till förare: <span> 0771-212526</span>
          </h2>
        </div>
        
        <div>
          <button
            className="passenger-confirm-page-btn"
            onClick={() => handleChange()}
          >
            Ändra bokningen
          </button>
        </div>
        {/* <div>
          <input type="checkbox" id="terms-and-conditions" />
          <label htmlFor="terms-and-conditions">Godkänn villkoren</label>
        </div> */}
        <div>
        <button type="submit" className="passenger-confirm-page-btn">
            Logga ut
          </button>
         
        </div>
        <div>
          <p>Bekräftelse skickas även till din angivna mejladress</p>
        </div>
      </form>
    </div>
  );
};

export default PassengerConfirm;
