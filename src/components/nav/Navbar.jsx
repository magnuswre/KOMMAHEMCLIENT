import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import "./Navbar.css";
import { DriverContext } from "../../contexts/DriverContext";
import { PassengerContext } from "../../contexts/PassengerContext";

const Navbar = () => {
  const { isLoggedInDriver, setIsLoggedInDriver } = useContext(DriverContext);
  const { isLoggedInPassenger, setIsLoggedInPassenger } =
    useContext(PassengerContext);

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
      <div>
        <Link to="/">
          <p className="home-navigation">kommahem</p>
        </Link>
      </div>
      {isLoggedInDriver && (
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
      {isLoggedInPassenger && (
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
