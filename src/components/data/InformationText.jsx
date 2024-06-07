import React from "react";
import "./InformationText.css";

const InformationText = () => {
  return (
    <div className="InformationText-container">
      <h2>Så här fungerar Kommahem:</h2>
      <p>
        För resenärer, med eller utan bil, som i samband med färjorna som
        anländer till Visby hamn vill kunna samåka hela eller delar av vägen.
        Slutdestinationen kan endast anges med sockennamn eller tätortsnamn
      </p>
      <h2>Passagerare med bil:</h2>
      <p>
        Lägger upp en körning och anger: datum, slutdestination, båttur och
        antal platser
      </p>
      <h2>Passagerare utan bil:</h2>
      <p>
        Har möjlighet att söka på datum, slutdestination, båttur och antal
        platser
      </p>
      <h2>Samåkning:</h2>
      <p>
        Förare och passagerare sköter själva kontakten via t.ex. mejl eller
        telefon
      </p>
    </div>
  );
};

export default InformationText;
