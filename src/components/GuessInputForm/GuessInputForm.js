import React, { useCallback, useMemo, useState } from "react";

import Keyboard from "../Keyboard";

function GuessInputForm({ disabled, letterStatuses, onAddGuess }) {
  const [currentGuess, setCurrentGuess] = useState("");

  const handleChange = useCallback((event) => {
    const nextCurrentGuess = event.target.value.toUpperCase();
    setCurrentGuess(nextCurrentGuess);
  }, []);

  const keyboardDisabled = useMemo(
    () => disabled || currentGuess.length >= 5,
    [currentGuess, disabled]
  );

  const handleAdd = useCallback(
    (event) => {
      if (keyboardDisabled) {
        return;
      }

      const nextCurrentGuess = currentGuess + event.target.value;
      setCurrentGuess(nextCurrentGuess);
    },
    [currentGuess, keyboardDisabled]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onAddGuess(currentGuess);
      setCurrentGuess("");
    },
    [currentGuess, onAddGuess]
  );

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <Keyboard
        disabled={keyboardDisabled}
        onAdd={handleAdd}
        letterStatuses={letterStatuses}
      />
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={currentGuess}
        minLength={5}
        maxLength={5}
        pattern="[A-Za-z]{5}"
        required
        onChange={handleChange}
        title="5 letter word"
        disabled={disabled}
      />
      <button disabled={disabled} type="submit">
        Guess
      </button>
    </form>
  );
}

export default GuessInputForm;
