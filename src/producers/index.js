const kafkaProducer = require('./kafka');
const apiProducer = require('./api');
const rabbitmqProducer = require('./rabbitmq');


const _producers = {
    'kafka': kafkaProducer,
    'api': apiProducer,
    'rabbitmq': rabbitmqProducer,
};

module.exports = (schemaValidator) => async (producers, schemas) => {
    const channels = await Promise.all(producers.map(async ({
        name,
        config
    }) => {
        try {
            return await _producers[name](config);
        } catch (error) {
            throw error
        }
    }))

    const validator = schemaValidator(schemas);

    return {
        produce: async (message) => {
            const isMessageValid = validator.validate(message)

            if (isMessageValid) {
                const responses = channels.map(channel => {
                    return channel.produce(message)
                });

                return true;
            } else {
                throw new Error('Message not valid! Double check the incoming properties and the schemas defined previously')
            }

        }
    }

}