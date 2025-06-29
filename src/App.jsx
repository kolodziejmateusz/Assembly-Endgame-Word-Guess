import Language from "./components/Language";
import "./app.css";
import languageArr from "./data/languages";
import {
  getFarewellText,
  getRandomEnglishWord,
  getRandomPolishWord,
} from "./data/utils";
import { useState } from "react";
import clsx from "clsx";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {
  function getRandomWord() {
    return selectedLanguage === "English"
      ? getRandomEnglishWord()
      : getRandomPolishWord();
  }

  // State values
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  console.log(currentWord);

  // Derived values
  const numGuessesLeft = languageArr.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet = selectedLanguage === "English" ? "abcdefghijklmnopqrstuvwxyz" : "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";
  const { width, height } = useWindowSize();

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  function changeLanguage(lang) {
    setSelectedLanguage(lang);
    setCurrentWord(
      lang === "English" ? getRandomEnglishWord() : getRandomPolishWord()
    );
    setGuessedLetters([]); // Resetowanie gry po zmianie języka
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
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
        key={index}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function rednerGameStatus() {
    if (!isGameOver && !isLastGuessIncorrect) {
      return (
        <div>
          <button
            className={selectedLanguage === "English" ? "active" : ""}
            onClick={() => changeLanguage("English")}
          >
            English
          </button>
          <button
            className={selectedLanguage === "Polish" ? "active" : ""}
            onClick={() => changeLanguage("Polish")}
          >
            Polski
          </button>
        </div>
      );
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
      {isGameWon && (
        <Confetti
          width={width - 20}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {rednerGameStatus()}
      </section>
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

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
