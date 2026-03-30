import { prisma } from '@repo/db'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['127.0.0.1:9092']
})
const TOPIC_NAME = "autom-events"
async function main() {
    const producer = kafka.producer();
    await producer.connect();
    console.log(prisma);
    console.log("connected to kafka")
    while (true) {
        const pendingRows = await prisma.automRunOutbox.findMany({
            where: {},
            take: 10
        })
        console.log(pendingRows)
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => ({
                value : r.automRunId
            }))
        })
    }
}
main();
console.log("hello");
