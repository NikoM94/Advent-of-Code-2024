import { readFileSync } from "fs";

const raw = readFileSync("./day05input.txt", "utf-8");
const input = parseInput(raw);
console.log("P1: " + p1(input));

function parseInput(input) {
  const lines = input.split(/\r?\n/);
  const emptyLineIndex = lines.findIndex((line) => line.trim() === "");
  const upper = lines
    .slice(0, emptyLineIndex)
    .filter((line) => line.trim() !== "");
  const lower = lines
    .slice(emptyLineIndex + 1)
    .filter((line) => line.trim() !== "");
  return [upper, lower];
}

function sumNumbers(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function p1(input) {
  const pages = input[1];
  const rules = input[0];
  let correct = [];
  let order = true;
  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      const leftNum = rules[j].split("|")[0];
      const rightNum = rules[j].split("|")[1];
      if (pages[i].includes(leftNum) && pages[i].includes(rightNum)) {
        if (pages[i].indexOf(leftNum) > pages[i].indexOf(rightNum)) {
          order = false;
        }
      }
    }
    if (order) {
      correct.push(pages[i]);
    }
  }
  const numbers = correct.map((str) => str.split(",").map(Number));
  const sliced = [];
  for (let arr of numbers) {
    sliced.push(arr.slice(0, Math.ceil(arr.length / 2)));
  }
  const lastElements = sliced.map((arr) => arr.at(-1));
  return sumNumbers(lastElements);
}
