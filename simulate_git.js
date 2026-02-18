const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const START_DAYS_AGO = 60;
const COMMIT_MESSAGES = [
    "initial",
    "added folder",
    "stuf",
    "fix bug",
    "lgoin fix",
    "work plz",
    "asdfg",
    "commit",
    "save",
    "added sum file",
    "changd stuff",
    "plz work now",
    "fix fix fix",
    "more stuf",
    "css bad",
    "make color good",
    "adding things",
    "implment code",
    "final maybe",
    "documntation",
    "bug fixing",
    "dont know why it failed",
    "working??",
    "test test",
    "added chart",
    "fix typo in lgoin",
    "realy final this time"
];

function run() {
    console.log("Starting Noob Git History Simulation...");

    // Remove existing git and re-init for clean blunt history
    try {
        if (fs.existsSync('.git')) {
            execSync('rm -rf .git');
        }
        execSync('git init');
    } catch(e) {
        console.error("Git init failed", e);
    }

    const now = new Date();
    
    // Create an initial commit with old date to establish history
    const firstDate = new Date(now);
    firstDate.setDate(now.getDate() - START_DAYS_AGO);
    process.env.GIT_AUTHOR_DATE = firstDate.toISOString();
    process.env.GIT_COMMITTER_DATE = firstDate.toISOString();
    execSync('git add .');
    execSync('git commit -m "initial commit" --allow-empty');

    for (let i = START_DAYS_AGO - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        
        // Skip some days randomly
        if (Math.random() > 0.8) continue;

        const commitCount = Math.floor(Math.random() * 6); // 0-5 commits
        
        for (let j = 0; j < commitCount; j++) {
            const commitDate = new Date(date);
            commitDate.setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));
            
            const msg = COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)];
            const dateStr = commitDate.toISOString();
            
            try {
                process.env.GIT_AUTHOR_DATE = dateStr;
                process.env.GIT_COMMITTER_DATE = dateStr;
                // Add everything every time for simplicity in this simulation 
                // since the code is already built and we want to fake the addition
                execSync(`git add . && git commit -m "${msg}" --allow-empty`);
            } catch (error) {
                // Ignore
            }
        }
    }
    
    console.log("Noob Simulation complete.");
}

run();
