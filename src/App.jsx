import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Driver from "./pages/Driver/Driver";
import DriverRegister from "./pages/Driver/Register/DriverRegister";
import DriverLogin from "./pages/Driver/Login/DriverLogin";
import DriverChange from "./pages/Driver/Change/DriverChange";

import Passenger from "./pages/Passenger/Passenger";
import PassengerRegister from "./pages/Passenger/Register/PassengerRegister";
import PassengerLogin from "./pages/Passenger/Login/PassengerLogin";
import Change from "./pages/Change/Change";
import PassengerChange from "./pages/Passenger/PassengerChange/PassengerChange";
import DriverConfirmation from "./pages/Driver/Confirmation/DriverConfirmation";
import PassengerConfirm from "./pages/Passenger/PassengerConfirm/PassengerConfirm";
// import ChangeDriving from "./pages/ChangeDriving/ChangeDriving";

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
        <Route path="/driverconfirmation" element={<DriverConfirmation/> } />

        {/* PASSENGER */}
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/passengerregister" element={<PassengerRegister />} />
        <Route path="/passengerlogin" element={<PassengerLogin />} />
        <Route path="/passengerchange" element={<PassengerChange />} />
        <Route path="/passengerconfirmation" element={<PassengerConfirm/> } />
      </Routes>
    </>
  );
}

export default App;
