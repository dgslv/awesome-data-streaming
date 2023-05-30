module.exports = {
    producerFactory: require('./src/producers')(() => {
        return {
            validate: () => {
                return true;
            }
        }
    }),
    schemaValidator: require('./src/validators/index').schemaValidator,
}