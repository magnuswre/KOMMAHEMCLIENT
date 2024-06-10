import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DriverLogin.css";
import { DriverContext } from "../../../contexts/DriverContext";

const DriverLogin = () => {
  const navigate = useNavigate();
  const { loginUserDriver, errorMessageDriver, clearErrorMessageDriver } =
    useContext(DriverContext);

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
      clearErrorMessageDriver();
      const response = await loginUserDriver(formData.email, formData.password);
      navigate(`/driver`);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="DriverLogin-container">
      <form className="DriverLoginForm-login" onSubmit={handleSubmit}>
        <p className="DriverLogin-form-text">Logga in till ditt konto här</p>
        <div className="DriverLogin-form-group">
          <label htmlFor="email">Email*</label>
          <p className="DriverLogin-red-text">
            <Link
              className="DriverLogin-error-text"
              to={"/Driverregister"}
              style={{ color: "red" }}
            >
              Skaffa konto här
            </Link>
          </p>
          <p className="DriverLogin-red-text">
            <Link
              className="DriverLogin-error-text"
              to={"/driverforgotpassword"}
              style={{ color: "red" }}
            >
              Glömt lösenord?
            </Link>
          </p>
          <input
            type="email"
            name="email"
            className="DriverLogin-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="DriverLogin-form-group">
          <label htmlFor="password">Lösenord*</label>
          <p className="DriverLogin-red-text1"></p>
          <input
            type="password"
            name="password"
            className="DriverLogin-input"
            id="DriverLogin-password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* <div>
            <input className="DriverLogin-checkbox" type="checkbox" />
            <label className="DriverLogin-text" htmlFor="checkbox">
              Please keep me logged in
            </label>
          </div> */}
        <button
          id="DriverLogin-btn"
          className="DriverLogin-btn btn-primary"
          type="submit"
        >
          Logga in
        </button>

        {errorMessageDriver && (
          <p className="DriverLogin-error-message">{errorMessageDriver}</p>
        )}
      </form>
    </div>
  );
};

export default DriverLogin;
