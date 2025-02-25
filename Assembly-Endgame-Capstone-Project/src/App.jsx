import Language from "./components/Language";
import "./app.css";
import languageArr from "./data/languages";
import { useState } from "react";

export default function App() {
  /**
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Update the keyboard when a letter is right
   * or wrong.
   *
   * Bonus: use the `clsx` package to easily add conditional
   * classNames to the keys of the keyboard. Check the docs
   * to learn how to use it 📖
   */
  const [currentWord, setCurrentWord] = useState("malina");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  const keyboardElements = alphabet.split("").map((letter, index) => {
    let buttonColorClass = "";
    if (guessedLetters.includes(letter))
      if (currentWord.split("").includes(letter)) buttonColorClass = "correct";
      else buttonColorClass = "wrong";
    return (
      <button
        className={buttonColorClass}
        onClick={() => addGuessedLetter(letter)}
        key={index}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord
    .split("")
    .map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

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
