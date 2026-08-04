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
    while (true) {
        const pendingRows = await prisma.automRunOutbox.findMany({
            where: {},
            take: 10
        })

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map((r:any) => ({
                value: r.automRunId
            }))
        })

        await prisma.automRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map((x:any) => x.id)
                }
            }
        })
    }
}
main();

