const fs = require('fs');

const input = fs.readFileSync('C:/Users/nm/Programming/AoC2024/Day03/day03input.txt', 'utf-8');
console.log('P1: ' + p1(input));
console.log('P2: ' + p2(input));

function p1(input) {
  const instructions = [];
  const pattern = /mul\(\d+?,\d+?\)/gm; input.split("\n").forEach(part => {
    const found = part.match(pattern);
    if (found) instructions.push(...found);
  });
  let sum = 0;
  instructions.forEach(instruction => {
    let pair = instruction.slice(4, instruction.length - 1).split(",");
    let multiplied = parseInt(pair[0]) * parseInt(pair[1]);
    sum += multiplied;
  });
  return sum;
}

function p2(input) {
  const instructions = [];
  const pattern = /mul\(\d+?,\d+?\)|do\(\)|don't\(\)/gm;
  input.split("\n").forEach(part => {
    const found = part.match(pattern);
    if (found) instructions.push(...found);
  });
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
      let pair = instruction.slice(4, instruction.length - 1).split(",");
      let multiplied = parseInt(pair[0]) * parseInt(pair[1]);
      sum += multiplied;
    }
  });
  return sum;
}
