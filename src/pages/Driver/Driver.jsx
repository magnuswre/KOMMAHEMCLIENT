import React, { useContext, useEffect, useState } from "react";
import ReactMapComponent from "../../components/ReactMapComponent/ReactMapComponent";
import DriverForm from "../../components/DriverForm/DriverForm";
import { DriverContext } from "../../contexts/DriverContext";
import "./Driver.css";

const Driver = () => {
  const { setUserDriver } = useContext(DriverContext);
  const [destinationSelected, setDestinationSelected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user-driver");
    if (token) {
      const parsedToken = JSON.parse(token);
      const { user } = parsedToken;
      const userDriverId = user.id;
      setUserDriver(userDriverId);
    }
  }, [setUserDriver]);

  const handleDestinationSelected = () => {
    setDestinationSelected(true);
  };

  return (
    <div className="driver-page-container">
      <div className="driver-page-wrapper">
        <ReactMapComponent onDestinationSelected={handleDestinationSelected} />
        <DriverForm disabled={!destinationSelected} />
      </div>
    </div>
  );
};

export default Driver;
