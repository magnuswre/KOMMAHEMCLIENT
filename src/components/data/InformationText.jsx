import React from "react";
import "./InformationText.css";

const InformationText = () => {
  return (
    <div className="InformationText-container">
      <h2>Så här fungerar Kommahem:</h2>
      <p>
        För resernärer, med eller utan bil, som i samband med färjorna som
        anländer till Visby hamn vill kunna samåka hela eller delar av vägen.
        Slutdestination kan endast anges med sockennamn eller tätortsnamn.
      </p>
      <h2>Passagerare som har bil:</h2>
      <p>
        Lägger upp en körning och anger: datum, slutdestination, rutt och antal
        platser.
      </p>
      <h2>Passagerare utan bil:</h2>
      <p>
        Har möjlighet att söka på datum, slutdestination, rutt och antal
        platser.
      </p>
      <h2>Samåkning:</h2>
      <p>
        Den bilburna och med passageraren/na sköter all kontakt internt, via
        mejl eller telefon
      </p>
    </div>
  );
};

export default InformationText;
