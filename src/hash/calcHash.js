import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = path.join(__dirname, '/files', 'fileToCalculateHashFor.txt');
    try {
        const hash = createHash('sha256');
        const data = await fs.readFile(filePath);
        console.log(data);
        hash.update(data);
        const digest = hash.digest('hex');

        console.log(digest);
    } catch (error) {
        console.error('Error calculatinng hash', error);
    }
};

calculateHash();
