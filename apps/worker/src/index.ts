require('dotenv').config()

import { JsonObject } from '@prisma/client/runtime/client';
import { prisma } from '@repo/db'
import { Kafka } from 'kafkajs'
import { parse } from './parse';
import { sendEmail } from './mail';

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

            const currentAction = automRunDetails?.autom.actions.find((x: any) => x.sortingOrders === stage);
            if (!currentAction) {
                console.log("current action doesnt found");
            }
            const automRunMetadata = automRunDetails?.metadata;
            if (currentAction?.availableActions.type === "Send Solana") {
                const amount = parse((currentAction?.metadata as JsonObject)?.amount as string, automRunMetadata);
                const address = parse((currentAction?.metadata as JsonObject)?.address as string, automRunMetadata)
                console.log("Sending Solana")
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log(`Sending out solana is to ${address} and amount of ${amount} SOL`);
            }
            if (currentAction?.availableActions.type === "Send Email") {
                const body = parse((currentAction.metadata as JsonObject)?.body as string, automRunMetadata);
                const to = parse((currentAction.metadata as JsonObject)?.email as string, automRunMetadata)
                console.log("Sending Email")
                await sendEmail(to,body);
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log("Sending out email is to ", to, " body is ", body);
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
                    topic: TOPIC_NAME,
                    partition,
                    offset: (parseInt(message.offset) + 1).toString()
                }
            ])
        }
    })
}

main();