import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const arcPath = path.join(__dirname, 'files', 'archive.gz')
const compress = async () => {
    try {
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(arcPath);
        const gzip = createGzip();

        readStream.pipe(gzip).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('File compression completed successfully.');
        });

        readStream.on('error', (error) => {
            console.error('An error occurred while reading the file:', error);
        });

        writeStream.on('error', (error) => {
            console.error('An error occurred while writing to the file:', error);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

await compress();
