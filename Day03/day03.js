import { readFileSync } from 'fs';

const input = readFileSync('day03input.txt', 'utf-8');
console.log('P1: ' + p1(input));
console.log('P2: ' + p2(input));

function p1(input) {
  const instructions = cleanInput(input, false);
  let sum = 0;
  instructions.forEach(instruction => {
    sum += multiplyPair(instruction);
  });
  return sum;
}

function p2(input) {
  const instructions = cleanInput(input, true);
  let sum = 0;
  let execute = true;
  instructions.forEach(instruction => {
    if (instruction === "do()") {
      execute = true;
      return;
    } else if (instruction === "don't()") {
      execute = false;
      return;
    }
    if (execute) {
      sum += multiplyPair(instruction);
    }
  });
  return sum;
}

function multiplyPair(instruction) {
  let pair = instruction.slice(4, instruction.length - 1).split(",");
  return parseInt(pair[0]) * parseInt(pair[1]);
}

function cleanInput(input, p2) {
  const instructions = [];
  const pattern = p2 ? /mul\(\d+?,\d+?\)|do\(\)|don't\(\)/gm : /mul\(\d+?,\d+?\)/gm;
  input.split("\n").forEach(part => {
    const found = part.match(pattern);
    if (found) instructions.push(...found);
  });
  return instructions;
}
