import { Worker, isMainThread } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');
console.log(workerPath);
const performCalculations = async () => {


    const numCPUs = cpus().length;
    const workers = [];
    const results = [];

    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(workerPath, { workerData: i + 10 });

        const promise = new Promise((resolve, reject) => {
            worker.on('message', (result) => {
                results.push(result);
                resolve();
            });

            worker.on('error', (error) => {
                results.push({ status: 'error', data: null });
                reject(error);
            });

            worker.on('exit', (exitCode) => {
                if (exitCode !== 0) {
                    results.push({ status: 'error', data: null });
                }
            });
        });

        workers.push(promise);
    }

    await Promise.all(workers);
    results.sort((a, b) => a.id - b.id);
    console.log(results);
};
if (isMainThread) {
    performCalculations();
}
