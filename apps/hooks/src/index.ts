import express from 'express';
import { prisma } from '@repo/db'
const app = express();
app.use(express.json());

app.post('/health', (req, res) => {
    const body = req.body;
    console.log(body)
    const message = `hello data ${body.data}`
    res.status(200).json({ success: true, message });
})

app.post('/hooks/catch/:userId/:automId', async (req, res) => {
    const userId = req.params.userId;
    const automId = req.params.automId;
    const { name, email, password } = req.body;
    console.log("before prisma")
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
    
    res.status(200).json({ msg: "done" })
})

app.listen(3001, () => console.log('server listening on port 3000'));