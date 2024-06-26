import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/info.svg";
import "./Home.css";
import InformationText from "../../components/data/InformationText";
// import { DriverContext } from "../../contexts/DriverContext";
// import { PassengerContext } from "../../contexts/PassengerContext";

const Home = () => {
  // const { IsLoggedInDriver } = useContext(DriverContext);
  // const { IsLoggedInPassenger } = useContext(PassengerContext);

  const [showUserCondition, setShowUserCondition] = useState(false);

  const handleInfoClick = (e) => {
    setShowUserCondition((prev) => !prev);
  };

  // console.log(IsLoggedInDriver);
  // console.log(IsLoggedInPassenger);

  return (
    <div className="App-Wrapper">
      <div className="App-Content">
        <div className="App-Form">
          <div className="App-Title">
            <h1>kommahem</h1>
          </div>
          <div className="Links">
            <Link className="Drive-Btn" to="/driverlogin">
              Köra
            </Link>
            <Link className="Passenger-Btn" to="/passengerlogin">
              Åka
            </Link>
          </div>
          <div className="Icon-Container">
            <img
              className="infoIcon"
              src={infoIcon}
              alt=""
              onClick={handleInfoClick}
            />
          </div>
          {showUserCondition && (
            <div className="modal-InformationText" onClick={handleInfoClick}>
              <div
                className="modal-content-InformationText"
                onClick={(e) => e.stopPropagation()}
              >
                <InformationText />
                <button
                  className="modal-close-InformationText"
                  onClick={handleInfoClick}
                >
                  Stäng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
