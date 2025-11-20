import { readFileSync } from "fs";

const raw = readFileSync("./day05test.txt", "utf-8");
const input = parseInput(raw);
console.log("P1: " + p1(input) + "\nP2: " + p1(input));

function parseInput(input) {
  const lines = input.split(/\r?\n/);
  const emptyLineIndex = lines.findIndex((line) => line.trim() === "");
  const upper = lines
    .slice(0, emptyLineIndex)
    .filter((line) => line.trim() !== "");
  const lower = lines
    .slice(emptyLineIndex + 1)
    .filter((line) => line.trim() !== "");
  const mappedToNumbers = lower.map((line) => line.split(","));
  return [upper, mappedToNumbers];
}

function p1(input) {
  const pages = input[1];
  const rules = input[0];
  console.log(`Pages: ${pages}\nRules: ${rules}`);
  let correct = [];
  let incorrect = [];
  let order = true;
  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      const leftNum = rules[j].split("|")[0];
      const rightNum = rules[j].split("|")[1];
      if (pages[i].includes(leftNum) && pages[i].includes(rightNum)) {
        if (pages[i].indexOf(leftNum) > pages[i].indexOf(rightNum)) {
          order = false;
          incorrect.push(pages[i]);
          break;
        }
      }
    }
    if (order) {
      correct.push(pages[i]);
    }
    order = true;
  }
  // Sort incorrect pages to satisfy all rules
  for (let i = 0; i < incorrect.length; i++) {
    let changed;
    for (let j = 0; j < rules.length; j++) {
      const leftNum = rules[j].split("|")[0];
      const rightNum = rules[j].split("|")[1];
      changed = false;
      if (incorrect[i].includes(leftNum) && incorrect[i].includes(rightNum)) {
        const leftIndex = incorrect[i].indexOf(leftNum);
        const rightIndex = incorrect[i].indexOf(rightNum);
        if (incorrect[i].indexOf(leftNum) > incorrect[i].indexOf(rightNum)) {
          [incorrect[i][leftIndex], incorrect[i][rightIndex]] = [
            incorrect[i][rightIndex],
            incorrect[i][leftIndex],
          ];
          changed = true;
        }
      }
      if (changed) {
        j = -1; // Restart checking from the first rule
      }
    }
    console.log(`Correct: ${correct}\nIncorrect: ${incorrect}`);
    return [correct, incorrect];
    //return [sumNumbers(correct), sumNumbers(correct)];
  }
}

function sumNumbers(arr) {
  const toSlice = [];
  for (let arr of numbers) {
    toSlice.push(arr.slice(0, Math.ceil(arr.length / 2)));
  }
  const lastElements = toSlice.map((toSlice) => toSlice.at(-1));
  return lastElements.reduce(function (a, b) {
    return a + b;
  }, 0);
}
