import React, { useContext, useEffect } from "react";
import ReactMapComponent from "../../components/ReactMapComponent/ReactMapComponent";
import DriverForm from "../../components/DriverForm/DriverForm";
import "./Driver.css";
import { DriverContext } from "../../contexts/DriverContext";

const Driver = () => {
  const { setUserDriver } = useContext(DriverContext);

  useEffect(() => {
    const token = localStorage.getItem("user-driver");
    const parsedToken = JSON.parse(token);
    const { user } = parsedToken;
    const userDriverId = user.id;
    setUserDriver(userDriverId);
  }, []);

  return (
    <div className="driver-page-container">
      <ReactMapComponent />
      <DriverForm />
    </div>
  );
};

export default Driver;
