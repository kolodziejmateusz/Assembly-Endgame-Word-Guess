import { englishWords } from "./englishWords";
import { polishWords } from "./polishWords";

export function getFarewellText(language: string): string {
  const options: string[] = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `We'll miss you, ${language}`,
    `Oh no, not ${language}!`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
  ];

  const randomIndex: number = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export function getRandomEnglishWord(): string {
  const randomIndex: number = Math.floor(Math.random() * englishWords.length);
  return englishWords[randomIndex];
}
export function getRandomPolishWord(): string {
  const randomIndex: number = Math.floor(Math.random() * polishWords.length);
  return polishWords[randomIndex];
}
