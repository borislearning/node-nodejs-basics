import { createHash } from 'crypto';
import { readFileSync } from 'fs';

const calculateHash = async () => {
    try {
        const hash = createHash('sha256');
        const data = readFileSync('fileToCalculateHashFor.txt');

        hash.update(data);
        const digest = hash.digest('hex');

        console.log(digest);
    } catch (error) {
        console.error('Error calculatinng hash',);
    }
};

calculateHash();
