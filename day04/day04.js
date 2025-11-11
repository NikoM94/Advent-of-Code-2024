import { readFileSync } from 'fs';

const raw = readFileSync('./day04test.txt', 'utf-8');
const input = parseInput(raw);
console.log('P1: ' + p1(input, true));
//console.log('P2: ' + p2(input));

function parseInput(input, test) {
  let searchString = "";
  input.split('\r\n').forEach(line => {
    searchString += line;
  });
}

function p1(input, test) {
  let xmasCount = 0;
  let correctWord = "XMAS";
  let offsets = test ? [-11, -10, -9, -1, 1, 9, 10, 11] : [-141, -140, -139, -1, 1, 139, 140, 141];
  for (let i = 0; i < input.length; i++) {
    let checkString = "";
    if (checkString != "" && input[i] != "X") {
      continue;
    } else {
      checkString += input[i];
    }
    for (let j = 0; j < offsets.length; j++) {
      for (let k = 0; k < correctWord.length; k++) {
        if ((i + offsets[j]) < 0 || (i + offsets[j]) >= input.length) {
          break;
        } else {
          checkString += input[i + offsets[j]];
        }
      }
    }
  }
  return xmasCount;
}
