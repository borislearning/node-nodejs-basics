import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'fileToRead.txt');

    try {
        await fs.access(filePath);

        const content = await fs.readFile(filePath, 'utf8');

        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await read().catch(err => console.error(err.message));
