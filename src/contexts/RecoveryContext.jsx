import { createContext, useState } from "react";

export const RecoveryContext = createContext();
const baseUrl = "https://kommahem-fd9ac0fc3b1a.herokuapp.com";

const RecoveryContextProvider = ({ children }) => {
  const [recipient_email, setRecipient_email] = useState("");
  const [otp, setOTP] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const forgotPassword = async (recipient_email) => {
    try {
      const userResponse = await fetch(`${baseUrl}/users/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: recipient_email }),
      });

      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }

      const { userExists, userId } = await userResponse.json();

      if (!userExists) {
        throw new Error("User does not exist");
      }

      setUserId(userId);

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);

      const response = await fetch(`${baseUrl}/send_recovery_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_email,
          OTP,
        }),
      });

      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(error.message);
      throw error; // re-throw the error
    }
  };

  const value = {
    otp,
    setOTP,
    recipient_email,
    setRecipient_email,
    forgotPassword,
    userId,
    setUserId,
    error,
  };

  return (
    <RecoveryContext.Provider value={value}>
      {children}
    </RecoveryContext.Provider>
  );
};

export default RecoveryContextProvider;
