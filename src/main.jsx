import React from "react";
import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import DriverContextProvider from "./contexts/DriverContext.jsx";
import PassengerContextProvider from "./contexts/PassengerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <DriverContextProvider>
        <PassengerContextProvider>
        <App />
        </PassengerContextProvider>
      </DriverContextProvider>
    </BrowserRouter>
  </>
);
