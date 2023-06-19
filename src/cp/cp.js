import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = path.join(__dirname, 'files', 'script.js');

import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const child = spawn('node', [workerPath, ...args], {
        stdio: [process.stdin, process.stdout, 'pipe', 'ipc']
    });

    child.stderr.on('data', (data) => {
        console.error(`Child process stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2', 'arg3']);
