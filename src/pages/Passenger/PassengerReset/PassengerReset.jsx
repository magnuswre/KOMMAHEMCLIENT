import React, { useContext, useEffect, useState } from "react";

import "./PassengerReset.css";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../../contexts/RecoveryContext";
const baseUrl = "http://localhost:5000";

const PassengerReset = () => {
  const { userId } = useContext(RecoveryContext);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

      // const data = await response.json();
      // alert(data.message);
      navigate("/passengerrecovered");
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  }

  return (
    <div className="PassengerReset-Container">
      <section className="PassengerReset-Background PassengerReset-FullWidth PassengerReset-DarkBackground">
        <div className="PassengerReset-FlexCenter PassengerReset-Padding PassengerReset-MarginAuto PassengerReset-HeightScreen PassengerReset-LargePadding">
          <div className="PassengerReset-FormContainer PassengerReset-PaddingMedium PassengerReset-BackgroundWhite PassengerReset-Rounded PassengerReset-Shadow PassengerReset-DarkBorder PassengerReset-MarginTopMedium PassengerReset-MaxWidthMedium PassengerReset-DarkBackgroundDark PassengerReset-DarkBorderGray PassengerReset-FormPadding">
            <h2 className="PassengerReset-Heading PassengerReset-MarginBottom PassengerReset-TextLarge PassengerReset-FontBold PassengerReset-TextGray PassengerReset-TextLargeDark">
              Change Password
            </h2>
            <form className="PassengerReset-Form PassengerReset-MarginTop PassengerReset-SpaceY PassengerReset-LargeMarginTop PassengerReset-MediumSpaceY">
              <div>
                <label
                  htmlFor="password"
                  className="PassengerReset-Label PassengerReset-MarginBottomSmall PassengerReset-TextSmall PassengerReset-FontMedium PassengerReset-TextGray PassengerReset-TextSmallDark"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="PassengerReset-Input PassengerReset-BackgroundGray PassengerReset-Border PassengerReset-TextGray PassengerReset-SmallText PassengerReset-Rounded PassengerReset-FocusRing PassengerReset-FocusBorder PassengerReset-FullWidth PassengerReset-PaddingSmall PassengerReset-DarkBackgroundGray PassengerReset-DarkBorderGray PassengerReset-DarkPlaceholderGray PassengerReset-DarkTextWhite PassengerReset-DarkFocusRing PassengerReset-DarkFocusBorder"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="PassengerReset-Label PassengerReset-MarginBottomSmall PassengerReset-TextSmall PassengerReset-FontMedium PassengerReset-TextGray PassengerReset-TextSmallDark"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="PassengerReset-Input PassengerReset-BackgroundGray PassengerReset-Border PassengerReset-TextGray PassengerReset-SmallText PassengerReset-Rounded PassengerReset-FocusRing PassengerReset-FocusBorder PassengerReset-FullWidth PassengerReset-PaddingSmall PassengerReset-DarkBackgroundGray PassengerReset-DarkBorderGray PassengerReset-DarkPlaceholderGray PassengerReset-DarkTextWhite PassengerReset-DarkFocusRing PassengerReset-DarkFocusBorder"
                  required=""
                ></input>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="PassengerReset-Button PassengerReset-TextWhite PassengerReset-BackgroundPrimary PassengerReset-HoverBackgroundPrimary PassengerReset-FocusRing PassengerReset-FocusOutline PassengerReset-FocusRingPrimary PassengerReset-FontMedium PassengerReset-Rounded PassengerReset-SmallText PassengerReset-PaddingXSmall PassengerReset-PaddingYSmall PassengerReset-TextCenter PassengerReset-DarkBackgroundPrimary PassengerReset-DarkHoverBackgroundPrimary PassengerReset-DarkFocusRingPrimary"
            >
              Reset Password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassengerReset;
