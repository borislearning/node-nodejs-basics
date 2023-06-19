// worker.js
import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
const id = workerData - 10;
try {
    const result = nthFibonacci(workerData);
    parentPort.postMessage({ status: 'resolved', data: result, id: id });
} catch (error) {
    parentPort.postMessage({ status: 'error', data: null, id: id });
}
