import React from "react";

import Cell from "../Cell";

function Guess({ value }) {
  return (
    <p className="guess">
      {value.map((formattedLetter) => (
        <Cell key={formattedLetter.id} letter={formattedLetter} />
      ))}
    </p>
  );
}

export default Guess;
