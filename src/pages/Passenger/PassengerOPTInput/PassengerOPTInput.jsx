import React, { createRef, useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import "./PassengerOPTInput.css";
import { RecoveryContext } from "../../../contexts/RecoveryContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";
// const baseUrl = "http://localhost:5000";

const PassengerOPTInput = () => {
  const navigate = useNavigate();
  const { otp, recipient_email } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post(`${baseUrl}/send_recovery_email`, {
        OTP: otp,
        recipient_email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(120))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/passengerreset");
      return;
    }

    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  const inputRefs = useRef([]);
  inputRefs.current = OTPinput.map(
    (_, i) => inputRefs.current[i] ?? createRef()
  );

  const handleInputChange = (e, index) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = e.target.value;
    setOTPinput(newOTPinput);

    if (e.target.value) {
      if (index < OTPinput.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <div className="OPTInput-container">
      <div className="OPTInput-wrapper">
        <div>
          <div className="Email-verification-text">
            <p>Email Verification</p>
          </div>
          <div className="Email-verification-text">
            <p>We have sent a code to your email: {recipient_email}</p>
          </div>
        </div>

        <div>
          <form>
            <div className="">
              <div className="OPTInput-inputs">
                {OTPinput.map((_, index) => (
                  <div key={index} className="">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength="1"
                      className="OPTInput-input"
                      type="text"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="PassengerOPTInput-bottom">
                <div>
                  <a
                    onClick={() => verifyOTP()}
                    className="PassengerOPTInput-verify-account-link"
                  >
                    Verify Account
                  </a>
                </div>

                <div>
                  <p>Didn't receive code?</p>
                  <a
                    className="PassengerOPTInput-ResendLink"
                    style={{
                      color: disable ? "gray" : "red",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={() => resendOTP()}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerOPTInput;
