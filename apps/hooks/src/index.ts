import express from 'express';
const app = express();
app.use(express.json());

app.post('/health', (req, res) => {
    const body = req.body;
    console.log(body)
    const message = `hello data ${body.data}`
    res.status(200).json({ success: true, message });
})

app.listen(3000, () => console.log('server listening on port 3000'));