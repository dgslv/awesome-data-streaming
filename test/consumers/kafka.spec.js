const assert = require('assert');
const kafkaConsumerMaker = require('../../src/consumers/kafka');

require('dotenv').config()

const consumers = [{
    name: 'kafka',
    config: {
        clientId: process.env.KAFKA_APP_NAME,
        brokers: [process.env.KAFKA_BROKER_URL],
        ssl: true,
        sasl: {
            mechanism: 'PLAIN',
            username: process.env.KAFKA_BROKER_API_KEY,
            password: process.env.KAFKA_BROKER_API_SECRET,
        },
        topic_to_produce: 'poc-topic-1'
    }
}];


const consumer = {
    clientId: process.env.KAFKA_APP_NAME,
    brokers: [process.env.KAFKA_BROKER_URL],
    ssl: true,
    sasl: {
        mechanism: 'PLAIN',
        username: process.env.KAFKA_BROKER_API_KEY,
        password: process.env.KAFKA_BROKER_API_SECRET,
    },
    kafkaConsumerTopic: 'poc-topic-1',
    autoCommit: false
}

describe('Event Producer Library', function () {
    describe('# Testing kafka .produce()', function () {
        this.timeout(120000);

        it('should instanciate a consumer an event', (done) => {
            kafkaConsumerMaker(consumer, 'test-porra')
                .then(c => {
                    assert.strictEqual(c.run.constructor.name, 'AsyncFunction')
                    done()
                })
                .catch(e => {
                    console.error(e)
                    done(e)
                })
        });


        it('should consume a message from the poc topic', (done) => {
            let called = false;
            kafkaConsumerMaker({
                ...consumer,
                readFromBeggining: true,
                kafkaConsumerTopic: 'poc-topic-1',
                offset: 0,
            }, 'poc-test-porra-5')
                .then(
                    (kConsumer) => {
                        kConsumer.run(async (data) => {
                            kConsumer.ack([{
                                topic: data.topic,
                                partition: data.partition,
                                offset: data.offset
                            }])
                        })
                    }
                )
                .catch(e => {
                    console.error(e)
                    done(e)
                })
        })
    });
});
