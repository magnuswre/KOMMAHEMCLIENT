import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MyDatePickerComponentPassenger.css"; 
import { PassengerContext } from "../../../contexts/PassengerContext";

const MyDatePickerComponentPassenger = ({ onInputClick }) => {
 
  const { 
    getAllDestinationByChosenDate,
    startDatePassenger, setStartDatePassenger 
  } = useContext(PassengerContext);
  
  const handleDateChange = (date) => {
    console.log(startDatePassenger)
   setStartDatePassenger(date);
    console.log('setStartDateDriver PASSENGER', date);
    console.log(date.toISOString().split('T')[0]);
    getAllDestinationByChosenDate(date.toISOString().split('T')[0]);
};

  const CustomInput = ({ value, onClick }) => (
    <input
      className="custom-datepicker-input" 
      value={value}
      onClick={() => { onClick(); onInputClick(); }}
      readOnly
    />
  );

  return (
    <div className="MyDatePickerComponent-container">
      <DatePicker
        selected={startDatePassenger}
        onChange={handleDateChange}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default MyDatePickerComponentPassenger;
