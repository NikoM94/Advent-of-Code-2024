const fs = require('node:fs');

function parseData(file) {
    const text = String(fs.readFileSync(file));
    // split into non-empty lines and handle CRLF
    const pairs = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    let leftNumbers = [];
    let rightNumbers = [];
    pairs.forEach(pair => {
        // split on any whitespace (spaces/tabs) and convert to numbers
        const parts = pair.trim().split(/\s+/);
        if (parts.length >= 2) {
            leftNumbers.push(Number(parts[0]));
            rightNumbers.push(Number(parts[1]));
        }
    });
    // numeric sort
    return [leftNumbers.sort((a, b) => a - b), rightNumbers.sort((a, b) => a - b)];
}

function partOne(data) {
    let combinedDistances = 0;
    for (let i = 0; i<data[0].length; i++) {
        let leftNum = data[0][i];
        let rightNum = data[1][i];
        combinedDistances += rightNum >= leftNum ? (rightNum - leftNum) : (leftNum - rightNum);
    }
    return combinedDistances;
}

function partTwo(data) {
    let similarityScore = 0;
    for (let i = 0; i < data[0].length; i++) {
        similarityScore += (data[0][i] * getOccurrences(data[0][i], data[1]));
    }
    return similarityScore;
}

function getOccurrences(num, arr) {
    let occurrences = 0;
    arr.forEach(n => {
        if (n === num) occurrences++;
    });
    return occurrences;
}


console.log('P1: ' + partOne(parseData('./Day01/Day01input.txt')));
console.log('P2: ' + partTwo(parseData('./Day01/Day01input.txt')));