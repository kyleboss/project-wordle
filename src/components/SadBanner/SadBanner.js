import React from "react";
import Banner from "../Banner";
import { GAME_STATE_LOST } from "../../constants";

function SadBanner({ answer, onNewGame }) {
  return (
    <Banner onNewGame={onNewGame} status={GAME_STATE_LOST}>
      <h2>You lost!</h2>
      <p>
        The answer was <strong>{answer}</strong>
      </p>
    </Banner>
  );
}

export default SadBanner;
