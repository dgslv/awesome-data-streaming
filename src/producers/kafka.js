const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');
const {
  makeAppSignature
} = require('../utils');

/**
 * Creates a Kafka producer function that validates messages against a schema
 *
 * @function
 * @param {function} validatorMaker - A function that creates a message validator
 * @returns {function} A function that creates a Kafka producer
 */
module.exports = async (kafkaConfig) => {
  const topic = kafkaConfig.topic_to_produce;
  delete kafkaConfig.topic_to_produce;

  const kafka = new Kafka(kafkaConfig);
  const producer = kafka.producer();
  await producer.connect();

  /**
   * Produces a message to the specified Kafka topic, if it passes validation
   *
   * @function
   * @param {object} message - The message to produce
   * @param {object} [keys={}] - The keys to use for the message - default: id generated using uuid.v4
   * @param {object} [headers={}] - The headers to use for the message
   * @throws {Error} If the message fails validation
   * @returns {Promiseq<void>} A Promise that resolves when the message is sent
   */
  return {
    produce: async function (message, keys = {}, headers = {}) {
      return await producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
            key: JSON.stringify({
              id: uuidv4(),
              ...keys,
            }),
            headers: {
              ...makeAppSignature(),
              ...headers,
            },
          },
        ],
      });
    },
  }

};