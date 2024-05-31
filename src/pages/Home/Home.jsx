import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/sea2.jpg";
import infoIcon from "../../assets/info.svg";
import "./Home.css";
import { DriverContext } from "../../contexts/DriverContext";
import { PassengerContext } from "../../contexts/PassengerContext";

const Home = () => {
  const { IsLoggedInDriver } = useContext(DriverContext);
  const { IsLoggedInPassenger } = useContext(PassengerContext);

  console.log(IsLoggedInDriver);
  console.log(IsLoggedInPassenger);

  return (
    <div className="App-Wrapper">
      <div className="App-Overlay"></div>
      <div className="Bg-Image">
        <img src={bgImage} alt="" />
      </div>
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
            <img className="infoIcon" src={infoIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
