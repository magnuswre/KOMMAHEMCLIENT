import React, { useContext, useEffect } from "react";
import ReactMapComponent from "../../components/ReactMapComponent/ReactMapComponent";
import DriverForm from "../../components/DriverForm/DriverForm";
import "./Driver.css";
import { DriverContext } from "../../contexts/DriverContext";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const navigate = useNavigate();
  const { setUserDriver } = useContext(DriverContext);

  useEffect(() => {
    const token = localStorage.getItem("user-driver");
    const parsedToken = JSON.parse(token);
    const { user } = parsedToken;
    const userDriverId = user.id;
    setUserDriver(userDriverId);
  }, []);

  const handleDashboardClick = () => {
    navigate("/driverdashboard");
  };

  return (
    <div className="driver-page-container">
      <button
        className="driver-page-destination-btn"
        onClick={handleDashboardClick}
      >
        Bokningar och konto
      </button>
      <ReactMapComponent />
      <DriverForm />
    </div>
  );
};

export default Driver;
