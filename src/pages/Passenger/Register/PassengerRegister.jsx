import React, { useContext, useState } from "react";
import { checkIfEmpty } from "./Validation";
import { useNavigate } from "react-router-dom";
import "./PassengerRegister.css";
import { PassengerContext } from "../../../contexts/PassengerContext";
import TermsOfUse from "../../../components/data/TermsOfUse";
import UserCondition from "../../../components/data/UserCondition";

const initState = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const PassengerRegister = () => {
  const { registerUserPassenger } = useContext(PassengerContext);
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [showTerms, setShowTerms] = useState(false);

  const [error, setError] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms((prev) => !prev);
  };

  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    if (name === "terms") {
      setTermsAccepted(checked);
      if (checked) {
        setError((prevError) => {
          return {
            ...prevError,
            terms: "",
          };
        });
      }
    } else {
      setError((prevError) => {
        return {
          ...prevError,
          [name]: "",
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (checkIfEmpty(formData.email)) {
      setError((data) => {
        return {
          ...data,
          email: "You need to enter an email address",
        };
      });
      hasError = true;
    }

    if (checkIfEmpty(formData.phone)) {
      setError((data) => {
        return {
          ...data,
          phone: "You need to enter a phone number",
        };
      });
      hasError = true;
    }

    if (checkIfEmpty(formData.password)) {
      setError((data) => {
        return {
          ...data,
          password: "You need to enter a password",
        };
      });
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setError((data) => {
        return {
          ...data,
          confirmPassword: "Passwords do not match",
        };
      });
      hasError = true;
    }

    if (!termsAccepted) {
      setError((data) => {
        return {
          ...data,
          terms: "You must accept the terms and agreements",
        };
      });
      hasError = true;
    }

    if (hasError) return;

    const { confirmPassword, terms, ...userDataToSend } = formData;

    registerUserPassenger(userDataToSend)
      .then(() => {
        console.log("User registered successfully");
        navigate("/passengerlogin");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });

    setFormData(initState);
  };

  return (
    <div className="PassengerRegister-container">
      <div className="PassengerRegister-create-form">
        <form className="PassengerForm-register" onSubmit={handleSubmit}>
          <p className="PassengerRegister-form-text">
            Register your new account here:
          </p>
          <div className="PassengerRegister-form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              className="PassengerRegister-input"
              id="PassengerRegister-email"
              value={formData.email}
              onChange={handleChangeInput}
            />
            <p className="error-text">{error.email}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="phone">Phone number*</label>
            <input
              type="text"
              name="phone"
              className="PassengerRegister-input"
              id="PassengerRegister-phone"
              value={formData.phone}
              onChange={handleChangeInput}
            />
            <p className="error-text">{error.phone}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              className="PassengerRegister-input"
              id="PassengerRegister-password"
              value={formData.password}
              onChange={handleChangeInput}
            />
            <p className="error-text">{error.password}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              name="confirmPassword"
              className="PassengerRegister-input"
              id="PassengerRegister-confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChangeInput}
            />
            <p className="error-text">{error.confirmPassword}</p>
          </div>
          <div className="PassengerRegister-form-group-terms">
            <input
              className="PassengerRegister-checkbox"
              type="checkbox"
              name="terms"
              checked={termsAccepted}
              onChange={handleChangeInput}
            />
            <button
              onClick={handleTermsClick}
              className="PassengerRegister-text"
            >
              I have read and accept the terms and agreements
            </button>
            <p className="error-text">{error.terms}</p>
          </div>
          {showTerms && (
            <div className="modal-InformationText" onClick={handleTermsClick}>
              <div
                className="modal-content-InformationText"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <UserCondition />
                  <TermsOfUse />
                </div>
                <button
                  className="modal-close-InformationText"
                  onClick={handleTermsClick}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button id="PassengerRegister-Btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PassengerRegister;
