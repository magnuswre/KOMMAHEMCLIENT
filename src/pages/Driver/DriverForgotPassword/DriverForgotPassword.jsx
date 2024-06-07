import React, { useEffect } from "react";
import "./DriverForgotPassword.css";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../../contexts/RecoveryContext";

const DriverForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, setRecipient_email, error } =
    useContext(RecoveryContext);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      console.error("Please provide an email");
      return;
    }

    try {
      await forgotPassword(formData.email);
      setRecipient_email(formData.email);
      navigate("/Driveroptinput");
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="DriverFP-container">
      <form className="DriverFP" onSubmit={handleSubmit}>
        <div className="DriverFP-form-group">
          <label className="DriverFP-form-label" htmlFor="email">
            Ange din e-post:
          </label>

          <input
            type="email"
            name="email"
            className="DriverFP-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button
          id="DriverFP-btn"
          className="DriverFP-btn btn-primary"
          type="submit"
        >
          Skicka återställningskod
        </button>

        <p className="DriverFP-error-message">{error}</p>
      </form>
    </div>
  );
};

export default DriverForgotPassword;
