import React, { useContext } from "react";
import { useState } from "react";
import { checkIfEmpty } from "./Validation";
import { useNavigate } from "react-router-dom";
import "./DriverRegister.css";
import { DriverContext } from "../../../contexts/DriverContext";

const initState = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const DriverRegister = () => {
  const { registerUserDriver,  } = useContext(DriverContext);
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
    // Reset error state
    setError({
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    if (checkIfEmpty(formData.email)) {
      setError((data) => {
        return {
          ...data,
          email: "You need to enter a email address",
        };
      });
      return; // Return after validation fails
    }

    if (checkIfEmpty(formData.phone)) {
      setError((data) => {
        return {
          ...data,
          phone: "You need to enter a phone number",
        };
      });
      return; // Return after validation fails
    }

    if (checkIfEmpty(formData.password)) {
      setError((data) => {
        return {
          ...data,
          password: "You need to enter a password",
        };
      });
      return; // Return after validation fails
    }

    if (formData.password !== formData.confirmPassword) {
      setError((data) => {
        return {
          ...data,
          confirmPassword: "password does not match",
        };
      });
      return; // Return after validation fails
    }

    const { confirmPassword, ...userDataToSend } = formData;

    registerUserDriver(userDataToSend)
      .then(() => {
        // Registration successful, you can navigate or perform additional actions
        console.log("User registered successfully");
        navigate('/driverlogin');
      })
      .catch((error) => {
        // Handle registration error
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="DriverRegister-container">
      <div className="DriverRegister-create-form">
        <p className="DriverRegister-form-text">
        Registrera ditt nya konto här:
        </p>
        <form onSubmit={handleSubmit}>
          <div className="DriverRegister-form-group right"></div>
          <div className="DriverRegister-form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              className="DriverRegister-input"
              id="DriverRegister-email"
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
              className="DriverRegister-input"
              id="DriverRegister-phone"
              value={formData.phone}
              onChange={handleChaneInput}
            />
            <p className="error-text">{error.phone}</p>
          </div>
          <div className="DriverRegister-form-group">
            <label htmlFor="password">Lösenord*</label>
            <input
              type="password"
              name="password"
              className="DriverRegister-input"
              id="DriverRegister-password"
              value={formData.password}
              onChange={handleChaneInput}
            />
            <p className="error-text"> {error.password}</p>
          </div>
          <div className="DriverRegister-form-group">
            <label htmlFor="confirmPassword">Ange lösenord igen*</label>
            <input
              type="password"
              name="confirmPassword"
              className="DriverRegister-input"
              id="DriverRegister-confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChaneInput}
            />
            <p className="error-text">{error.confirmPassword}</p>
          </div>

          <div>
            <input className="DriverRegister-checkbox" type="checkbox" />
            <label className="DriverRegister-text" htmlFor="checkbox">
              I have read and accepts the terms and agreements
            </label>
          </div>
          <button id="DriverRegister-Btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DriverRegister;
