module.exports = {
    producerFactory: require('./src/producers')(require('./src/validators/index').schemaValidator),
}