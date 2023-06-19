import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const oldPath = path.join(__dirname, 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'properFilename.md');

    try {
        await fs.access(oldPath);

        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.rename(oldPath, newPath);
            } else {
                throw err;
            }
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await rename().catch(err => console.error(err.message));