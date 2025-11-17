import { readFileSync } from "fs";

const raw = readFileSync("./day04input.txt", "utf-8");
const input = parseInput(raw);
console.log("P2: " + p2(input));

function parseInput(input) {
  let searchString = "";
  input.split("\n").forEach((line) => {
    searchString += line.trim();
  });
  return searchString;
}

function p2(input) {
  const N = Math.sqrt(input.length);
  let xmasCount = 0;
  //only 4 possible correct combinations
  const correctWords = ["MMSS", "SSMM", "MSMS", "SMSM"];
  //check in order top-left, top-right, bottom-left, bottom-right
  const offsets = [-N - 1, -N + 1, N - 1, N + 1];
  const lastLineExclusion = input.length - N - 1;
  for (let i = N; i < input.length; i++) {
    if (input[i] !== "A") {
      continue;
    }
    let checkString = "";
    for (let j = 0; j < offsets.length; j++) {
      if (onRightEdge(N, i) || onLeftEdge(N, i) || i > lastLineExclusion) {
        continue;
      } else {
        checkString += input[i + offsets[j]];
      }
    }
    if (correctWords.includes(checkString)) {
      xmasCount++;
    }
  }
  return xmasCount;
}

function onRightEdge(length, index) {
  return (index + 1) % length === 0;
}

function onLeftEdge(length, index) {
  return index % length === 0;
}
