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
          email: "Du behöver ange en e-postadress",
        };
      });
      hasError = true;
    }

    if (checkIfEmpty(formData.phone)) {
      setError((data) => {
        return {
          ...data,
          phone: "Du behöver ange ett telefonnummer",
        };
      });
      hasError = true;
    }

    if (checkIfEmpty(formData.password)) {
      setError((data) => {
        return {
          ...data,
          password: "Du behöver ange ett lösenord",
        };
      });
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setError((data) => {
        return {
          ...data,
          confirmPassword: "Lösenorden matchar inte",
        };
      });
      hasError = true;
    }

    if (!termsAccepted) {
      setError((data) => {
        return {
          ...data,
          terms: "Du måste acceptera användarvillkoren",
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
            Registrera ditt konto här:
          </p>
          <div className="PassengerRegister-form-group">
            <label htmlFor="email">E-post*</label>
            <input
              type="email"
              name="email"
              className="PassengerRegister-input"
              id="email"
              value={formData.email}
              onChange={handleChangeInput}
            />
            <p className="PassengerRegister-error-text">{error.email}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="phone">Telefonnummer*</label>
            <input
              type="text"
              name="phone"
              className="PassengerRegister-input"
              id="PassengerRegister-phone"
              value={formData.phone}
              onChange={handleChangeInput}
            />
            <p className="PassengerRegister-error-text">{error.phone}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="password">Lösenord*</label>
            <input
              type="password"
              name="password"
              className="PassengerRegister-input"
              id="PassengerRegister-password"
              value={formData.password}
              onChange={handleChangeInput}
            />
            <p className="PassengerRegister-error-text">{error.password}</p>
          </div>
          <div className="PassengerRegister-form-group">
            <label htmlFor="confirmPassword">Bekräfta lösenordet*</label>
            <input
              type="password"
              name="confirmPassword"
              className="PassengerRegister-input"
              id="PassengerRegister-confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChangeInput}
            />
            <p className="PassengerRegister-error-text">
              {error.confirmPassword}
            </p>
          </div>
          <div className="PassengerRegister-form-group-terms">
            <div className="PassengerRegister-form-group-input-btn">
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
                Jag har läst och accepterar användarvillkoren
              </button>
            </div>
            <div>
              <p className="PassengerRegister-error-text">{error.terms}</p>
            </div>
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
          <button id="PassengerRegister-Btn">Godkänn</button>
        </form>
      </div>
    </div>
  );
};

export default PassengerRegister;
