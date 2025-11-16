import { readFileSync } from "fs";

const raw = readFileSync("./day04input.txt", "utf-8");
const input = parseInput(raw);
console.log("P1: " + p1(input, false));
console.log("P2: " + p2(input));

function parseInput(input) {
  let searchString = "";
  input.split("\r\n").forEach((line) => {
    searchString += line;
  });
  return searchString;
}
function p2(input, test) {
  let xmasCount = 0;
  let correctWord = "XMAS";
  let offsets = test
    ? [-12, -11, -10, -1, 1, 10, 11, 12]
    : [-142, -141, -140, -1, 1, 140, 141, 142];
  for (let i = 0; i < input.length; i++) {
    let checkString = "";
    if (input[i] != "X") {
      continue;
    } else {
      checkString += input[i];
    }
    for (let j = 0; j < offsets.length; j++) {
      let increment = offsets[j];
      for (let k = 0; k < correctWord.length - 1; k++) {
        if (i + increment < 0 || i + increment > input.length) {
          break;
        } else {
          checkString += input[i + increment];
        }
        increment += offsets[j];
      }
      if (checkString === correctWord) {
        xmasCount++;
      }
      checkString = "X";
    }
  }
  return xmasCount;
}

function p1(input, test) {
  let xmasCount = 0;
  let correctWord = "XMAS";
  let offsets = test
    ? [-12, -11, -10, -1, 1, 10, 11, 12]
    : [-142, -141, -140, -1, 1, 140, 141, 142];
  for (let i = 0; i < input.length; i++) {
    let checkString = "";
    if (input[i] != "X") {
      continue;
    } else {
      checkString += input[i];
    }
    for (let j = 0; j < offsets.length; j++) {
      let increment = offsets[j];
      for (let k = 0; k < correctWord.length - 1; k++) {
        if (i + increment < 0 || i + increment > input.length) {
          break;
        } else {
          checkString += input[i + increment];
        }
        increment += offsets[j];
      }
      if (checkString === correctWord) {
        xmasCount++;
      }
      checkString = "X";
    }
  }
  return xmasCount;
}
