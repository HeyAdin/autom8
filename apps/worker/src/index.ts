import { prisma } from '@repo/db'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['127.0.0.1:9092']
});

const TOPIC_NAME = "autom-events"

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    await consumer.connect()

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })

            await new Promise((r)=>{setTimeout(r,1000)})
            console.log('email has been sent')
        }
    })
}

main()
