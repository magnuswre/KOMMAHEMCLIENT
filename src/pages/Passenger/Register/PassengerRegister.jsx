import React, { useContext } from "react";
import { useState } from "react";
import { checkIfEmpty } from "./Validation";
import { useNavigate } from "react-router-dom";
import "./PassengerRegister.css";
import { PassengerContext } from "../../../contexts/PassengerContext";

const initState = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const PassengerRegister = () => {
  const { registerUserPassenger } = useContext(PassengerContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initState);

  const [error, setError] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChaneInput = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkIfEmpty(formData.email)) {
      setError((data) => {
        return {
          ...data,
          email: "You need to enter a email adress",
        };
      });
    }

    if (checkIfEmpty(formData.phone )) {
      setError((data) => {
        return {
          ...data,
          phone: "You need to enter a phone number",
        };
      });
    }

    if (checkIfEmpty(formData.password)) {
      setError((data) => {
        return {
          ...data,
          password: "You need to enter a password",
        };
      });
    }

    if (formData.password != formData.confirmPassword) {
      setError((data) => {
        return {
          ...data,
          confirmPassword: "password does not match ",
        };
      });
      return true;
    }
    
    const { confirmPassword, ...userDataToSend } = formData;

    registerUserPassenger(userDataToSend)
      .then(() => {
        // Registration successful, you can navigate or perform additional actions
        console.log("User registered successfully");
        navigate("/passengerlogin");
      })
      .catch((error) => {
        // Handle registration error
        console.error("Error registering user:", error);
      });

    console.log(formData);
    setFormData(initState);
  };

  return (
    <div className="PassengerRegister-container">
      <div className="PassengerRegister-create-form">
        <form className="PassengerForm-register"  onSubmit={handleSubmit}>
        <p className="PassengerRegister-form-text">
          Registrera ditt nya konto här:
        </p>
          {/* <div className="PassengerRegister-form-group right"></div> */}
          <div className="PassengerRegister-form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              className="PassengerRegister-input"
              id="PassengerRegister-email"
              value={formData.email}
              onChange={handleChaneInput}
            />
            <p className="error-text">{error.email}</p>
          </div>
          <div className="DriverRegister-form-group">
            <label htmlFor="phone">Mobilnummer*</label>
            <input
              type="text"
              name="phone"
              className="PassengerRegister-input"
              id="PassengerRegister-phone"
              value={formData.phone}
              onChange={handleChaneInput}
            />
            <p className="error-text">{error.phone}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="password">Lösenord*</label>
            <input
              type="password"
              name="password"
              className="PassengerRegister-input"
              id="PassengerRegister-password"
              value={formData.password}
              onChange={handleChaneInput}
            />
            <p className="error-text"> {error.password}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="confirmPassword">Ange lösenord igen*</label>
            <input
              type="password"
              name="confirmPassword"
              className="PassengerRegister-input"
              id="PassengerRegister-confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChaneInput}
            />
            <p className="error-text">{error.confirmPassword}</p>
          </div>

          <div>
            <input className="PassengerRegister-checkbox" type="checkbox" />
            <label className="PassengerRegister-text" htmlFor="checkbox">
              I have read and accepts the terms and agreements
            </label>
          </div>
          <button id="PassengerRegister-Btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PassengerRegister;
