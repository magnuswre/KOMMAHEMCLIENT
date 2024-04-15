import React, { useContext, useEffect, useState } from "react";
import "./Passenger.css";
import { useNavigate } from "react-router-dom";
import { PassengerContext } from "../../contexts/PassengerContext";
import MyDatePickerComponentPassenger from "../../components/DatePickerComponents/DatePickerComponentPassenger/MyDatePickerComponentPassenger";

const Passenger = () => {
  const navigate = useNavigate();

  const [inputClicked, setInputClicked] = useState(false);

  const {
    passengerIsLoggedIn,
    getAllDestinations,
    allDestinations,
    getAllDestinationCurrentByDate,
    allDestinationsByCurrentDate,
    allDestinationsByChosenDate,
  } = useContext(PassengerContext);

  const date = new Date().toISOString().split("T")[0];
  console.log("Current date Passenger.jsx", date);

  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    getAllDestinationCurrentByDate(date);
    getAllDestinations();
    console.log(passengerIsLoggedIn);
    console.log(allDestinationsByCurrentDate);
  }, []);

  const navigateToLogin = (destination) => {
    console.log("Clicked on:", destination);
    navigate("/passengerlogin", { state: { destination } });
  };

  const navigateToPassengerChange = (destination) => {
    console.log("Clicked on:", destination);
    navigate("/passengerchange", { state: { destination } });
  };

  return (
    <>
      {!passengerIsLoggedIn ? (
        <div className="passenger-page-container">
          <div className="passenger-page-wrapper">
            <div className="destinations-list-current-day">
              <div>
                <h2>Alla destinationer: </h2>
              </div>
              <div>
                {Array.isArray(allDestinations) &&
                  allDestinations.slice(0, displayCount).map((destination) => (
                    <button
                      key={destination.id}
                      className="destination-btn"
                      onClick={() => navigateToLogin(destination)}
                    >
                      {destination.enddestination}
                    </button>
                  ))}
              </div>
              {allDestinations.length > displayCount && (
                <button
                  className="green-btn"
                  onClick={() => navigateToLogin()}
                >
                  Fler destinationer
                </button>
              )}
            </div>
            <div className="destinations-list-searched-day"></div>
          </div>
        </div>
      ) : (
        <div className="passenger-page-container">
          <div className="passenger-page-wrapper">
            <div className="destinations-list-current-day">
              <div className="Passenger-search-current-date">
                <h2>Alla körningar idag: </h2>
              </div>
              <div>
                {Array.isArray(allDestinationsByCurrentDate) &&
                allDestinationsByCurrentDate.length > 0 ? (
                  allDestinationsByCurrentDate.map((destination) => (
                    <button
                      key={destination.id}
                      className="destination-btn-current-date"
                      onClick={() => navigateToPassengerChange(destination)}
                    >
                      {destination.enddestination}
                    </button>
                  ))
                ) : (
                  <p>Tyvärr, inga körningar idag.</p>
                )}
              </div>
            </div>
            <div className="destinations-list-searched-day">
              <div className="Passenger-search-chosen-date ">
                <h2>Eller välj ett datum:</h2>
              </div>
              <div>
                <MyDatePickerComponentPassenger
                  onInputClick={() => setInputClicked(true)}
                />
              </div>
              <div></div>
              <div>
                {inputClicked &&
                  (Array.isArray(allDestinationsByChosenDate) &&
                  allDestinationsByChosenDate.length > 0 ? (
                    allDestinationsByChosenDate.map((destination) => (
                      <button
                        key={destination.id}
                        className="destination-btn-chosen-date"
                        onClick={() => navigateToPassengerChange(destination)}
                      >
                        {destination.enddestination}
                      </button>
                    ))
                  ) : (
                    <p>Tyvärr, inga körningar ditt valda datum.</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Passenger;
