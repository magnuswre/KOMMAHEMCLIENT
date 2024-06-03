import React, { useEffect } from "react";
import "./PassengerForgotPassword.css";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../../contexts/RecoveryContext";

const PassengerForgotPassword = () => {
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
      navigate("/passengeroptinput");
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="PassengerFP-container">
      <form className="PassengerFP" onSubmit={handleSubmit}>
        <div className="PassengerFP-form-group">
          <label className="PassengerFP-form-label" htmlFor="email">
            Ange din email:
          </label>

          <input
            type="email"
            name="email"
            className="PassengerFP-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button
          id="PassengerFP-btn"
          className="PassengerFP-btn btn-primary"
          type="submit"
        >
          Skicka återställningskod
        </button>

        <p className="PassengerFP-error-message">{error}</p>
      </form>
    </div>
  );
};

export default PassengerForgotPassword;
