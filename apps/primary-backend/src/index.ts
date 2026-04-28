import express from 'express';
import { userRouter } from './router/user'
import { automRouter } from './router/autom';
const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/autom',automRouter);

app.listen(3004);