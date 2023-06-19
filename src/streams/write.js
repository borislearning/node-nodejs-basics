import { createWriteStream } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '/files', 'filetoWrite.txt');

const write = async () => {
    try {
        const writeStream = createWriteStream(filePath);

        process.stdin.pipe(writeStream);

        writeStream.on('error', (error) => {
            console.error('An error occurred while writing to the file:', error);
        });

        process.stdin.on('end', () => {
            writeStream.end();
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

await write();
