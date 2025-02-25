import Language from "./components/Language";
import "./app.css";
import languageArr from "./data/languages";
import { useState } from "react";

export default function App() {
  const [currentWord, setCurrentWord] = useState("teacher");

  const letterElements = currentWord
    .split("")
    .map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

  return (
    /**
     * Goal: Build out the main parts of our app
     *
     * Challenge:
     * 1. Save a "currentWord" in state. Initialize as "react".
     * 2. Map over the letters of the word (you'll need to turn
     *    the string into an array of letters first) and display
     *    each one as a <span>. Capitalize the letters when
     *    displaying them.
     * 3. Style to look like the design. You can get the underline
     *    effect on the box using `border-bottom`.
     */
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
    </main>
  );
}
