import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PassengerLogin.css";
import { PassengerContext } from "../../../contexts/PassengerContext";
import Navbar from "../../../components/nav/Navbar";

const PassengerLogin = () => {
  const navigate = useNavigate();
  const {
    loginUserPassenger,
    errorMessagePassenger,
    clearErrorMessagePassenger,
  } = useContext(PassengerContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.email) {
      setError((data) => ({
        ...data,
        email: "Du behöver ange en e-postadress",
      }));
      hasError = true;
    }

    if (!formData.password) {
      setError((data) => ({
        ...data,
        password: "Du behöver ange ett lösenord",
      }));
      hasError = true;
    }

    if (hasError) return;

    try {
      clearErrorMessagePassenger();
      const response = await loginUserPassenger(
        formData.email,
        formData.password
      );
      navigate(`/passenger`);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="PassengerLogin-container">
      <form className="PassengerLoginForm-login" onSubmit={handleSubmit}>
        <p className="PassengerLogin-form-text">
          Logga in till ditt konto här:
        </p>
        <div className="PassengerLogin-form-group">
          <label className="PassengerLogin-form-labels" htmlFor="email">
            E-post*
          </label>
          <p className="PassengerLogin-red-text">
            <Link
              className="PassengerLogin-error-text"
              to={"/passengerregister"}
              style={{ color: "red" }}
            >
              Skaffa konto här
            </Link>
          </p>
          <p className="PassengerLogin-red-text">
            <Link
              className="PassengerLogin-error-text"
              to={"/passengerforgotpassword"}
              style={{ color: "red" }}
            >
              Glömt lösenord?
            </Link>
          </p>
          <input
            type="email"
            name="email"
            className="PassengerLogin-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="PassengerLogin-error-text">{error.email}</p>
        </div>
        <div className="PassengerLogin-form-group">
          <label className="PassengerLogin-form-labels" htmlFor="password">
            Lösenord*
          </label>
          <input
            type="password"
            name="password"
            className="PassengerLogin-input"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="PassengerLogin-error-text">{error.password}</p>
        </div>
        <button
          id="PassengerLogin-btn"
          className="PassengerLogin-btn btn-primary"
          type="submit"
        >
          Logga in
        </button>
        {errorMessagePassenger && (
          <p className="PassengerLogin-error-message">
            {errorMessagePassenger}
          </p>
        )}
      </form>
    </div>
  );
};

export default PassengerLogin;
