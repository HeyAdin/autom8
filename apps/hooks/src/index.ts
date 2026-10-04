import express from 'express';
import { prisma } from '@repo/db'
const port = 3001;
const app = express();
app.use(express.json());

app.post('/health', (req, res) => {
    const body = req.body;
    const message = `hello data ${body.data}`
    res.status(200).json({ success: true, message });
})

app.post('/hooks/catch/:userId/:automId', async (req, res) => {
    const userId = req.params.userId;
    const automId = req.params.automId;
    const body = req.body;
    // create a transaction to put the data in the trigger
    await prisma.$transaction(async (tx:any) => {
        const run = await tx.automRun.create({
            data: {
                automId,
                metadata: body
            }
        });

        await tx.automRunOutbox.create({
            data: {
                automRunId: run.id
            }
        })
    })

    res.status(200).json({ msg: "done" })
})

app.listen(port, () => console.log('server listening on port '+ port));