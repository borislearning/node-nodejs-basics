const parseArgs = () => {

    const envVars = process.env;

    try {
        const rssVars = Object.keys(envVars)
            .filter(key => key.startsWith('RSS_'))
            .reduce((obj, key) => {
                // Check if the value of the environment variable is not empty
                if (!envVars[key]) {
                    throw new Error(`Environment variable ${key} is undefined or empty`);
                }
                obj[key] = envVars[key];
                return obj;
            }, {});

        for (const [key, value] of Object.entries(rssVars)) {
            console.log(`${key}=${value}`);
        }
    } catch (err) {
        console.error(err.message);
    }
};

parseArgs();
