const axios = require('axios');

module.exports = async (configProperties = {}) => {
    const API_URL = process.env.API_PUBLISHER_URL || configProperties?.url || '';

    return {
        produce: async function (message) {
            for (let i = 0; i < 3; i++) {
                try {
                    const response = await axios.post(API_URL, message);
                    return response;
                } catch (error) {
                    console.error(`POST request failed: ${error.message}`);
                    if (i < 2) {
                        const waitTime = 2000;
                        console.log(`Retrying in ${waitTime / 1000} second...`);
                        await new Promise((resolve) => setTimeout(resolve, waitTime));
                    }
                }
            }
            throw new Error(`POST request failed after 3 attempts`);
        },
    }
    
}