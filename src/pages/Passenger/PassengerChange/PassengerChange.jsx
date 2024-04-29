import React, { useState } from "react";
import "./PassengerChange.css";
import { useNavigate, useLocation} from "react-router-dom";

const PassengerChange = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const { destination } = location.state || {};

  const [passenger, setPassenger] = useState(true);
  const [arrivalTime, setArrivalTime] = useState("11.25")
  const [selectedSeats, setSelectedSeats] = useState("1");

  const handleSubmit = () => {
    navigate("/passengerconfirmation", { state: { destination, arrivalTime, selectedSeats } }); 
  };

  return (
    <>
      {passenger ? (
        <div className="passenger-change-page-container">
           <div className="passenger-change-page-wrapper">
            <div className="passenger-change-page-destinations-list-current-day">
              <h2>Din destination: {destination.enddestination}</h2>
              <h2>Resedatum: {destination.traveldate}</h2>
            </div>
          </div>
          <div className="passenger-available-seats-container">
            <div>
              <h2>Välj avgång:</h2>
            </div>
            <div>
              <select
                className="passenger-arrival-selection-picker"
                value={arrivalTime} 
                onChange={(e) => setArrivalTime(e.target.value)}
                defaultValue="11.25"
              >
                <option value="11.25">11.25</option>
                <option value="20.45">20.45</option>
              </select>
            </div>

            <div>
              <h2>Välj platser</h2>
            </div>

            <div>
              <select className="passenger-selection-picker" 
              value={selectedSeats} 
              onChange={(e) => setSelectedSeats(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <button id="PassengerChange-Btn" onClick={() => handleSubmit(destination)}>Godkänn</button>
            </div>
          </div>

         
        </div>
      ) : (
        <p>Inga Destinationer tillgängliga</p>
      )}
    </>
  );
};

export default PassengerChange;
