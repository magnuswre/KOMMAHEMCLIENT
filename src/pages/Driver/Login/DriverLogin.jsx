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
          <div className="DriverLogin-form-email-links">
            <label htmlFor="email">Email*</label>
            <div>
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
            </div>
          </div>
          <input
            type="email"
            name="email"
            className="DriverLogin-input"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="DriverLogin-error-text">{error.email}</p>
        </div>
        <div className="DriverLogin-form-group">
          <label htmlFor="password">Lösenord*</label>
          <input
            type="password"
            name="password"
            className="DriverLogin-input"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="DriverLogin-error-text">{error.password}</p>
        </div>
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
