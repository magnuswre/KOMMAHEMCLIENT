import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import bgImage from "../../assets/sea2.jpg";
import infoIcon from "../../assets/info.svg";
import "./Home.css";
import InformationText from "../../components/data/InformationText";
// import { DriverContext } from "../../contexts/DriverContext";
// import { PassengerContext } from "../../contexts/PassengerContext";
// import UserCondition from "../../data/UserCondition";

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
      <div className="App-Overlay"></div>
      <div className="Bg-Image">{/* <img src={bgImage} alt="" /> */}</div>
      <div className="App-Content">
        <div className="App-Form">
          <div className="App-Title">
            <h1>kommahem</h1>
          </div>
          <div className="Links">
            <Link className="Passenger-Btn" to="/passengerlogin">
              Åka
            </Link>
            <Link className="Drive-Btn" to="/driverlogin">
              Köra
            </Link>
            {/* <Link className="Change-Btn" to="/change">
              Ändra
            </Link> */}
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
