import React, { useContext, useEffect, useState } from "react";

import "./PassengerReset.css";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../../contexts/RecoveryContext";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// const baseUrl = "http://localhost:5000";

const PassengerReset = () => {
  const { userId } = useContext(RecoveryContext);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/user/${userId}/reset_password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPasswordChanged(true);
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  }

  return (
    <div className="PassengerReset-Container">
      {passwordChanged ? (
        <div>
          <p>Password successfully changed,</p>

          <button
            className="PassengerReset-RedirectBtn"
            onClick={() => navigate("/passengerlogin")}
          >
            click here to redirect to login
          </button>
        </div>
      ) : (
        <div>
          <div className="PassengerReset-Wrapper">
            <h2 className="">Change Password</h2>
            <form>
              <div className="PassengerReset-inputs">
                <label htmlFor="password" className="">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="PassengerReset-input"
                  required=""
                ></input>
              </div>
              <div className="PassengerReset-inputs">
                <label htmlFor="confirm-password" className="">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="PassengerReset-input"
                  required=""
                ></input>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="ResetPassword-Btn"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerReset;
