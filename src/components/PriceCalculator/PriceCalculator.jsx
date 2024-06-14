import React, { useState, useEffect, useContext } from "react";
import "./PriceCalculator.css";
import { DriverContext } from "../../contexts/DriverContext";

const PriceCalculator = ({ distance, rate, name }) => {
  const { destinationPrice, setDestinationPrice } = useContext(DriverContext);
  const maxDestinationPrice = distance * rate;

  useEffect(() => {
    const interval = setInterval(() => {
      setDestinationPrice((prevDestinationPrice) => {
        if (prevDestinationPrice < maxDestinationPrice) {
          return Math.round(prevDestinationPrice + rate);
        } else {
          clearInterval(interval);
          return Math.round(maxDestinationPrice);
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [rate, maxDestinationPrice]);

  return (
    <div>
      <p>
        Rekommenderat lägsta pris: <br /> {destinationPrice}kr per person.
      </p>
      <p>
        Från Visby till {name}: {distance} km
      </p>
    </div>
  );
};

export default PriceCalculator;
