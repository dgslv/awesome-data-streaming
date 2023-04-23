module.exports = (mqConfigProperties) => {
    const config = mqConfigProperties;
    
    return {
        produce: (message) => {
            return true;
        }
    }
}