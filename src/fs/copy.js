import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to copy file
const copyFile = async (source, destination) => {
    await fs.copyFile(source, destination);
}

// Recursive function to handle the copying of folders (directories)
const copyFolderRecursive = async (source, destination) => {
    const sourceStats = await fs.stat(source);

    if (sourceStats.isDirectory()) {
        await fs.mkdir(destination);
        const files = await fs.readdir(source);

        for (const file of files) {
            const sourceFile = path.join(source, file);
            const destinationFile = path.join(destination, file);

            await copyFolderRecursive(sourceFile, destinationFile);
        }
    } else if (sourceStats.isFile()) {
        await copyFile(source, destination);
    }
}

const copy = async () => {
    const sourceFolder = path.join(__dirname, 'files');
    const destinationFolder = path.join(__dirname, 'files_copy');

    try {
        // Check if source folder exists
        await fs.access(sourceFolder);

        // Check if destination folder exists
        try {
            await fs.access(destinationFolder);
            // If destination folder exists, throw an error
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await copyFolderRecursive(sourceFolder, destinationFolder);
            } else {
                throw err;
            }
        }
    } catch (err) {
        // If source folder does not exist, throw an error
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await (copy().catch(err => console.error(err.message)));
