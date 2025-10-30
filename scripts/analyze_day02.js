const fs = require('fs');

function isIncreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

function isDecreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) return false;
    }
    return true;
}

// Read and parse the input file
const input = fs.readFileSync('./Day02/Day02input.txt', 'utf-8');
const lines = input.split(/\r?\n/).filter(line => line.trim().length > 0);
const data = lines.map(line => line.trim().split(/\s+/).map(Number));

// Analyze each line
let nonMonotonic = [];
data.forEach((numbers, index) => {
    if (!isIncreasing(numbers) && !isDecreasing(numbers)) {
        nonMonotonic.push({
            lineNumber: index + 1,
            values: numbers,
            reason: 'Neither increasing nor decreasing'
        });
    }
});

// Print results
console.log(`Found ${nonMonotonic.length} non-monotonic lines:`);
nonMonotonic.forEach(line => {
    console.log(`Line ${line.lineNumber}: ${line.values.join(' ')}`);
    
    // Show where monotonicity breaks
    let changes = [];
    for (let i = 1; i < line.values.length; i++) {
        if (line.values[i] < line.values[i-1]) {
            changes.push(`Decreases at index ${i} (${line.values[i-1]} -> ${line.values[i]})`);
        }
        if (line.values[i] > line.values[i-1]) {
            changes.push(`Increases at index ${i} (${line.values[i-1]} -> ${line.values[i]})`);
        }
    }
    console.log('  Changes:', changes.join(', '));
    console.log();
});