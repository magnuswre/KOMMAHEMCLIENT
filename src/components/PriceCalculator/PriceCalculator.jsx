import React, { useState, useEffect } from "react";

const PriceCalculator = ({ distance, rate, name }) => {
  const [count, setCount] = useState(0);
  const maxCount = distance * rate;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < maxCount) {
          return prevCount + rate;
        } else {
          clearInterval(interval);
          return maxCount;
        }
      });
    }, 10); // Adjust this value to make the counter faster or slower

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [rate, maxCount]);

  return (
    <div>
      <p>Rekommenderat lägsta pris: {count}kr per person.</p>
      <p>
        Från Visby till {name}: {distance} km
      </p>
    </div>
  );
};

export default PriceCalculator;
