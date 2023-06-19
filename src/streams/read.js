import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const readStream = createReadStream(filePath);
        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        readStream.on('error', (error) => {
            console.error('An error occurred while reading the file:', error);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

await read();
