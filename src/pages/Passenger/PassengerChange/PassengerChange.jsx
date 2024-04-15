import React, { useContext, useEffect, useState } from "react";
import "./PassengerChange.css";
import { useNavigate, useLocation} from "react-router-dom";
import { PassengerContext } from "../../../contexts/PassengerContext";
import { DriverContext } from "../../../contexts/DriverContext";
import MyDatePickerComponentPassenger from "../../../components/DatePickerComponents/DatePickerComponentPassenger/MyDatePickerComponentPassenger";

const PassengerChange = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const { destination } = location.state || {};

  const [passenger, setPassenger] = useState(true);

  const handleSubmit = () => {
    navigate("/passengerconfirmation", { state: { destination } }); 
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
              <h2>Välj ankomst:</h2>
            </div>
            <div>
              <select
                className="passenger-arrival-selection-picker"
                defaultValue="-"
              >
                <option value="x">-</option>
                <option value="A">1</option>
                <option value="B">2</option>
              </select>
            </div>

            <div>
              <h2>Välj platser</h2>
            </div>

            <div>
              <select className="passenger-selection-picker" defaultValue="-">
                <option value="x">-</option>
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
