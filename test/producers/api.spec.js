const assert = require('assert');
const { producerFactory } = require('../../index');
require('dotenv').config()

const producers = [{
    name: 'api',
    config: {
        url: 'http://3.22.184.97/action'
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
