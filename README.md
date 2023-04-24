# Awesome Data Stream

This is a library for producing events using different producers, such as Kafka and HTTP APIs.

## Usage

### Producers

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

#### Example

Here's an example of how to use the library to produce an event:

```javascript
const { producerFactory } = require('./src/producers/')({
  validate: () => {}
});
const producers = [/* Define your producers and their configurations here */];

const producer = await producerFactory(producers);

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

### Consumers

#### Kafka Consumer

Este é um módulo Node.js que exporta uma função assíncrona que cria um consumidor do Kafka usando o pacote `kafkajs`.

##### Configuração

O consumidor do Kafka é configurado no arquivo `src/consumers/kafka.js`. É possível enviar as seguintes configurações:

- `clientId`: o ID do cliente que está consumindo as mensagens
- `brokers`: a lista de URLs dos brokers do Kafka
- `ssl`: se deve usar SSL para se conectar ao Kafka (padrão: `false`)
- `sasl`: as credenciais de autenticação no Kafka
- `kafkaConsumerTopic`: o nome do tópico do Kafka que será consumido
- `autoCommit`: se deve enviar automaticamente o ACK para as mensagens (padrão: `true`)
- `readFromBeggining`: se deve começar a ler as mensagens a partir do início do tópico (padrão: `false`)
- `offset`: o offset a partir do qual começar a ler as mensagens (padrão: `null`)

##### Utilização

Ao ser chamado, o módulo espera dois argumentos: um objeto com as configurações do consumidor (listadas acima, no tópico sobre configuração) e um grupo de consumidores (consumer group) opcional. O módulo então cria um consumidor do Kafka, se conecta à instância do Kafka e subscreve-se ao tópico especificado.

O objeto retornado pelo módulo possui quatro métodos:

- `run(callbackFunction)`: executa uma função de retorno de chamada para cada mensagem recebida. 
- `disconnect()`: desconecta o consumidor do Kafka.
- `connect()`: conecta o consumidor do Kafka.
- `ack(messages)`: envia uma confirmação de recebimento (ACK) para as mensagens recebidas.

O método `run()` é o principal método do objeto retornado. Ele executa uma função de retorno de chamada para cada mensagem recebida do Kafka. A função de retorno de chamada recebe um objeto com informações da mensagem, como o tópico, partição, mensagem, timestamp, etc. O método `ack()` é responsável por enviar o ACK para o Kafka, indicando que a mensagem foi recebida com sucesso.

Este módulo é útil para quem precisa implementar um consumidor do Kafka em Node.js. Com ele, é possível criar rapidamente um consumidor do Kafka e se conectar à instância do Kafka para consumir mensagens de um tópico específico.
