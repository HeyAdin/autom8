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
    const producer = kafka.producer();
    await producer.connect()

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })

            if (!message.value?.toString()) {
                return
            }

            const parsedValue = JSON.parse(message.value?.toString());
            const automRunId = parsedValue.automRunId;
            const stage = parsedValue.stage;

            const automRunDetails = await prisma.automRun.findFirst({
                where: {
                    id: automRunId
                },
                include: {
                    autom: {
                        include: {
                            actions: {
                                include: {
                                    availableActions: true
                                }
                            }
                        }
                    }
                }
            })

            const currentAction = automRunDetails?.autom.actions.find((x:any) => x.sortingOrders === stage);
            if (!currentAction) {
                console.log("current action doesnt found");
            }
            if (currentAction?.availableActions.type === "Send Solana") {
                console.log("Sending Solana")
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log("Solana is sent");
            }
            if (currentAction?.availableActions.type === "Send Email") {
                console.log("Sending Email")
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log("Email is sent");
            }

            const lastStage = (automRunDetails?.autom?.actions?.length || 1) - 1;
            if (lastStage !== stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [
                        {
                            value: JSON.stringify({
                                stage: stage + 1,
                                automRunId: automRunId
                            })
                        }
                    ]
                })
            }
            await consumer.commitOffsets([
                {
                    topic:TOPIC_NAME,
                    partition,
                    offset:(parseInt(message.offset) + 1).toString()
                }
            ])
        }
    })
}

main()
