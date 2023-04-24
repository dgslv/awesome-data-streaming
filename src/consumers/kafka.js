const { Kafka } = require('kafkajs');

module.exports = async (kafkaConfigOptions, consumerGroupId = `${process.env.APP_NAME}`) => {
    const topicToConsume = kafkaConfigOptions.kafkaConsumerTopic;
    if (!topicToConsume) throw new Error(`Propriedade kafkaConsumerTopic precisa ser especificada`)

    const shouldReadFromBeggining = kafkaConfigOptions.readFromBeggining || false;
    delete kafkaConfigOptions.kafkaConsumerTopic;
    delete kafkaConfigOptions.readFromBeggining;

    const kafka = new Kafka(kafkaConfigOptions);

    const consumer = kafka.consumer({ groupId: consumerGroupId });
    await consumer.connect();
    await consumer.subscribe({ topic: topicToConsume, fromBeginning: shouldReadFromBeggining });

    return {
        /**
         * 
         * 
         * @param {Function} callbackFunction - função a ser executada a cada mensagem obtida
         * 
         * @returns {Promise}
         */
        run: async (callbackFunction) => {
            return await consumer.run({
                eachMessage: async ({
                    topic, partition, message
                }) => {
                    return await callbackFunction({
                        topic,
                        partition,
                        message: message.value?.toString(),
                        timestamp: message.timestamp,
                        headers: message.headers,
                        offset: message.offset,
                        key: message.key?.toString(),
                    })
                }
            })
        },
        /**
         * 
         * @returns {Promise}
         */
        disconnect: async () => {
            return await consumer.disconnect()
        },
        /**
         * 
         * @returns {Promise}
         */
        connect: async () => {
            return await consumer.connect();
        },
        /**
         * 
         * @param {Array} messages - array de mensagens contendo partição e posição da mensagem lida
         * @returns 
         */
        ack: async (messages) => {
            return consumer.commitOffsets(messages);
        }
    }

}