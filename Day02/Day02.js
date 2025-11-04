const fs = require('fs');

const input = parseData(fs.readFileSync('C:/Users/nm/Programming/AoC2024/Day02/day02input.txt', 'utf-8'));
console.log('P1: ' + input.filter(isSafe).length);
console.log('P2: ' + input.filter(isSafeDampened).length);

function parseData(input) {
    const lines = input.split(/\r?\n/)
        .filter(line => line.trim().length > 0);
    return lines.map(line => line.trim()
        .split(/\s+/)
        .map(Number));
}

function isSafe(report) {
    let hasPositive = false, hasNegative = false;
    for (let i = 1; i < report.length; i++) {
        let diff = report[i] - report[i - 1];
        if (diff < 0) {
            hasNegative = true;
            if (hasPositive || diff < -3) {
                return false;
            }
        } else if (diff > 0) {
            hasPositive = true;
            if (hasNegative || diff > 3) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

function isSafeDampened(report) {
    if (isSafe(report)) {
        return true;
    }
    for (let i = 0; i < report.length; i++) {
        if (isSafe(report.toSpliced(i, 1))) {
            return true;
        }
    }
    return false;
}
