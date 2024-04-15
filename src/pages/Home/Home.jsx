import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import videoBg from "../../assets/ocean.mov";
import infoIcon from "../../assets/info.svg";
import "./Home.css";
import { DriverContext } from "../../contexts/DriverContext";
import { PassengerContext } from "../../contexts/PassengerContext";

const Home = () => {
  const { IsLoggedInDriver } = useContext(DriverContext);
  const { passengerIsLoggedIn } = useContext(PassengerContext);
  
  console.log(IsLoggedInDriver);
  console.log(passengerIsLoggedIn)

  return (
    <div className="App-Wrapper">
      <div className="App-Overlay"></div>
      <div className="videoBg">
        {/* <video src={videoBg} /> */}
        <video src={videoBg} autoPlay loop muted />
      </div>
      <div className="App-Content">
        <div className="App-Form">
          <div className="App-Title">
            <h1>kommahem</h1>
          </div>
          <div className="Links">
            <Link className="Passenger-Btn" to="/passenger">
              Åka
            </Link>
            <Link className="Drive-Btn" to="/driverlogin">
              Köra
            </Link>
            <Link className="Change-Btn" to="/change">
              Ändra
            </Link>
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
