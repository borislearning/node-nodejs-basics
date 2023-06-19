const crypto = require('crypto');
const fs = require('fs');

const calculateHash = async () => {
    try {
        const hash = crypto.createHash('sha256');
        const data = fs.readFileSync('fileToCalculateHashFor.txt');

        hash.update(data);
        const digest = hash.digest('hex');

        console.log(digest);
    } catch (error) {
        console.error('Error calculatinng hash:', error);
    }
};

calculateHash();
