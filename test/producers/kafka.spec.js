const assert = require('assert');
const producerFactory = require('../../src/producers');
require('dotenv').config()

const producers = [{
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

describe('Event Producer Library', function () {
    describe('# Testing kafka .produce()', function () {
        it('should produce an event', async function () {
            const producer = await producerFactory(producers, {
                schemas: {
                    'my-event': {
                        'v1': {
                            'message': '',
                            'event_name': '',
                            'version': '',
                            'timestamp': ''
                        }
                    }
                }
            });

            const event = {
                'event_name': 'my-event',
                'version': 'v1',
                'message': 'Hello, world!',
                'timestamp': Date.now()
            };

            const result = await producer.produce(event);

            assert.equal(result, true);
        });
    });
});
