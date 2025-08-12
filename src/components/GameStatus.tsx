import clsx from "clsx";
import { getFarewellText } from "../data/utils";
import languages from "../data/languages";
import type { JSX } from "react";

type GameStatusProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  isGameOver: boolean;
  isLastGuessIncorrect: boolean | "";
  wrongGuessCount: number;
  selectedLanguage: "English" | "Polish";
  changeLanguage: (lang: "English" | "Polish" ) => void;
};

export default function GameStatus({
  isGameWon,
  isGameLost,
  isGameOver,
  isLastGuessIncorrect,
  wrongGuessCount,
  selectedLanguage,
  changeLanguage,
}: GameStatusProps): JSX.Element {
  const gameStatusClass: string = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {!isGameOver && !isLastGuessIncorrect && (
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
      )}

      {!isGameOver && isLastGuessIncorrect && (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      )}

      {isGameWon && (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )}

      {isGameLost && (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )}

      {/* If none of the above conditions met, render nothing inside but keep the section */}
    </section>
  );
}
