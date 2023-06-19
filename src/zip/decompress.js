import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
//import { promises as fs } from 'fs';
import zlib from 'zlib';
import { createWriteStream, createReadStream } from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const arcPath = path.join(__dirname, 'files', 'archive.gz');
const uncPath = path.join(__dirname, 'files', 'fileToCompress.txt')
const decompress = async () => {
    try {
        const readStream = createReadStream(arcPath);
        const writeStream = createWriteStream(uncPath);
        const gunzip = zlib.createGunzip();

        readStream.pipe(gunzip).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('File decompression completed successfully.');
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


await decompress();