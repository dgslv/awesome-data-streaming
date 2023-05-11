const kafkaProducer = require('./kafka');
const apiProducer = require('./api');
const rabbitmqProducer = require('./rabbitmq');
const logger = require('../logger');

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
                const responses = channels.map(async channel => {
                    try {
                        await channel.produce(message)
                        logger.info('Awesome Data Streaming: Mensagem produzida com sucesso')
                        return true
                    } catch (error) {
                        logger.error(`Awesome Data Streaming: Erro ao produzir mensagem: ${JSON.stringify(message)}`)
                        return false
                    }
                });

                return true;
            } else {
                logger.error('Message not valid! Double check the incoming properties and the schemas defined previously');
            }

            return;
        }
    }

}