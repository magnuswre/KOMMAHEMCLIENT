import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import "./Navbar.css";
import { DriverContext } from "../../contexts/DriverContext";
import { PassengerContext } from "../../contexts/PassengerContext";

const Navbar = () => {
  const { isLoggedInDriver, setIsLoggedInDriver } = useContext(DriverContext);
  const { isLoggedInPassenger, setIsLoggedInPassenger } =
    useContext(PassengerContext);

  const location = useLocation();
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoggedInDriver(false);

      setIsLoggedInPassenger(false);
      localStorage.clear();
    }
  }, [location]);

  const handleLogout = () => {
    if (isLoggedInDriver) {
      setIsLoggedInDriver(false);
    } else if (isLoggedInPassenger) {
      setIsLoggedInPassenger(false);
    }
    localStorage.clear();
  };

  return (
    <div className="nav-icons">
      {location.pathname !== "/" && (
        <button className="chevron-left" onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>
      )}
      {isLoggedInDriver &&
        location.pathname !== "/" &&
        location.pathname !== "/driverlogin" && (
          <div className="icons-navigation">
            <Link to="/driver">
              <MdAddLocationAlt />
            </Link>
            <Link to="/driverdashboard">
              <FiUser />
            </Link>
            <Link to="/" onClick={handleLogout}>
              <MdOutlineLogout />
            </Link>
          </div>
        )}
      {isLoggedInPassenger &&
        location.pathname !== "/" &&
        location.pathname !== "/passengerlogin" && (
          <div className="icons-navigation">
            <Link to="/passenger">
              <MdAddLocationAlt />
            </Link>
            <Link to="/passengerdashboard">
              <FiUser />
            </Link>
            <Link to="/" onClick={handleLogout}>
              <MdOutlineLogout />
            </Link>
          </div>
        )}
    </div>
  );
};

export default Navbar;
