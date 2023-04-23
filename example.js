const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({
    size: '1mb'
}))

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
}, {
    name: 'api',
    config: {
        url: 'http://localhost:8000/test'
    }
}, {
    name: 'api',
}];



app.listen(PORT, async () => {
    console.log('Server is running on PORT', PORT)


    app.post('/test', (req, res) => {
        const {
            body
        } = req;

        console.log("chegou chaps??", body)
    })
    const producerFactory = require('./src/producers');

    const producer = await producerFactory(producers, {
        schemas: {
            'test': {
                'v1': {
                    'message': 'ushahusa',
                    'event_name': 'test',
                    'version': 'v1'
                },
                'v2': {
                    'message': '',
                    'event_name': '',
                    'version': '',
                    'chaps': ''
                },
                'v3': {
                    'message': '',
                    'event_name': '',
                    'version': '',
                    'timestamp': '',
                    'chaps': ''
                }
            },
            
        }
    });


    producer.produce({
        'event_name': 'test',
        'version': 'v3',
        'message': 'toma no cu chapssss',
        'chaps': 'CHAPSSSSSS FUNFOU CHAPSSS',
        'timestamp': Date.now()
        
    })
})



