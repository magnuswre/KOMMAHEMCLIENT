import React from "react";
import "./DriverRecovered.css";

const DriverRecovered = () => {
  return (
    <div className="DriverRecovered-Container">
      <section className="DriverRecovered-FullHeight">
        <div className="DriverRecovered-PaddingFullHeight DriverRecovered-TextGray">
          <div className="DriverRecovered-FlexCenter DriverRecovered-FlexWrapFullHeight DriverRecovered-Gap">
            <div className="DriverRecovered-GrowShrink DriverRecovered-WFull mb-12">
              <img
                src=""
                className="DriverRecovered-ImgFullWidth"
                alt="Sample image"
              />
            </div>
            <div className="DriverRecovered-MarginLeft DriverRecovered-W50 mb-12">
              <form>
                <div className="DriverRecovered-FlexStart">
                  <h1 className="DriverRecovered-TextBold">
                    Password successfully set{" "}
                  </h1>
                </div>

                <div className="DriverRecovered-Divider">
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

export default DriverRecovered;
