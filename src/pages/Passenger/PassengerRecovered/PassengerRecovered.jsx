import React from "react";
import "./PassengerRecovered.css";

const PassengerRecovered = () => {
  return (
    <div className="PassengerRecovered-Container">
      <section className="PassengerRecovered-FullHeight">
        <div className="PassengerRecovered-PaddingFullHeight PassengerRecovered-TextGray">
          <div className="PassengerRecovered-FlexCenter PassengerRecovered-FlexWrapFullHeight PassengerRecovered-Gap">
            <div className="PassengerRecovered-GrowShrink PassengerRecovered-WFull mb-12">
              <img
                src=""
                className="PassengerRecovered-ImgFullWidth"
                alt="Sample image"
              />
            </div>
            <div className="PassengerRecovered-MarginLeft PassengerRecovered-W50 mb-12">
              <form>
                <div className="PassengerRecovered-FlexStart">
                  <h1 className="PassengerRecovered-TextBold">
                    Password successfully set{" "}
                  </h1>
                </div>

                <div className="PassengerRecovered-Divider">
                  <h2>Welcome HOME </h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassengerRecovered;
