import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Driver from "./pages/Driver/Driver";
import DriverRegister from "./pages/Driver/Register/DriverRegister";
import DriverLogin from "./pages/Driver/Login/DriverLogin";
import DriverChange from "./pages/Driver/Change/DriverChange";
import DriverConfirmation from "./pages/Driver/Confirmation/DriverConfirmation";
import DriverForgotPassword from "./pages/Driver/DriverForgotPassword/DriverForgotPassword";
import DriverReset from "./pages/Driver/DriverReset/DriverReset";
import DriverRecovered from "./pages/Driver/DriverRecovered/DriverRecovered";
import DriverOPTInput from "./pages/Driver/DriverOPTInput/DriverOPTInput";

import Passenger from "./pages/Passenger/Passenger";
import PassengerRegister from "./pages/Passenger/Register/PassengerRegister";
import PassengerLogin from "./pages/Passenger/Login/PassengerLogin";
import Change from "./pages/Change/Change";
import PassengerChange from "./pages/Passenger/PassengerChange/PassengerChange";
import PassengerConfirm from "./pages/Passenger/PassengerConfirm/PassengerConfirm";
import PassengerDashboard from "./pages/Passenger/Dashboard/PassengerDashboard";
import PassengerForgotPassword from "./pages/Passenger/PassengerForgotPassword/PassengerForgotPassword";
import PassengerReset from "./pages/Passenger/PassengerReset/PassengerReset";
import PassengerRecovered from "./pages/Passenger/PassengerRecovered/PassengerRecovered";
import PassengerOPTInput from "./pages/Passenger/PassengerOPTInput/PassengerOPTInput";
import DriverDashboard from "./pages/Driver/DriverDashboard/DriverDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path="/change" element={<Change />} />

        {/* DRIVER */}
        <Route path="/driver" element={<Driver />} />
        <Route path="/driverregister" element={<DriverRegister />} />
        <Route path="/driverlogin" element={<DriverLogin />} />
        <Route path="/driverchange/:userId" element={<DriverChange />} />
        <Route path="/driverconfirmation" element={<DriverConfirmation />} />
        <Route
          path="/driverforgotpassword"
          element={<DriverForgotPassword />}
        />
        <Route path="/driveroptinput" element={<DriverOPTInput />} />
        <Route path="/driverreset" element={<DriverReset />} />
        <Route path="/driverrecovered" element={<DriverRecovered />} />
        <Route path="/driverdashboard" element={<DriverDashboard />} />

        {/* PASSENGER */}
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/passengerregister" element={<PassengerRegister />} />
        <Route path="/passengerlogin" element={<PassengerLogin />} />
        <Route
          path="/passengerforgotpassword"
          element={<PassengerForgotPassword />}
        />
        <Route path="/passengeroptinput" element={<PassengerOPTInput />} />
        <Route path="/passengerreset" element={<PassengerReset />} />
        <Route path="/passengerrecovered" element={<PassengerRecovered />} />

        <Route path="/passengerchange" element={<PassengerChange />} />
        <Route path="/passengerconfirmation" element={<PassengerConfirm />} />
        <Route path="/passengerdashboard" element={<PassengerDashboard />} />
      </Routes>
    </>
  );
}

export default App;
