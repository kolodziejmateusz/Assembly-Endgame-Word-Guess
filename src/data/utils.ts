import { englishWords } from "./englishWords";
import { polishWords } from "./polishWords";

function getRandomIndex(arr: string[]): number {
  const randomIndex: number = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

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

  return options[getRandomIndex(options)];
}

export function getRandomEnglishWord(): string {
  return englishWords[getRandomIndex(englishWords)];
}
export function getRandomPolishWord(): string {
  return polishWords[getRandomIndex(polishWords)];
}
