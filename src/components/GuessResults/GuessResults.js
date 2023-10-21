import React from "react";

import Guess from "../Guess/Guess";

function GuessResults({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((formattedGuess) => (
        <Guess key={formattedGuess.id} value={formattedGuess.value} />
      ))}
    </div>
  );
}

export default GuessResults;
