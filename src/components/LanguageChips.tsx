import { clsx } from "clsx";
import type { Languages } from "../data/languages";

import type { JSX } from "react";
type LanguageChipsProps = {
  languages: Languages[];
  wrongGuessCount: number;
};

export default function LanguageChips({
  languages,
  wrongGuessCount,
}: LanguageChipsProps): JSX.Element {
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const className = clsx("chip", isLanguageLost && "lost");
    return (
      <span className={className} style={styles} key={lang.name}>
        {lang.name}
      </span>
    );
  });

  return <section className="language-chips">{languageElements}</section>;
}
