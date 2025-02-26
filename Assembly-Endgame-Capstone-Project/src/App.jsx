import Language from "./components/Language";
import "./app.css";
import languageArr from "./data/languages";
import { useState } from "react";
import clsx from "clsx";

export default function App() {
  /**
   * Goal: Add in the incorrect guesses mechanism to the game
   *
   * Challenge: Derive a variable (`wrongGuessCount`) for the
   * number of incorrect guesses by using the other state
   * values we're already holding in the component.
   *
   * console.log the wrongGuessCount for now
   */

  // State values
  const [currentWord, setCurrentWord] = useState("malina");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  console.log(wrongGuessCount);

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

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </section>
      <section className="language-chips">
        {languageArr.map((language, index) => (
          <Language
            key={index}
            name={language.name}
            backgroundColor={language.backgroundColor}
            color={language.color}
          />
        ))}
      </section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
