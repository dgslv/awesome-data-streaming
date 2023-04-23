

module.exports = {
    makeAppSignature: (signatures = {}) => {
        return {
            'AppName':
                process.env.KAFKA_PRODUCER_APP_NAME ||
                process.env.NODE_APP ||
                process.env.application ||
                'dev',
            ...signatures,
        }
    }
}