import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const PassengerContext = createContext();
const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";

const PassengerContextProvider = ({ children }) => {
  const [passengerIsLoggedIn, setPassengerIsLoggedIn] = useState(false);
  const [userPassenger, setUserPassenger] = useState("");
  const [placeNamePassenger, setPlaceNamePassenger] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allDestinations, setAllDestinations] = useState({});
  const [allDestinationsByCurrentDate, setAllDestinationsByCurrentDate] = useState({});
  const [allDestinationsByChosenDate, setAllDestinationsByChosenDate] = useState({});
  const [startDatePassenger, setStartDatePassenger] = useState(new Date());

  //------ GET ALL DESTINATIONS-------//
  const getAllDestinations = async () => {
    try {
      const response = await axios.get(`${baseUrl}/destinations/all`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      console.log(responseData);

      setAllDestinations(responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  //------ REGISTER USER PASSENGER-------//
  const registerUserPassenger = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/users/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }
      const responseData = response.data;
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Registration failed. Please try again.");
      throw error;
    }
  };

  //------ LOGIN USER PASSENGER-------//
  const loginUserPassenger = async (email, password) => {
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

      const responseData = response.data;
      localStorage.setItem("user-passenger", JSON.stringify(responseData));

      setUserPassenger(responseData);
      setPassengerIsLoggedIn(true);
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Login failed. Please try again.");
      throw error;
    }
  };

  // -------GET DESTINATION BY CURRENT DATE-------//
  const getAllDestinationCurrentByDate = async (date) => {
    try {
      const response = await axios.get(`${baseUrl}/destinations/${date}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      console.log(responseData);
      setAllDestinationsByCurrentDate(responseData);
      // return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  // //---------GET DESTINATION BY CHOSEN DATE--------//
  // const getAllDestinationByChosenDate = async (date) => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/destinations/${date}`);
  //     if (response.status < 200 || response.status >= 300) {
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }
  //     const responseData = response.data;
  //     console.log('GET DESTINATION BY CHOSEN DATE FUNCTION', responseData);


  //     setAllDestinationsByChosenDate(responseData);
  //     // return responseData;
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     throw error;
  //   }
  // };

  // --------GET DESTINATION BY CHOSEN DATE--------//
  
  const getAllDestinationByChosenDate = async (date) => {
    try {
      const response = await axios.get(`${baseUrl}/destinations/chosen/${date}`);
      if (response.status === 500) {
        throw new Error('Server error');
      } else if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      console.log('GET DESTINATION BY CHOSEN DATE FUNCTION', responseData);
  
      setAllDestinationsByChosenDate(responseData);
      // return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };



  //-----CLEAR ERROR MESSAGE-----//
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const value = {
    passengerIsLoggedIn,
    setPassengerIsLoggedIn,
    getAllDestinations,
    allDestinations,
    registerUserPassenger,
    errorMessage,
    loginUserPassenger,
    userPassenger, 
    setUserPassenger,
    clearErrorMessage,
    getAllDestinationCurrentByDate,
    getAllDestinationByChosenDate,
    allDestinationsByCurrentDate,
    setAllDestinationsByChosenDate,
    allDestinationsByChosenDate,
    placeNamePassenger, 
    setPlaceNamePassenger,
    startDatePassenger, 
    setStartDatePassenger
  };

  return (
    <PassengerContext.Provider value={value}>
      {children}
    </PassengerContext.Provider>
  );
};

export default PassengerContextProvider;
