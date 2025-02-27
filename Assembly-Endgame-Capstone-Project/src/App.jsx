import Language from "./components/Language";
import "./app.css";
import languageArr from "./data/languages";
import { getFarewellText } from "./data/utils";
import { useState } from "react";
import clsx from "clsx";

export default function App() {
  /**
   * Challenge: Bid farewell to each programming language
   * as it gets erased from existance 👋😭
   *
   * Use the `getFarewellText` function from the new utils.js
   * file to generate the text.
   *
   * Check hint.md if you're feeling stuck, but do your best
   * to solve the challenge without the hint! 🕵️
   */

  // State values
  const [currentWord, setCurrentWord] = useState("malina");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  // console.log(wrongGuessCount);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languageArr.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  console.log(isLastGuessIncorrect);

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  const keyboardElements = alphabet.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        onClick={() => addGuessedLetter(letter)}
        key={index}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    ));

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function rednerGameStatus() {
    if (!isGameOver && !isLastGuessIncorrect) {
      return null;
    }

    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <>
          <p>{getFarewellText(languageArr[wrongGuessCount - 1].name)}</p>
        </>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{rednerGameStatus()}</section>
      <section className="language-chips">
        {languageArr.map((language, index) => (
          <Language
            key={index}
            name={language.name}
            backgroundColor={language.backgroundColor}
            color={language.color}
            className={clsx(index < wrongGuessCount && "lost")}
          />
        ))}
      </section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
