const fs = require('fs');

const input = fs.readFileSync('./Day02/Day02input.txt', 'utf-8');
console.log('P2: ' + solve(parseData(input)));
function parseData(input) {
    const lines = input.split(/\r?\n/).filter(line => line.trim().length > 0);
    return lines.map(line => line.trim().split(/\s+/).map(Number));
}

function solve(data) {
    let safeReports = 0;
    for (let i = 0; i < data.length; i++) {
        let safe = true;
        let dampener = 0;
        for (let j = 1; j < data[i].length; j++) {
            if (dampener == 2) {
                safe = false;
                break;
            }
            if (!withinRange(data[i][j], data[i][j-1])) {
                if (!withinRange(data[i][j], data[i][j-2])) {
                    safe = false;
                    break;
                } else {
                    dampener++;
                }
            }
        }
        if (safe && dampener < 2) {
            safeReports++;
            console.log('Safe report from line ' + safeReports + ': ' + data[i]);
        }
    }
    return safeReports;
}

function isIncreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function isDecreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function withinRange(a, b) {
    const diff = Math.abs(a - b);
    return diff >= 1 && diff <= 3;
}