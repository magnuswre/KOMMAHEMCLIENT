import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const PassengerContext = createContext();
const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";
// const baseUrl = "http://localhost:5000";

const PassengerContextProvider = ({ children }) => {
  const [IsLoggedInPassenger, setIsLoggedInPassenger] = useState(false);
  const [userPassenger, setUserPassenger] = useState("");
  const [placeNamePassenger, setPlaceNamePassenger] = useState("");
  const [errorMessagePassenger, setErrorMessagePassenger] = useState("");
  const [allDestinations, setAllDestinations] = useState({});
  const [allDestinationsByCurrentDate, setAllDestinationsByCurrentDate] =
    useState({});
  const [allDestinationsByChosenDate, setAllDestinationsByChosenDate] =
    useState({});
  const [allDestinationsByGroup, setAllDestinationsByGroup] = useState({});
  const [destinationsByDateAndName, setDestinationsByDateAndName] = useState(
    []
  );
  const [
    destinationsByDateNameSeatsAndRoute,
    setDestinationsByDateNameSeatsAndRoute,
  ] = useState([]);
  const [startDatePassenger, setStartDatePassenger] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);

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
      setErrorMessagePassenger("Registration failed. Please try again.");
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
      const responseDataPassenger = response.data;
      localStorage.setItem(
        "user-passenger",
        JSON.stringify(responseDataPassenger)
      );

      setUserPassenger(responseDataPassenger);
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error:", error.message);
      console.error(
        "Custom error:",
        "Incorrect email or password. Please try again."
      );
      setErrorMessagePassenger(
        "Incorrect email or password. Please try again."
      );
      throw error;
    }
  };

  const clearErrorMessagePassenger = () => {
    setErrorMessagePassenger("");
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

  // --------GET DESTINATIONS BY CHOSEN DATE--------//

  const getAllDestinationByChosenDate = async (date) => {
    try {
      const response = await axios.get(
        `${baseUrl}/destinations/chosen/${date}`
      );
      if (response.status === 500) {
        throw new Error("Server error");
      } else if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      // console.log("GET DESTINATION BY CHOSEN DATE FUNCTION", responseData);

      setAllDestinationsByChosenDate(responseData);
      // return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  // --------GET DESTINATION BY GROUP--------//

  const getAllDestinationByGroup = async (date) => {
    try {
      const response = await axios.get(`${baseUrl}/destinationsgrouping`);
      if (response.status === 500) {
        throw new Error("Server error");
      } else if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      console.log("GET DESTINATION BY GROUPS", responseData);

      setAllDestinationsByGroup(responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const getDestinationsByDateAndName = async (traveldate, enddestination) => {
    try {
      const response = await axios.get(
        `${baseUrl}/destinations/${traveldate}/${enddestination}`
      );
      setDestinationsByDateAndName(response.data);
      console.log("getDestinationsByDateAndName", response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDestinationsByDateNameSeatsAndRoute = async (
    traveldate,
    enddestination,
    seats,
    arrivalTime,
    departureTime,
    route
  ) => {
    try {
      const response = await axios.get(
        `${baseUrl}/destinations/${traveldate}/${enddestination}/${seats}/${arrivalTime}/${departureTime}/${route}`
      );
      console.log("getDestinationsByDateNameSeatsAndRoute", response.data);
      setDestinationsByDateNameSeatsAndRoute(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoutes = async (date, destination) => {
    try {
      const response = await axios.get(
        `${baseUrl}/routes/${date}/${destination}`
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const createBooking = async (
    traveldate,
    enddestination,
    seats,
    arrival_time,
    departure_time,
    route,
    user_id,
    destinationId
  ) => {
    try {
      console.log({
        traveldate,
        enddestination,
        seats,
        arrival_time,
        departure_time,
        route, // added
        user_id,
        destinationId,
      });

      const response = await axios.post(
        `${baseUrl}/booking/create`,
        {
          traveldate,
          enddestination,
          seats,
          arrival_time,
          departure_time,
          route,
          user_id,
          destinationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  //------GET BOOKINGS BY USER ID-------//
  const getBookingsByUserId = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/bookings/${userId}`, {
        params: {
          user_id: userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  //-----CLEAR ERROR MESSAGE-----//
  const clearErrorMessage = () => {
    setErrorMessagePassenger("");
  };

  const value = {
    IsLoggedInPassenger,
    setIsLoggedInPassenger,
    getAllDestinations,
    allDestinations,
    registerUserPassenger,
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
    setStartDatePassenger,
    getAllDestinationByGroup,
    allDestinationsByGroup,
    getDestinationsByDateAndName,
    destinationsByDateAndName,
    selectedDate,
    setSelectedDate,
    getDestinationsByDateNameSeatsAndRoute,
    destinationsByDateNameSeatsAndRoute,
    setDestinationsByDateNameSeatsAndRoute,
    fetchRoutes,
    arrivalTimes,
    setArrivalTimes,
    selectedSeats,
    setSelectedSeats,
    arrivalTime,
    setArrivalTime,
    createBooking,
    selectedDestination,
    setSelectedDestination,
    clearErrorMessagePassenger,
    setErrorMessagePassenger,
    getBookingsByUserId,
    // bookings,
  };

  return (
    <PassengerContext.Provider value={value}>
      {children}
    </PassengerContext.Provider>
  );
};

export default PassengerContextProvider;
