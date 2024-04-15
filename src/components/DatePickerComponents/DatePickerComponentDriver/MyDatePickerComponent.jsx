import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyDatePickerComponent.css"; // Import your custom CSS for styling
import { DriverContext } from "../../../contexts/DriverContext";
import { PassengerContext } from "../../../contexts/PassengerContext";

const MyDatePickerComponent = () => {
 
  const { setAllDestinationsByChosenDate } = useContext(PassengerContext);
  const { startDateDriver, setStartDateDriver } = useContext(DriverContext); 
  
  const handleDateChange = (date) => {
    setStartDateDriver(date);
    setAllDestinationsByChosenDate(date);
    console.log('setStartDateDriver DRIVER', date);
  };

  const CustomInput = ({ value, onClick }) => (
    <input
      className="custom-datepicker-input" // Add your custom styling class here
      value={value}
      onClick={onClick}
      readOnly
    />
  );

  return (
    <div className="MyDatePickerComponent-container">
      <DatePicker
        selected={startDateDriver}
        onChange={handleDateChange}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default MyDatePickerComponent;
