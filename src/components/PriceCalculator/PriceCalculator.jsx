import React, { useState, useEffect } from "react";
import "./PriceCalculator.css";

const PriceCalculator = ({ distance, rate, name }) => {
  const [count, setCount] = useState(0);
  const maxCount = distance * rate;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < maxCount) {
          return Math.round(prevCount + rate);
        } else {
          clearInterval(interval);
          return Math.round(maxCount);
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, [rate, maxCount]);

  return (
    <div>
      <p>
        Rekommenderat lägsta pris: <br /> {count}kr per person.
      </p>
      <p>
        Från Visby till {name}: {distance} km
      </p>
    </div>
  );
};

export default PriceCalculator;
