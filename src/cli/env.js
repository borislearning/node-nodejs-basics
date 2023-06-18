const parseEnv = () => {
    const args = process.argv.slice(2); // Remove first two default args (node exec path and file path)

    try {
        for (let i = 0; i < args.length; i += 2) {
            const propName = args[i].replace('--', '');
            const value = args[i + 1];

            if (!propName || propName.startsWith('--') || value === undefined) {
                throw new Error('Invalid command-line arguments');
            }

            console.log(`${propName} is ${value}`);
        }
    } catch (err) {
        console.error(err.message);
    }
};

parseEnv();