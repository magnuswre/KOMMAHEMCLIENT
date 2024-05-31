import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PassengerLogin.css";
import { PassengerContext } from "../../../contexts/PassengerContext";

const PassengerLogin = () => {
  const navigate = useNavigate();
  const {
    setIsLoggedInPassenger,
    loginUserPassenger,
    errorMessagePassenger,
    clearErrorMessagePassenger,
  } = useContext(PassengerContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      console.error("Please provide both email and password");
      return;
    }

    try {
      clearErrorMessagePassenger();
      const response = await loginUserPassenger(
        formData.email,
        formData.password
      );
      setIsLoggedInPassenger(true);
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
            Email*
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
          <input
            type="email"
            name="email"
            className="PassengerLogin-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="PassengerLogin-form-group">
          <label className="PassengerLogin-form-labels" htmlFor="password">
            Lösenord*
          </label>
          <p className="PassengerLogin-red-text1"></p>
          <input
            type="password"
            name="password"
            className="PassengerLogin-input"
            id="PassengerLogin-password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* <div>
            <input className="PassengerLogin-checkbox" type="checkbox" />
            <label className="PassengerLogin-text" htmlFor="checkbox">
              Please keep me logged in
            </label>
          </div> */}
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
