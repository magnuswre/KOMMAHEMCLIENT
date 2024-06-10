import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Driver from "./pages/Driver/Driver";
import DriverRegister from "./pages/Driver/Register/DriverRegister";
import DriverLogin from "./pages/Driver/Login/DriverLogin";
import DriverConfirmation from "./pages/Driver/Confirmation/DriverConfirmation";
import DriverForgotPassword from "./pages/Driver/DriverForgotPassword/DriverForgotPassword";
import DriverReset from "./pages/Driver/DriverReset/DriverReset";
import DriverRecovered from "./pages/Driver/DriverRecovered/DriverRecovered";
import DriverOPTInput from "./pages/Driver/DriverOPTInput/DriverOPTInput";

import Passenger from "./pages/Passenger/Passenger";
import PassengerRegister from "./pages/Passenger/Register/PassengerRegister";
import PassengerLogin from "./pages/Passenger/Login/PassengerLogin";
import PassengerConfirm from "./pages/Passenger/PassengerConfirm/PassengerConfirm";
import PassengerDashboard from "./pages/Passenger/Dashboard/PassengerDashboard";
import PassengerForgotPassword from "./pages/Passenger/PassengerForgotPassword/PassengerForgotPassword";
import PassengerReset from "./pages/Passenger/PassengerReset/PassengerReset";
import PassengerRecovered from "./pages/Passenger/PassengerRecovered/PassengerRecovered";
import PassengerOPTInput from "./pages/Passenger/PassengerOPTInput/PassengerOPTInput";
import DriverDashboard from "./pages/Driver/DriverDashboard/DriverDashboard";

import { useContext } from "react";
import { DriverContext } from "./contexts/DriverContext";
import { PassengerContext } from "./contexts/PassengerContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const { isLoggedInDriver } = useContext(DriverContext);
  const { isLoggedInPassenger } = useContext(PassengerContext);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        {/* DRIVER */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInDriver}
              redirectTo="/driverlogin"
            >
              <Driver />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driverdashboard"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInDriver}
              redirectTo="/driverlogin"
            >
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driverconfirmation"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInDriver}
              redirectTo="/driverlogin"
            >
              <DriverConfirmation />
            </ProtectedRoute>
          }
        />

        <Route path="/driverregister" element={<DriverRegister />} />
        <Route path="/driverlogin" element={<DriverLogin />} />
        <Route
          path="/driverforgotpassword"
          element={<DriverForgotPassword />}
        />
        <Route path="/driveroptinput" element={<DriverOPTInput />} />
        <Route path="/driverreset" element={<DriverReset />} />
        <Route path="/driverrecovered" element={<DriverRecovered />} />

        {/* PASSENGER */}
        <Route
          path="/passenger"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInPassenger}
              redirectTo="/passengerlogin"
            >
              <Passenger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passengerdashboard"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInPassenger}
              redirectTo="/passengerlogin"
            >
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passengerconfirmation"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedInPassenger}
              redirectTo="/passengerlogin"
            >
              <PassengerConfirm />
            </ProtectedRoute>
          }
        />

        <Route path="/passengerregister" element={<PassengerRegister />} />
        <Route path="/passengerlogin" element={<PassengerLogin />} />
        <Route
          path="/passengerforgotpassword"
          element={<PassengerForgotPassword />}
        />
        <Route path="/passengeroptinput" element={<PassengerOPTInput />} />
        <Route path="/passengerreset" element={<PassengerReset />} />
        <Route path="/passengerrecovered" element={<PassengerRecovered />} />
      </Routes>
    </>
  );
}

export default App;
