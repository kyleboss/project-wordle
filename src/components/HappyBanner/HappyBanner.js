import React from "react";
import { GAME_STATE_WON } from "../../constants";
import Banner from "../Banner";

function HappyBanner({ numGuesses }) {
  return (
    <Banner status={GAME_STATE_WON}>
      <h2>You won!</h2>
      <p>
        You got it in{" "}
        <strong>
          {numGuesses === 1 ? "1 guess" : `${numGuesses} guesses`}
        </strong>
      </p>
    </Banner>
  );
}

export default HappyBanner;
