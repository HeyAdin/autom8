import express from 'express';
import { userRouter } from './router/user.js'
import { automRouter } from './router/autom.js';
import cors from 'cors'
import { triggerRouter } from './router/trigger.js';
import { actionRouter } from './router/action.js';
const app = express();

app.use(express.json(),cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/autom',automRouter);
app.use('/api/v1/trigger',triggerRouter);
app.use('/api/v1/action',actionRouter);

app.listen(3004);