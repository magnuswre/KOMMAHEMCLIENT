import axios from "axios";
import { createContext, useState } from "react";

export const DriverContext = createContext();

const DriverContextProvider = ({ children }) => {
  const [IsLoggedInDriver, setIsLoggedInDriver] = useState(false);
  const [placeNameDriver, setPlaceNameDriver] = useState("");
  const [userDriver, setUserDriver] = useState({});
  const [errorMessageDriver, setErrorMessageDriver] = useState("");
  const [arrivalDriver, setArrivalDriver] = useState({});
  const [seatsDriver, setSeatsDriver] = useState("1");
  const [startDateDriver, setStartDateDriver] = useState(new Date());
  const [selectedDateDriver, setSelectedDateDriver] = useState("");
  const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";
  // const baseUrl = "http://localhost:5000";

  const registerUserDriver = async (userDataDriver) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        userDataDriver,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessageDriver("Registration failed. Please try again.");
      throw error;
    }
  };

  const loginUserDriver = async (email, password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Login failed with status: ${response.status}`);
      }
      const responseDataDriver = response.data;
      localStorage.setItem("user-driver", JSON.stringify(responseDataDriver));
      setUserDriver(responseDataDriver);
      console.log("DriverContext: UserDriver data:", responseDataDriver);
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessageDriver("Incorrect email or password. Please try again.");
      throw error;
    }
  };

  const clearErrorMessageDriver = () => {
    setErrorMessageDriver("");
  };

  const addDestinationDriver = async (
    placeNameDriver,
    arrivalDriver,
    seatsDriver
  ) => {
    if (!userDriver) {
      console.error("User or user id is undefined");
      setErrorMessageDriver("User or user id is undefined. Please try again.");
      return;
    }

    const startDateString = startDateDriver.toLocaleDateString();

    const destinationDataDriver = {
      enddestination: placeNameDriver,
      traveldate: startDateString,
      arrival_time: arrivalDriver.arrival_time,
      departure_time: arrivalDriver.departure_time,
      seats: seatsDriver,
      route: arrivalDriver.route,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/users/${userDriver}/destinations`,
        destinationDataDriver,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        console.error(`Destination failed with status: ${response.status}`);
        throw new Error(`Destination failed with status: ${response.status}`);
      }

      const responseDataDriver = response.data;
      console.log(responseDataDriver);
      console.log("Destination added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessageDriver("Destination failed. Please try again.");
      throw error;
    }
  };

  const deleteDestinationDriver = async (destinationId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/destinations/${destinationId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        console.error(`Deletion failed with status: ${response.status}`);
        throw new Error(`Deletion failed with status: ${response.status}`);
      }

      console.log("Destination deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessageDriver("Deletion failed. Please try again.");
      throw error;
    }
  };

  const value = {
    IsLoggedInDriver,
    setIsLoggedInDriver,
    placeNameDriver,
    setPlaceNameDriver,
    userDriver,
    setUserDriver,
    registerUserDriver,
    loginUserDriver,
    errorMessageDriver,
    clearErrorMessageDriver,
    arrivalDriver,
    setArrivalDriver,
    seatsDriver,
    setSeatsDriver,
    startDateDriver,
    setStartDateDriver,
    addDestinationDriver,
    selectedDateDriver,
    setSelectedDateDriver,
  };

  return (
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
};

export default DriverContextProvider;
