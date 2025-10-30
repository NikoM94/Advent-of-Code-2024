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

// Read Day02.js output and extract "Safe report" lines
const fileContent = fs.readFileSync('./scripts/day02_output.txt', 'utf-8');
const data = fileContent
    .split('\n')
    .filter(line => line.startsWith('Safe report from line'))
    .map(line => {
        const colonIndex = line.indexOf(':');
        return line.slice(colonIndex + 1).trim().split(',').map(Number);
    });

// Analyze each line
let nonMonotonic = [];
data.forEach((numbers, index) => {
    if (!isIncreasing(numbers) && !isDecreasing(numbers)) {
        let changes = [];
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] < numbers[i-1]) {
                changes.push(`Decreases at index ${i} (${numbers[i-1]} -> ${numbers[i]})`);
            }
            if (numbers[i] > numbers[i-1]) {
                changes.push(`Increases at index ${i} (${numbers[i-1]} -> ${numbers[i]})`);
            }
        }
        nonMonotonic.push({
            lineNumber: index + 1,
            values: numbers,
            changes: changes
        });
    }
});

// Create formatted output
let output = `Analysis of Non-Monotonic Safe Reports from Day02.js
================================================
Total safe reports analyzed: ${data.length}
Non-monotonic reports found: ${nonMonotonic.length}

Detailed Analysis of Non-Monotonic Safe Reports:
-----------------\n\n`;

nonMonotonic.forEach(item => {
    output += `Safe Report #${item.lineNumber}: ${item.values.join(' ')}\n`;
    output += 'Changes:\n';
    item.changes.forEach(change => {
    output += `  - ${change}\n`;
    });
    output += '\n';
});

// Add summary statistics
let patterns = {
    singlePeak: 0,
    singleValley: 0,
    multipleChanges: 0
};

nonMonotonic.forEach(item => {
    if (item.changes.length === 2) {
        if (item.changes[0].startsWith('Increases')) {
            patterns.singlePeak++;
        } else {
            patterns.singleValley++;
        }
    } else {
        patterns.multipleChanges++;
    }
});

output += `\nPattern Statistics:
------------------
Single peaks (up then down): ${patterns.singlePeak}
Single valleys (down then up): ${patterns.singleValley}
Multiple direction changes: ${patterns.multipleChanges}

Summary:
--------
${((nonMonotonic.length / data.length) * 100).toFixed(1)}% of safe reports are non-monotonic
${((patterns.multipleChanges / nonMonotonic.length) * 100).toFixed(1)}% of non-monotonic reports have multiple direction changes\n`;

// Write to file
fs.writeFileSync('./scripts/day02_analysis.txt', output);

// Log confirmation
console.log(`Analysis saved to './scripts/day02_analysis.txt'
Found ${nonMonotonic.length} non-monotonic sequences:
- ${patterns.singlePeak} single peaks
- ${patterns.singleValley} single valleys
- ${patterns.multipleChanges} multiple direction changes`);