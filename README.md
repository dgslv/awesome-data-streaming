# Awesome Data Stream

This is a library for producing events using different producers, such as Kafka and HTTP APIs.

## Installation

You can install this library using npm:

```
npm install awesome-data-stream
```

## Usage

### Configuration

To use this library, you need to define a configuration object that describes your producers and their respective configurations. The configuration object should be an array of objects, where each object represents a producer and its configuration. The possible configurations are:

#### Kafka Producer

- `name`: A string representing the name of the producer (should be "kafka").
- `config`: An object containing the following fields:
  - `clientId`: A string representing the client ID to use for the Kafka producer.
  - `brokers`: An array of strings representing the Kafka broker URLs.
  - `ssl`: A boolean indicating whether to use SSL to connect to the Kafka brokers.
  - `sasl`: An object containing the following fields:
    - `mechanism`: A string representing the SASL mechanism to use (should be "PLAIN").
    - `username`: A string representing the Kafka broker API key.
    - `password`: A string representing the Kafka broker API secret.
  - `topic_to_produce`: A string representing the topic to produce messages to.

#### HTTP API Producer

- `name`: A string representing the name of the producer (should be "api").
- `config`: An object containing the following field:
  - `url`: A string representing the URL of the HTTP API to produce messages to.

### Example

Here's an example of how to use the library to produce an event:

```javascript
const producerFactory = require('my-event-producer-library');
const producers = [/* Define your producers and their configurations here */];

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
    }
  }
});

producer.produce({
  'event_name': 'test',
  'version': 'v3',
  'message': 'toma no cu chapssss',
  'chaps': 'CHAPSSSSSS FUNFOU CHAPSSS',
  'timestamp': Date.now()
});
```

In this example, we define an array of producers with their configurations and pass it to the `producerFactory` function. We also pass a `schemas` object that defines the possible schemas for our events.

Then, we create a producer instance by calling `producerFactory`, and call its `produce` method to produce an event. The event object passed to `produce` should contain the following fields:
- `event_name`: A string representing the name of the event.
- `version`: A string representing the version of the event schema to use.
- `message`: A string representing the message of the event.
- `timestamp` (optional): A timestamp in milliseconds indicating when the event occurred.
- Any additional fields defined in the event schema.

## Contributing

If you find a bug or have a feature request, please open an issue on GitHub. Pull requests are also welcome.