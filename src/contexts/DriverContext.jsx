import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DriverContext = createContext();

const DriverContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [IsLoggedInDriver, setIsLoggedInDriver] = useState(false);
  const [placeNameDriver, setPlaceNameDriver] = useState("");
  const [userDriver, setUserDriver] = useState({});
  const [errorMessageDriver, setErrorMessageDriver] = useState("");
  const [arrivalDriver, setArrivalDriver] = useState({});
  const [seatsDriver, setSeatsDriver] = useState("1");
  const [startDateDriver, setStartDateDriver] = useState(new Date());
  const [selectedDateDriver, setSelectedDateDriver] = useState("");
  const [currentPasswordDriver, setCurrentPasswordDriver] = useState("");
  const [newPasswordDriver, setNewPasswordDriver] = useState("");
  const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";
  // const baseUrl = "http://localhost:5000";

  // ---- REGISTER DRIVER ------/

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

  // ---- LOGIN DRIVER ------//

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

  // ---- CHANGE PASSWORD USER DRIVER ---- //

  const handleChangePasswordDriver = async (
    userId,
    currentPasswordDriver,
    newPasswordDriver
  ) => {
    try {
      const response = await fetch(`${baseUrl}/user/${userId}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPasswordDriver,
          newPassword: newPasswordDriver,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return { success: true, message: "Lösenordet uppdaterat" };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  // ------------ DELETE USER DRIVER -------------  //

  const deleteUserDriver = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/usersdriver/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      navigate("/");
      localStorage.setItem("user-driver", "");
    } catch (error) {
      console.error(error);
      alert(error.message);
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

  const getDestinationsByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${userId}/destinations`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        console.error(`Request failed with status: ${response.status}`);
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessageDriver("Fetching destinations failed. Please try again.");
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
    handleChangePasswordDriver,
    currentPasswordDriver,
    setCurrentPasswordDriver,
    newPasswordDriver,
    setNewPasswordDriver,
    deleteUserDriver,
    getDestinationsByUserId,
  };

  return (
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
};

export default DriverContextProvider;
