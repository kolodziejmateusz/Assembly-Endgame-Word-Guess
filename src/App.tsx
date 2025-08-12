import "./app.css";
import languages from "./data/languages";
import { getRandomEnglishWord, getRandomPolishWord } from "./data/utils";
import { useState } from "react";
import clsx from "clsx";
import Header from "./components/Header";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";
import AriaLiveStatus from "./components/AriaLiveStatus";
import LanguageChips from "./components/LanguageChips";
import WordLetters from "./components/WordLetters";
import NewGameButton from "./components/NewGameButton";
import Keyboard from "./components/Keyboard";

export default function App() {
  function getRandomWord() {
    return selectedLanguage === "English"
      ? getRandomEnglishWord()
      : getRandomPolishWord();
  }

  // State values
  const [selectedLanguage, setSelectedLanguage] = useState<
    "English" | "Polish"
  >("English");
  const [currentWord, setCurrentWord] = useState<string>((): string =>
    getRandomWord()
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  console.log(currentWord);

  // Derived values
  const numGuessesLeft: number = languages.length - 1;
  const wrongGuessCount: number = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon: boolean = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost: boolean = wrongGuessCount >= numGuessesLeft;
  const isGameOver: boolean = isGameWon || isGameLost;
  const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect: boolean | "" =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet =
    selectedLanguage === "English"
      ? "abcdefghijklmnopqrstuvwxyz"
      : "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";

  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prev: string[]): string[] =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  function startNewGame(): void {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  function changeLanguage(lang: "English" | "Polish"): void {
    setSelectedLanguage(lang);
    setCurrentWord(
      lang === "English" ? getRandomEnglishWord() : getRandomPolishWord()
    );
    setGuessedLetters([]); // Resetowanie gry po zmianie języka
  }

  return (
    <main>
      <ConfettiContainer isGameWon={isGameWon} />

      <Header />
      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
      />

      <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />

      <WordLetters
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        numGuessesLeft={numGuessesLeft}
        guessedLetters={guessedLetters}
      />
      <Keyboard
        alphabet={alphabet}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        isGameOver={isGameOver}
        addGuessedLetter={addGuessedLetter}
      />
      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}
