import React, { useCallback, useEffect, useMemo, useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInputForm from "../GuessInputForm/GuessInputForm";
import GuessResults from "../GuessResults";
import { checkGuess } from "../../game-helpers";
import {
  NUM_OF_GUESSES_ALLOWED,
  STATUS_CORRECT,
  STATUS_INCORRECT,
  STATUS_MISPLACED,
} from "../../constants";

import {
  GAME_STATE_LOST,
  GAME_STATE_PLAYING,
  GAME_STATE_WON,
} from "../../constants";
import SadBanner from "../SadBanner";
import HappyBanner from "../HappyBanner/HappyBanner";

const getInitialGuesses = () =>
  range(NUM_OF_GUESSES_ALLOWED).map(() => {
    return {
      id: crypto.randomUUID(),
      value: range(5).map(() => ({
        id: crypto.randomUUID(),
      })),
    };
  });

function Game() {
  const getRandomAnswer = useCallback(() => sample(WORDS), []);

  const [numGuesses, setNumGuesses] = useState(0);
  const [guesses, setGuesses] = useState(getInitialGuesses);
  const [gameState, setGameState] = useState("playing");
  const [letterStatuses, setLetterStatuses] = useState({});
  const [answer, setAnswer] = useState(getRandomAnswer());

  useEffect(() => {
    console.log({ answer });
  }, [answer]);

  const handleAddGuess = useCallback(
    (guess) => {
      if (gameState !== GAME_STATE_PLAYING) {
        return;
      }

      if (guess === answer) {
        setGameState(GAME_STATE_WON);
      } else if (numGuesses + 1 >= NUM_OF_GUESSES_ALLOWED) {
        setGameState(GAME_STATE_LOST);
      }

      const guessStatus = checkGuess(guess, answer).map(
        (status) => status.status
      );

      const guessSplit = guess.split("");

      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        newGuesses[numGuesses].value = guessSplit.map((letter, idx) => ({
          id: crypto.randomUUID(),
          value: letter,
          status: guessStatus[idx],
        }));

        return newGuesses;
      });

      setLetterStatuses((prevLetterStatuses) => {
        const newLetterStatuses = { ...prevLetterStatuses };
        guessSplit.forEach((letter, idx) => {
          const currStatus = guessStatus[idx];
          const prevStatus = prevLetterStatuses[letter];
          if (currStatus === STATUS_CORRECT || prevStatus === STATUS_CORRECT) {
            newLetterStatuses[letter] = STATUS_CORRECT;
          } else if (
            currStatus === STATUS_MISPLACED ||
            prevStatus === STATUS_MISPLACED
          ) {
            newLetterStatuses[letter] = STATUS_MISPLACED;
          } else if (
            prevStatus === STATUS_INCORRECT ||
            currStatus === STATUS_INCORRECT
          ) {
            newLetterStatuses[letter] = STATUS_INCORRECT;
          }
        });

        return newLetterStatuses;
      });

      setNumGuesses((prevNumGuesses) => prevNumGuesses + 1);
    },
    [answer, gameState, numGuesses]
  );

  const gameWon = useMemo(() => gameState === GAME_STATE_WON, [gameState]);

  const gameLost = useMemo(() => gameState === GAME_STATE_LOST, [gameState]);

  const gameOver = useMemo(() => gameWon || gameLost, [gameWon, gameLost]);

  const handleNewGame = useCallback(() => {
    setNumGuesses(0);
    setGuesses(getInitialGuesses());
    setGameState(GAME_STATE_PLAYING);
    setLetterStatuses({});
    setAnswer(getRandomAnswer());
  }, [getRandomAnswer]);

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInputForm
        letterStatuses={letterStatuses}
        onAddGuess={handleAddGuess}
        onNewGame={handleNewGame}
        disabled={gameOver}
      />
      {gameWon ? <HappyBanner numGuesses={numGuesses} /> : null}
      {gameLost ? <SadBanner answer={answer} /> : null}
    </>
  );
}

export default Game;
