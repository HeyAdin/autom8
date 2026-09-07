import express from 'express';
import { userRouter } from './router/user.js'
import { automRouter } from './router/autom.js';
import cors from 'cors'
const app = express();

app.use(express.json(),cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/autom',automRouter);

app.listen(3004);