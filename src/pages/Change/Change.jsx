import React from "react";
import "./Change.css";
import { Link } from "react-router-dom";

const Change = () => {
  return (
    <div className="change-page-container ">
      <div className="change-page-wrapper">
        <div className="change-page-links">
          <Link className="change-page-driverchange" to="/driverlogin">
            Förare
          </Link>
          <Link className="change-page-passengerchange" to="/passengerlogin">
            Passagerare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Change;
